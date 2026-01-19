import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import './ContentHub.css';

export default function ContentHub() {
  return (
    <div>
      <h2 className="content-hub__heading">
        Content Hub
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="content-hub__subheading">
        Central repository for all your global market intelligence documents
      </p>
    </div>
  );
}
