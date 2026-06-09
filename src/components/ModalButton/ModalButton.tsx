import './ModalButton.css';

interface ModalButtonProps {
  iconImage: string;
  firstLineText: string;
  secondLineText: string;
  arrowImage: string;
  modalClass: string;
}

export function ModalButton({
  iconImage,
  firstLineText,
  secondLineText,
  arrowImage,
  modalClass,
}: ModalButtonProps) {
  return (
    <button className={`modal-container ${modalClass}`}>
      <img src={iconImage} alt="Иконка" className="modal-icon" />
      <div className="modal-description">
        <h3>{firstLineText}</h3>
        <div className="modal-arrow-container">
          <p>{secondLineText}</p>
          <img src={arrowImage} alt="Стрелка" className="modal-arrow" />
        </div>
      </div>
    </button>
  );
}
