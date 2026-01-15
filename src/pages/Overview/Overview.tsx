import { InformationButton } from '../../components/common/InformationButton/InformationButton';

export default function Overview() {
  return (
    <div>
      {' '}
      <h2>
        Overview
        <InformationButton tooltip="More information" ariaLabel="Information" />
      </h2>{' '}
    </div>
  );
}
