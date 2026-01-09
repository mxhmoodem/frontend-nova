import { useState } from 'react';
import { Languages, Info, Save, LogOut } from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor: 'Settings allows you to configure your language preferences.',
  whatItDoes: [
    'Changes the display language of the application interface.',
    'Supports English, French, and German.',
  ],
  whenToUse:
    'Use this screen when you need to switch the application language.',
  howToUse: [
    'Select your preferred language from the dropdown menu.',
    "Click 'Save Changes' to apply the setting.",
  ],
  example:
    'I switch the language to French to view the interface in my native language.',
  projectRelation:
    'Ensures the platform is accessible to users across different regions.',
};

const languages = [
  { id: 'en', label: 'English (UK)' },
  { id: 'fr', label: 'Français' },
  { id: 'de', label: 'Deutsch' },
];

export default function Settings() {
  const [showInfo, setShowInfo] = useState(false);
  const [language, setLanguage] = useState('en');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Settings"
        content={infoContent}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Settings
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
            Manage your application preferences.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-md flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="card-base p-8 bg-card/80 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" /> Language
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Select Language
              </label>
              <div className="grid sm:grid-cols-3 gap-4">
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`cursor-pointer rounded-xl border p-4 flex items-center justify-between transition-all ${
                      language === lang.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                    }`}
                  >
                    <span className="font-medium text-sm">{lang.label}</span>
                    {language === lang.id && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-bold transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
