import { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  FileText,
  MoreVertical,
  Download,
  Share2,
  Trash2,
  Folder,
  Grid,
  List,
  File,
  Image as ImageIcon,
  Presentation,
  Info,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'The Content Hub is the central library where all relevant UK payment documents and data sources are stored, searched, and explored.',
  whatItDoes: [
    'Ingests documents from many places: regulatory notices, market reports, internal emails, performance reports, and customer feedback.',
    'Stores them in a secure, searchable repository and vector database.',
    'Lets you filter and search by source, type, date, and tags.',
    'Provides AI-generated summaries and key points for each document.',
  ],
  whenToUse:
    'Use this screen when you need to find and understand specific documents, background material, or evidence to support a decision or a report.',
  howToUse: [
    'Use filters and the search bar to narrow down to the documents you need.',
    'Click a document to see its summary and key points in the preview panel.',
    'Ask the assistant questions like "What are the main themes across these reports?"',
  ],
  example:
    "I search for 'UK APP Fraud' and filter to 'regulatory documents'. I open a few key files and ask the assistant to summarise the differences between them in one paragraph.",
  projectRelation:
    'The Content Hub is the core of the "Noval IQ" vision: it centralises fragmented information so the assistant can turn it into reliable insight.',
};

const documents = [
  {
    title: 'UK_Payment_Markets_Review_2025.pdf',
    type: 'PDF',
    size: '2.4 MB',
    date: 'Today',
    tag: 'Regulation',
  },
  {
    title: 'Q3_UK_E-commerce_Analysis.pptx',
    type: 'PPTX',
    size: '5.1 MB',
    date: 'Yesterday',
    tag: 'Market',
  },
  {
    title: 'Competitor_Pricing_Matrix_UK_v4.xlsx',
    type: 'XLSX',
    size: '840 KB',
    date: '2 days ago',
    tag: 'Strategy',
  },
  {
    title: 'Customer_Survey_Results_London_Q3.csv',
    type: 'CSV',
    size: '1.2 MB',
    date: '3 days ago',
    tag: 'Data',
  },
  {
    title: 'FCA_Compliance_Checklist.docx',
    type: 'DOCX',
    size: '150 KB',
    date: '1 week ago',
    tag: 'Compliance',
  },
  {
    title: 'Merchant_Acquiring_Trends_UK.pdf',
    type: 'PDF',
    size: '3.8 MB',
    date: '1 week ago',
    tag: 'Market',
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'PDF':
      return <FileText className="w-5 h-5" />;
    case 'PPTX':
      return <Presentation className="w-5 h-5" />;
    case 'CSV':
    case 'XLSX':
      return <Grid className="w-5 h-5" />;
    case 'JPG':
    case 'PNG':
      return <ImageIcon className="w-5 h-5" />;
    default:
      return <File className="w-5 h-5" />;
  }
};

const getFileIconStyle = (type: string) => {
  switch (type) {
    case 'PDF':
      return 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900/30';
    case 'PPTX':
      return 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:border-orange-900/30';
    case 'XLSX':
      return 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-900/30';
    default:
      return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30';
  }
};

export default function ContentHub() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Content Hub"
        content={infoContent}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Content Hub
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              title="Learn about this page"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Central repository for all your UK market intelligence documents.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md">
            <Plus className="w-4 h-4" /> Upload Document
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/80 backdrop-blur border border-border p-3 rounded-xl flex-shrink-0 relative z-10 shadow-sm">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-transparent rounded-lg text-sm focus:bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border">
            <Filter className="w-4 h-4" />
          </button>
          <div className="h-6 w-px bg-border mx-1" />
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-secondary text-foreground shadow-sm font-medium'
                : 'text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-secondary text-foreground shadow-sm font-medium'
                : 'text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0 relative z-10">
        {/* Sidebar Filters */}
        <div className="w-64 hidden lg:flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="bg-card/50 backdrop-blur p-4 rounded-xl border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Sources
            </h3>
            <div className="space-y-1">
              {[
                'All Sources',
                'Internal',
                'Regulatory Bodies (UK)',
                'News Feeds',
                'Partner Emails',
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    i === 0
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 bg-secondary/50 rounded-xl border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Folder className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold">Storage</div>
                <div className="text-xs text-muted-foreground">45% used</div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[45%]" />
            </div>
          </div>
        </div>

        {/* Document Grid/List */}
        <div className="flex-1 overflow-y-auto pb-4 pr-1">
          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="group card-base p-5 hover:border-primary/50 transition-all cursor-pointer flex flex-col h-48 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm ${getFileIconStyle(
                        doc.type
                      )}`}
                    >
                      {getFileIcon(doc.type)}
                    </div>
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded hover:bg-secondary">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <h3
                    className="font-bold text-sm mb-1 truncate text-foreground group-hover:text-primary transition-colors"
                    title={doc.title}
                  >
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-auto font-medium">
                    <span>{doc.size}</span>
                    <span className="text-border">•</span>
                    <span>{doc.date}</span>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                    <span className="px-2 py-1 bg-secondary rounded text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                      {doc.tag}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-200">
                      <button className="p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-primary">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-primary">
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all cursor-pointer h-48 bg-card/30">
                <div className="p-3 bg-secondary rounded-full mb-3 group-hover:bg-primary/10 transition-colors">
                  <Plus className="w-6 h-6 opacity-70" />
                </div>
                <span className="text-sm font-bold">Upload New</span>
                <span className="text-xs opacity-70 mt-1">
                  Drag & drop or click
                </span>
              </div>
            </div>
          ) : (
            <div className="card-base divide-y divide-border bg-card/80 backdrop-blur-sm overflow-hidden">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="p-4 flex items-center gap-4 hover:bg-secondary/40 transition-colors group cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border shadow-sm ${getFileIconStyle(
                      doc.type
                    )}`}
                  >
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="font-medium text-foreground bg-secondary px-1.5 rounded">
                        {doc.tag}
                      </span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Added {doc.date} by Jane Smith</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
