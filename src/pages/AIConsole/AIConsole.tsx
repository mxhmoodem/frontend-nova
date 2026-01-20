import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { AIQuerySearch } from '../../components/common/AIQuerySearch';
import './AIConsole.css';

export default function AIConsole() {
  const handleAsk = (query: string) => {
    console.log('AI Query:', query);
  };

  return (
    <div>
      <h2 className="ai-console__heading">
        AI Console
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="ai-console__subheading">Powered by AI</p>

      <div
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <AIQuerySearch onAsk={handleAsk} />
      </div>
    </div>
  );
}
