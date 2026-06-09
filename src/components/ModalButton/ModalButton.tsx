import { imageAlt } from '../../constants/appText';
import './ModalButton.css';

interface ModalButtonProps {
  iconImage: string;
  firstLineText: string;
  secondLineText: string;
  arrowImage: string;
  modalClass: string;
  onClick: () => void;
}

export function ModalButton({
  iconImage,
  firstLineText,
  secondLineText,
  arrowImage,
  modalClass,
  onClick,
}: ModalButtonProps) {
  return (
    <button className={`modal-container ${modalClass}`} onClick={onClick}>
      <img src={iconImage} alt={imageAlt.modalIcon} className="modal-icon" />
      <div className="modal-description">
        <h3>{firstLineText}</h3>
        <div className="modal-arrow-container">
          <p>{secondLineText}</p>
          <img
            src={arrowImage}
            alt={imageAlt.modalArrow}
            className="modal-arrow"
          />
        </div>
      </div>
    </button>
  );
}
