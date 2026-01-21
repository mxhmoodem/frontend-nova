import {
  X,
  Info,
  Zap,
  Lightbulb,
  Target,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import type { InfoModalProps } from './InfoModal.types';

export default function InfoModal({
  isOpen,
  onClose,
  title,
  content,
}: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-secondary/30 backdrop-blur-sm">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
              <Info className="w-5 h-5" />
            </div>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          {/* Section 1: What is this? */}
          <section>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> What this screen is for
            </h4>
            <p className="text-base leading-relaxed text-foreground">
              {content.whatFor}
            </p>
          </section>

          {/* Section 2: Capabilities */}
          <section className="bg-secondary/30 p-5 rounded-xl border border-border">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" /> What it does
            </h4>
            <ul className="space-y-2">
              {content.whatItDoes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Usage */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" /> When to use it
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {content.whenToUse}
              </p>
            </section>

            <section>
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> How to use it
              </h4>
              <ul className="space-y-2">
                {content.howToUse.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Section 4: Example */}
          <section className="bg-primary/5 border border-primary/10 rounded-xl p-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
              Example Scenario
            </h4>
            <p className="text-sm italic text-foreground/80">
              &ldquo;{content.example}&rdquo;
            </p>
          </section>

          {/* Section 5: Project Relation */}
          <section className="border-t border-border pt-6">
            <h4 className="text-sm font-bold text-foreground mb-2">
              How this relates to the project
            </h4>
            <p className="text-sm text-muted-foreground">
              {content.projectRelation}
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-secondary/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Got it <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
