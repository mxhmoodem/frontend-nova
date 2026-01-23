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
import './InfoModal.css';

export default function InfoModal({
  isOpen,
  onClose,
  title,
  content,
}: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="info-modal__overlay">
      <div
        className="info-modal__backdrop"
        onClick={onClose}
        role="presentation"
      />
      <div className="info-modal">
        {/* Header */}
        <div className="info-modal__header">
          <h3 className="info-modal__title">
            <span className="info-modal__title-icon">
              <Info size={20} />
            </span>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="info-modal__close-btn"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="info-modal__body">
          {/* Section 1: What is this? */}
          <section>
            <h4 className="info-modal__section-title">
              <BookOpen size={16} /> What this screen is for
            </h4>
            <p className="info-modal__section-text">{content.whatFor}</p>
          </section>

          {/* Section 2: Capabilities */}
          <section className="info-modal__capabilities">
            <h4 className="info-modal__section-title">
              <Zap size={16} /> What it does
            </h4>
            <ul className="info-modal__list">
              {content.whatItDoes.map((item, i) => (
                <li key={i} className="info-modal__list-item">
                  <span className="info-modal__list-bullet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Usage */}
          <div className="info-modal__grid">
            <section>
              <h4 className="info-modal__section-title">
                <Target size={16} /> When to use it
              </h4>
              <p className="info-modal__relation-text">{content.whenToUse}</p>
            </section>

            <section>
              <h4 className="info-modal__section-title">
                <Lightbulb size={16} /> How to use it
              </h4>
              <ul className="info-modal__list">
                {content.howToUse.map((item, i) => (
                  <li key={i} className="info-modal__list-item">
                    <span className="info-modal__list-bullet info-modal__list-bullet--muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Section 4: Example */}
          <section className="info-modal__example">
            <h4 className="info-modal__example-title">Example Scenario</h4>
            <p className="info-modal__example-text">
              &ldquo;{content.example}&rdquo;
            </p>
          </section>

          {/* Section 5: Project Relation */}
          <section className="info-modal__relation">
            <h4 className="info-modal__relation-title">
              How this relates to the project
            </h4>
            <p className="info-modal__relation-text">
              {content.projectRelation}
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="info-modal__footer">
          <button onClick={onClose} className="info-modal__got-it-btn">
            Got it <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
