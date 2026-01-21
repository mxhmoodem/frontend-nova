import { FiInfo } from 'react-icons/fi';
import './InformationButton.css';
import { InformationButtonProps } from './InformationButton.model';
import Tooltip from '../Tooltip/Tooltip';

export const InformationButton = ({
  tooltip,
  onClick,
  ariaLabel,
}: InformationButtonProps) => {
  const button = (
    <button
      className="information-button"
      onClick={onClick}
      aria-label={ariaLabel || tooltip}
      type="button"
    >
      <FiInfo className="information-button-icon" />
    </button>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} position={'right'}>
        {button}
      </Tooltip>
    );
  }

  return button;
};
