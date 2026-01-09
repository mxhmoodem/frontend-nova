import { useState } from 'react';
import { LineChart, Plus, Play, Info, Filter, Calendar } from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Scenarios allows you to model different market conditions and their potential impact on your UK payment operations.',
  whatItDoes: [
    'Create custom scenarios with different market assumptions.',
    'Run simulations to see potential outcomes.',
    'Compare multiple scenarios side by side.',
    'Generate reports based on scenario analysis.',
  ],
  whenToUse:
    'Use this screen when planning for different market conditions or regulatory changes.',
  howToUse: [
    'Click "New Scenario" to create a scenario.',
    'Set parameters like market growth, regulatory changes, etc.',
    'Run the simulation to see projected outcomes.',
    'Save and share scenarios with your team.',
  ],
  example:
    'I create a scenario assuming a 10% increase in digital wallet adoption and see how it affects our card payment volumes.',
  projectRelation:
    'Scenarios enable proactive planning by modeling potential futures based on centralized data.',
};

const scenarios = [
  {
    name: 'Base Case 2025',
    status: 'Active',
    lastRun: '2 hours ago',
    change: '+5.2%',
  },
  {
    name: 'High Growth Scenario',
    status: 'Draft',
    lastRun: 'Yesterday',
    change: '+12.8%',
  },
  {
    name: 'Regulatory Impact',
    status: 'Active',
    lastRun: '3 days ago',
    change: '-2.1%',
  },
];

export default function Scenarios() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Scenarios"
        content={infoContent}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Scenarios
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Model and analyze different market scenarios.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-card/50 border border-border rounded-lg text-sm font-medium hover:bg-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Scenario
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {scenarios.map((scenario, i) => (
          <div
            key={i}
            className="card-base p-6 hover:border-primary/50 transition-all group cursor-pointer bg-card/80 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
                <LineChart className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${scenario.status === 'Active' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-secondary text-muted-foreground'}`}
              >
                {scenario.status}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
              {scenario.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" /> Last run: {scenario.lastRun}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span
                className={`font-bold ${scenario.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
              >
                {scenario.change}
              </span>
              <button className="flex items-center gap-1 text-sm font-bold text-primary hover:underline">
                <Play className="w-4 h-4" /> Run
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
