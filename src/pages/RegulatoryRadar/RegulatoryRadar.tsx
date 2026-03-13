import { useState, useMemo, useCallback } from 'react';
import {
  Search,
  SlidersHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
} from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { InfoModal } from '../../components/features/common/InfoModal';
import { StatCard } from '../../components/common';
import { infoModalContent } from '../../constants/infoModalContent';
import { useLegislation } from '../../services/api';
import type { LegislationItem } from '../../services/api';
import './RegulatoryRadar.css';

// ─── Constants ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

/** Map file_type to a human-readable label */
const FILE_TYPE_LABELS: Record<string, string> = {
  pdf: 'PDF',
  docx: 'DOCX',
  csv: 'CSV',
  xlsx: 'XLSX',
  pptx: 'PPTX',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format a title like "Data_Protection_Act_2018" → "Data Protection Act 2018" */
function formatTitle(raw: string): string {
  return raw.replace(/_/g, ' ');
}

/** Format an ISO date string to a readable locale string */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Check if a source string is a URL (scraped) vs "user" (uploaded) */
function isExternalSource(source: string): boolean {
  return source.startsWith('http://') || source.startsWith('https://');
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RegulatoryRadar() {
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);

  // ── Legislation API integration ──────────────────────────────────────────
  const {
    data: legislationData,
    isLoading: isLegislationLoading,
    isError: isLegislationError,
    error: legislationError,
    refetch: refetchLegislation,
  } = useLegislation({ skip: page * PAGE_SIZE, limit: PAGE_SIZE });

  const legislationItems = useMemo(
    () => legislationData?.items ?? [],
    [legislationData?.items]
  );
  const totalItems = legislationData?.total ?? 0;
  const hasNextPage = legislationData?.has_next ?? false;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  // ── Derive stats from real data ──────────────────────────────────────────
  const stats = useMemo(() => {
    const total = totalItems;
    const scraped = legislationItems.filter((i) =>
      isExternalSource(i.source)
    ).length;
    const uploaded = legislationItems.filter(
      (i) => !isExternalSource(i.source)
    ).length;

    return {
      totalLegislation: {
        title: 'TOTAL LEGISLATION',
        value: total,
        subtitle: 'Records in database',
      },
      scrapedSources: {
        title: 'SCRAPED SOURCES',
        value: scraped,
        subtitle: 'From legislation.gov.uk',
      },
      userUploaded: {
        title: 'USER UPLOADED',
        value: uploaded,
        subtitle: 'Manually uploaded documents',
      },
    };
  }, [legislationItems, totalItems]);

  // ── Filter legislation by search query ───────────────────────────────────
  const filteredLegislation = useMemo(() => {
    if (!searchQuery.trim()) return legislationItems;
    const q = searchQuery.toLowerCase();
    return legislationItems.filter(
      (item) =>
        formatTitle(item.title).toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.file_type.toLowerCase().includes(q)
    );
  }, [legislationItems, searchQuery]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleStatCardClick = (statType: string) => {
    console.log(`Clicked on ${statType} stat card`);
  };

  const handleLegislationClick = useCallback((item: LegislationItem) => {
    if (isExternalSource(item.source)) {
      window.open(item.source, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handlePrevPage = () => setPage((p) => Math.max(0, p - 1));
  const handleNextPage = () => {
    if (hasNextPage) setPage((p) => p + 1);
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="regulatory-radar">
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Regulatory Radar"
        content={infoModalContent.regulatoryRadar}
      />

      {/* Header section */}
      <header className="regulatory-radar__header">
        <div className="regulatory-radar__header-left">
          <h2 className="regulatory-radar__heading">
            Regulatory Radar
            <InformationButton
              tooltip="Learn about this page"
              ariaLabel="Information about Regulatory Radar"
              onClick={() => setShowInfo(true)}
            />
          </h2>
          <p className="regulatory-radar__subheading">
            Track, monitor, and prepare for global compliance changes.
          </p>
        </div>

        {/* Search bar */}
        <div className="regulatory-radar__search-wrapper">
          <div className="regulatory-radar__search-bar">
            <Search size={18} className="regulatory-radar__search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legislation..."
              className="regulatory-radar__search-input"
            />
          </div>
          <button className="regulatory-radar__filter-btn" aria-label="Filter">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </header>

      {/* Stats cards grid */}
      <div className="regulatory-radar__stats-grid">
        <StatCard
          title={stats.totalLegislation.title}
          value={stats.totalLegislation.value}
          subtitle={stats.totalLegislation.subtitle}
          variant="success"
          icon={<CheckCircle size={18} />}
          onClick={() => handleStatCardClick('totalLegislation')}
          testId="stat-total-legislation"
        />
        <StatCard
          title={stats.scrapedSources.title}
          value={stats.scrapedSources.value}
          subtitle={stats.scrapedSources.subtitle}
          variant="warning"
          icon={<Clock size={18} />}
          onClick={() => handleStatCardClick('scrapedSources')}
          testId="stat-scraped-sources"
        />
        <StatCard
          title={stats.userUploaded.title}
          value={stats.userUploaded.value}
          subtitle={stats.userUploaded.subtitle}
          variant="danger"
          icon={<AlertTriangle size={18} />}
          onClick={() => handleStatCardClick('userUploaded')}
          testId="stat-user-uploaded"
        />
      </div>

      {/* ── Legislation Documents Section ───────────────────────────────── */}
      <section className="regulatory-radar__legislation-section">
        <div className="regulatory-radar__legislation-header">
          <h3 className="regulatory-radar__legislation-title">
            <FileText size={20} />
            Legislation Documents
            {!isLegislationLoading && (
              <span className="regulatory-radar__legislation-count">
                {totalItems}
              </span>
            )}
          </h3>
          <button
            className="regulatory-radar__refresh-btn"
            onClick={() => refetchLegislation()}
            disabled={isLegislationLoading}
            aria-label="Refresh legislation"
          >
            <RefreshCw
              size={16}
              className={isLegislationLoading ? 'spin' : ''}
            />
            Refresh
          </button>
        </div>

        {/* Loading state */}
        {isLegislationLoading && (
          <div className="regulatory-radar__table-wrapper">
            <table className="regulatory-radar__table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Source</th>
                  <th>Created</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="regulatory-radar__skeleton-row">
                    <td className="regulatory-radar__skeleton-cell">
                      <div className="regulatory-radar__skeleton-line regulatory-radar__skeleton-line--short" />
                      <div className="regulatory-radar__skeleton-line regulatory-radar__skeleton-line--long" />
                    </td>
                    <td className="regulatory-radar__skeleton-cell">
                      <div className="regulatory-radar__skeleton-line regulatory-radar__skeleton-line--short" />
                    </td>
                    <td className="regulatory-radar__skeleton-cell">
                      <div className="regulatory-radar__skeleton-line regulatory-radar__skeleton-line--medium" />
                    </td>
                    <td className="regulatory-radar__skeleton-cell">
                      <div className="regulatory-radar__skeleton-line regulatory-radar__skeleton-line--short" />
                    </td>
                    <td className="regulatory-radar__skeleton-cell">
                      <div className="regulatory-radar__skeleton-line regulatory-radar__skeleton-line--short" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Error state */}
        {isLegislationError && (
          <div className="regulatory-radar__error">
            <AlertTriangle size={20} />
            <p>
              Failed to load legislation.{' '}
              {legislationError instanceof Error
                ? legislationError.message
                : 'Unknown error'}
            </p>
            <button
              className="regulatory-radar__retry-btn"
              onClick={() => refetchLegislation()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLegislationLoading &&
          !isLegislationError &&
          filteredLegislation.length === 0 && (
            <div className="regulatory-radar__empty">
              <FileText size={32} />
              <p>
                {searchQuery.trim()
                  ? 'No legislation matches your search.'
                  : 'No legislation documents found.'}
              </p>
            </div>
          )}

        {/* Legislation table */}
        {!isLegislationLoading &&
          !isLegislationError &&
          filteredLegislation.length > 0 && (
            <>
              <div className="regulatory-radar__table-wrapper">
                <table className="regulatory-radar__table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Source</th>
                      <th>Created</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLegislation.map((item) => (
                      <tr
                        key={item.id}
                        className="regulatory-radar__table-row"
                        onClick={() => handleLegislationClick(item)}
                        role={
                          isExternalSource(item.source) ? 'link' : undefined
                        }
                        style={{
                          cursor: isExternalSource(item.source)
                            ? 'pointer'
                            : 'default',
                        }}
                      >
                        <td className="regulatory-radar__table-cell--title">
                          <FileText size={16} />
                          <div>
                            <span className="regulatory-radar__doc-title">
                              {formatTitle(item.title)}
                            </span>
                            {item.description && (
                              <span className="regulatory-radar__doc-desc">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className={`regulatory-radar__file-badge regulatory-radar__file-badge--${item.file_type}`}
                          >
                            {FILE_TYPE_LABELS[item.file_type] ??
                              item.file_type.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          {isExternalSource(item.source) ? (
                            <a
                              href={item.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="regulatory-radar__source-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              legislation.gov.uk
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <span className="regulatory-radar__source-user">
                              <User size={14} />
                              User upload
                            </span>
                          )}
                        </td>
                        <td className="regulatory-radar__table-cell--date">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="regulatory-radar__table-cell--date">
                          {formatDate(item.updated_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="regulatory-radar__pagination">
                  <button
                    className="regulatory-radar__page-btn"
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>
                  <span className="regulatory-radar__page-info">
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    className="regulatory-radar__page-btn"
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                    aria-label="Next page"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
      </section>
    </div>
  );
}
