import { Button } from '../../components/common/Button/Button';
import { Sparkles, RotateCcw, Paperclip, Save, Trash2 } from 'lucide-react';
import './Storybook.css';

export default function Storybook() {
  return (
    <div className="storybook-container">
      <h2 className="storybook__heading">Component Library</h2>
      <p className="storybook__subheading">
        Explore and test common UI components
      </p>

      <section className="storybook__section">
        <h3>Button Component</h3>
        <div className="storybook__demo-grid">
          <div className="storybook__demo-item">
            <h4>Just Text</h4>
            <div className="storybook__demo-row">
              <Button text="Ask AI" variant="primary" />
              <Button text="Reset" variant="secondary" />
              <Button text="Delete" variant="danger" />
            </div>
          </div>

          <div className="storybook__demo-item">
            <h4>Icon and Text</h4>
            <div className="storybook__demo-row">
              <Button
                text="Ask AI"
                icon={<Sparkles size={16} />}
                variant="primary"
              />
              <Button
                text="Reset"
                icon={<RotateCcw size={16} />}
                variant="secondary"
              />
              <Button
                text="Save Changes"
                icon={<Save size={16} />}
                variant="primary"
              />
            </div>
          </div>

          <div className="storybook__demo-item">
            <h4>Just Icon</h4>
            <div className="storybook__demo-row">
              <Button
                icon={<Paperclip size={16} />}
                variant="secondary"
                aria-label="Attach file"
                title="Attach file"
              />
              <Button
                icon={<Sparkles size={16} />}
                variant="primary"
                aria-label="AI Action"
              />
              <Button
                icon={<RotateCcw size={16} />}
                variant="ghost"
                aria-label="Reset"
              />
              <Button
                icon={<Trash2 size={16} />}
                variant="danger"
                aria-label="Delete"
              />
            </div>
          </div>

          <div className="storybook__demo-item">
            <h4>Loading State</h4>
            <div className="storybook__demo-row">
              <Button text="Saving..." isLoading variant="primary" />
              <Button
                icon={<RotateCcw size={16} />}
                isLoading
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
