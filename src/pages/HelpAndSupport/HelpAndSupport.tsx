import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import './HelpAndSupport.css';

export default function HelpAndSupport() {
  return (
    <div>
      <h2 className="help-support__heading">
        Help & Support
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="help-support__subheading">
        Find answers and get assistance
      </p>
    </div>
  );
}
