import { Zap, Lightbulb, Target, BookOpen, ArrowRight } from 'lucide-react';
import { Modal } from '../../../common/Modal/Modal';
import type { InfoModalProps } from './InfoModal.types';
import './InfoModal.css';

/**
 * InfoModal - A specialized modal for displaying page information and guidance.
 * Built on top of the common Modal component for consistent behavior.
 */
export default function InfoModal({
  isOpen,
  onClose,
  title,
  content,
}: InfoModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="large"
      className="info-modal"
      footer={
        <button onClick={onClose} className="info-modal__got-it-btn">
          Got it <ArrowRight size={16} />
        </button>
      }
    >
      <div className="info-modal__content">
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
          <p className="info-modal__relation-text">{content.projectRelation}</p>
        </section>
      </div>
    </Modal>
  );
}
