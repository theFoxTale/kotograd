import { ModalButton } from '../ModalButton/ModalButton';
import { appText, buttonTexts, imageAlt } from '../../constants/appText';

import './WelcomeSection.css';
import appIcon from '../../assets/images/cat-icon.png';

import controlButtonIcon from '../../assets/images/uncontrolled-modal/modal-image.png';
import controlButtonArrow from '../../assets/images/uncontrolled-modal/modal-arrow.png';

import libButtonIcon from '../../assets/images/lib-modal/modal-image.png';
import libButtonArrow from '../../assets/images/lib-modal/modal-arrow.png';

interface WelcomeSectionProps {
  onOpenUncontrolled: () => void;
  onOpenRHF: () => void;
}

export const WelcomeSection = ({
  onOpenUncontrolled,
  onOpenRHF,
}: WelcomeSectionProps) => {
  return (
    <div className="welcome-section">
      <div className="welcome-description">
        <div className="welcome-header">
          <img src={appIcon} alt={imageAlt.logo} className="welcome-icon" />
          <h1>{appText.appTitle}</h1>
        </div>
        <p>{appText.appSubtitle}</p>
      </div>
      <div className="welcome-buttons">
        <ModalButton
          iconImage={controlButtonIcon}
          firstLineText={buttonTexts.uncontrolledButtonTitle}
          secondLineText={buttonTexts.uncontrolledButtonSubtitle}
          arrowImage={controlButtonArrow}
          modalClass="orange-modal"
          onClick={onOpenUncontrolled}
        />
        <ModalButton
          iconImage={libButtonIcon}
          firstLineText={buttonTexts.rhfButtonTitle}
          secondLineText={buttonTexts.rhfButtonSubtitle}
          arrowImage={libButtonArrow}
          modalClass="green-modal"
          onClick={onOpenRHF}
        />
      </div>
    </div>
  );
};
