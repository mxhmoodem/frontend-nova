import { useState } from 'react';
import {
  Briefcase,
  Plus,
  Info,
  Users,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Workspaces allow you to organize projects and collaborate with team members.',
  whatItDoes: [
    'Create dedicated project spaces.',
    'Share documents and reports.',
    'Collaborate with team members.',
    'Track project progress.',
  ],
  whenToUse:
    'Use workspaces to organize related analyses and collaborate on specific initiatives.',
  howToUse: [
    'Create a new workspace for a project.',
    'Invite team members.',
    'Add relevant documents and reports.',
    'Track progress and updates.',
  ],
  example:
    'I create a workspace for the "UK Digital Payments Strategy" project and invite the relevant stakeholders.',
  projectRelation:
    'Workspaces enable team collaboration on specific business initiatives.',
};

const workspaces = [
  {
    id: '1',
    name: 'UK Digital Payments Strategy',
    members: 5,
    lastUpdated: 'Today',
    status: 'Active',
  },
  {
    id: '2',
    name: 'APP Fraud Compliance',
    members: 3,
    lastUpdated: 'Yesterday',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Open Banking Integration',
    members: 8,
    lastUpdated: '3 days ago',
    status: 'On Hold',
  },
];

export default function Workspaces() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Workspaces"
        content={infoContent}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Workspaces
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Organize and collaborate on projects.
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Workspace
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            to={`/app/workspaces/${workspace.id}`}
            className="card-base p-6 hover:border-primary/50 transition-all group bg-card/80 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${workspace.status === 'Active' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'}`}
              >
                {workspace.status}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
              {workspace.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {workspace.members}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {workspace.lastUpdated}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
