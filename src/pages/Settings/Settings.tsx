import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import './Settings.css';

export default function Settings() {
  return (
    <div className="settings-container">
      <h2 className="settings__heading">
        Settings
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="settings__subheading">
        Manage your application preferences and configurations
      </p>
    </div>
  );
}
