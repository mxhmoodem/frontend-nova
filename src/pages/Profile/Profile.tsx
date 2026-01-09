import { useState } from 'react';
import { User, Mail, Building, Info, Save, Camera } from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

const infoContent: InfoModalContent = {
  whatFor:
    'Profile allows you to manage your personal information and preferences.',
  whatItDoes: [
    'Update your profile information.',
    'Change your avatar.',
    'Manage notification preferences.',
    'View account details.',
  ],
  whenToUse:
    'Use this screen to update your personal information or preferences.',
  howToUse: [
    'Edit your profile fields.',
    'Upload a new avatar.',
    'Save changes when done.',
  ],
  example: 'I update my job title after a promotion.',
  projectRelation:
    'Profile management ensures accurate user information across the platform.',
};

export default function Profile() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="Profile"
        content={infoContent}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Profile
            </h1>
            <button
              onClick={() => setShowInfo(true)}
              className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground">
            Manage your personal information.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 shadow-md flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="max-w-2xl relative z-10">
        <div className="card-base p-8 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center text-2xl font-bold text-foreground border border-border">
                JS
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-lg shadow-md hover:opacity-90">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold">Jane Smith</h2>
              <p className="text-muted-foreground">Product Manager</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue="Jane Smith"
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  defaultValue="jane.smith@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Department
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  defaultValue="Product & Strategy"
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
