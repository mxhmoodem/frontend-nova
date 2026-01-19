import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import './MarketPulse.css';

export default function MarketPulse() {
  return (
    <div>
      <h2 className="market-pulse__heading">
        Market Pulse
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="market-pulse__subheading">
        Real-time analysis of global payment trends and transaction volumes
      </p>
    </div>
  );
}
