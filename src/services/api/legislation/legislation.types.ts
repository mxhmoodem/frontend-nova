/**
 * Legislation Module Types
 * ========================
 * Type definitions for legislation data from the backend.
 * Used by: RegulatoryRadar page
 *
 * Backend endpoints:
 * - GET /legislation/        → paginated list
 * - GET /legislation/{id}    → single item (flat)
 */

import type { FileType } from '../shared';

// =============================================================================
// ITEM TYPES
// =============================================================================

/**
 * Single legislation record returned by the API.
 * GET /{id} returns this shape flat (no wrapper).
 */
export interface LegislationItem {
  /** UUID */
  id: string;
  /** e.g. "Data_Protection_Act_2018" */
  title: string;
  /** May be "" or null */
  description: string | null;
  /**
   * Either a full legislation.gov.uk URL (scraped) or "user" (uploaded).
   * Frontend can conditionally render a link vs a label.
   */
  source: string;
  /** One of: pdf, docx, csv, xlsx, pptx */
  file_type: FileType;
  /** ISO 8601 — may or may not include timezone offset */
  created_at: string;
  /** ISO 8601 — may or may not include timezone offset */
  updated_at: string;
}

// =============================================================================
// LIST (PAGINATED) RESPONSE
// =============================================================================

/**
 * Paginated response from GET /legislation/
 */
export interface LegislationListResponse {
  items: LegislationItem[];
  total: number;
  skip: number;
  limit: number;
  order_by: string | null;
  has_next: boolean;
}

// =============================================================================
// QUERY PARAMS
// =============================================================================

/**
 * Parameters accepted by the list endpoint
 */
export interface LegislationListParams {
  skip?: number;
  limit?: number;
  order_by?: string;
}

// =============================================================================
// BACKWARD-COMPAT ALIASES
// =============================================================================

/** @deprecated Use LegislationItem instead */
export type Legislation = LegislationItem;

/** @deprecated Use LegislationListResponse instead */
export type LegislationList = LegislationItem[];
