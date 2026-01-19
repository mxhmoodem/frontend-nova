import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import './RegulatoryRadar.css';

export default function RegulatoryRadar() {
  return (
    <div>
      <h2 className="regulatory-radar__heading">
        Regulatory Radar
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="regulatory-radar__subheading">
        Track, monitor and prepare for global compliance changes.
      </p>
    </div>
  );
}
