import { useState } from 'react';
import {
  HelpCircle,
  Search,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Help provides resources and support for using the platform effectively.',
  whatItDoes: [
    'Browse frequently asked questions.',
    'Access documentation.',
    'Contact support.',
    'View tutorials and guides.',
  ],
  whenToUse:
    'Use this screen when you need help with any feature or have questions.',
  howToUse: [
    'Search for your question.',
    'Browse FAQ categories.',
    'Contact support if needed.',
  ],
  example:
    'I search for how to create a new report and find a step-by-step guide.',
  projectRelation: 'Help ensures users can get the most out of the platform.',
};

const faqs = [
  {
    question: 'How do I create a new report?',
    answer:
      'Navigate to Reports and click "Generate Report". Select your parameters and click Generate.',
  },
  {
    question: 'How do I invite team members to a workspace?',
    answer:
      'Open the workspace, click Settings, then click "Invite Members" and enter their email addresses.',
  },
  {
    question: 'How do I export data?',
    answer:
      'Most pages have an Export button. Click it and select your preferred format (PDF, Excel, etc.).',
  },
  {
    question: 'How do I contact support?',
    answer:
      'You can reach our support team via the contact form below or email support@novaliq.com.',
  },
];

export default function Help() {
  const [showInfo, setShowInfo] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Help Center"
        content={infoContent}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Help Center
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">Find answers and get support.</p>
        </div>
      </div>

      <div className="relative w-full max-w-xl mx-auto z-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none shadow-sm"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-bold text-xl flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked
            Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="card-base overflow-hidden bg-card/80 backdrop-blur-sm"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-base p-6 bg-card/80 backdrop-blur-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Resources
            </h3>
            <div className="space-y-3">
              <a
                href="#"
                className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                Documentation
              </a>
              <a
                href="#"
                className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                Video Tutorials
              </a>
              <a
                href="#"
                className="block p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                API Reference
              </a>
            </div>
          </div>

          <div className="card-base p-6 bg-gradient-to-br from-primary to-red-700 text-white border-none shadow-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Need More Help?
            </h3>
            <p className="text-sm text-white/90 mb-4">
              Our support team is here to assist you.
            </p>
            <button className="w-full py-2.5 bg-white text-primary rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
