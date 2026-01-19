import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import './AIConsole.css';

export default function AIConsole() {
  return (
    <div>
      <h2 className="ai-console__heading">
        AI Console
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="ai-console__subheading">Powered by AI</p>
    </div>
  );
}
