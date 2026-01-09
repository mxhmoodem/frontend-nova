import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Info,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Plus,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Workspace Detail shows all content and activity within a specific workspace.',
  whatItDoes: [
    'View workspace documents.',
    'See team member activity.',
    'Access workspace settings.',
    'Add new content.',
  ],
  whenToUse: 'Use this screen to work within a specific project workspace.',
  howToUse: [
    'Browse documents and reports.',
    'View recent activity.',
    'Add new content or invite members.',
  ],
  example:
    'I open the workspace to review recent documents added by team members.',
  projectRelation:
    'Workspace details provide a focused view for project-specific collaboration.',
};

const documents = [
  { name: 'Strategy Document v2.pdf', type: 'PDF', added: 'Today' },
  { name: 'Market Analysis.xlsx', type: 'Excel', added: 'Yesterday' },
  { name: 'Meeting Notes.docx', type: 'Word', added: '2 days ago' },
];

export default function WorkspaceDetail() {
  const { id } = useParams();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Workspace Detail"
        content={infoContent}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <Link
            to="/app/workspaces"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Workspaces
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Workspace {id}
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">UK Digital Payments Strategy</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-card/50 border border-border rounded-lg text-sm font-medium hover:bg-secondary flex items-center gap-2">
            <Users className="w-4 h-4" /> 5 Members
          </button>
          <button className="p-2 bg-card/50 border border-border rounded-lg hover:bg-secondary">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Documents</h3>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="card-base p-4 flex items-center gap-4 hover:border-primary/50 transition-all group bg-card/80"
              >
                <div className="p-2 rounded-lg bg-secondary">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium group-hover:text-primary transition-colors">
                    {doc.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Added {doc.added}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-base p-6 bg-card/80">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" /> Activity
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                  JS
                </div>
                <div>
                  <p className="text-foreground">Jane added a new document</p>
                  <span className="text-xs text-muted-foreground">
                    2 hours ago
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                  TK
                </div>
                <div>
                  <p className="text-foreground">
                    Tom commented on Strategy Doc
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Yesterday
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
