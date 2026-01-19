import { FiInfo } from 'react-icons/fi';
import './InformationButton.css';
import { InformationButtonProps } from './InformationButton.model';

export const InformationButton = ({
  tooltip,
  onClick,
  ariaLabel,
}: InformationButtonProps) => {
  return (
    <button
      className="information-button"
      onClick={onClick}
      title={tooltip}
      aria-label={ariaLabel}
      type="button"
    >
      <FiInfo className="information-button-icon" />
    </button>
  );
};
