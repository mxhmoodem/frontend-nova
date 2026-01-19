import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { useAuth } from '../../hooks/useAuth';
import './Overview.css';

export default function Overview() {
  const { user } = useAuth();

  const userName = user?.name.trim().split(/\s+/)[0] || 'User';

  return (
    <div>
      <h2 className="overview__heading">
        Overview
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>
      <p className="overview__subheading">
        Welcome back, {userName}. Here's what's happening in the global payment
        landscape today.
      </p>
    </div>
  );
}
