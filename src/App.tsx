import { useState } from 'react';
import { Modal, ModalButton } from './components';

import './App.css';
import appIcon from './assets/images/cat-icon.png';
import appHero from './assets/images/cat-hero.png';

import libButtonIcon from './assets/images/lib-modal/modal-image.png';
import libButtonArrow from './assets/images/lib-modal/modal-arrow.png';

import controlButtonIcon from './assets/images/uncontrolled-modal/modal-image.png';
import controlButtonArrow from './assets/images/uncontrolled-modal/modal-arrow.png';

type ModalType = 'uncontrolled' | 'rhf' | null;

function App() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: 'uncontrolled' | 'rhf') => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="app-container">
      <div className="app-left-part">
        <div className="app-description">
          <div className="app-header">
            <img src={appIcon} alt="Логотип КотоГрада" className="app-icon" />
            <h1>КотоГрад</h1>
          </div>
          <p>Форум для самых пушистых жителей интернета</p>
        </div>
        <div className="app-buttons">
          <ModalButton
            iconImage={controlButtonIcon}
            firstLineText="Простая регистрация"
            secondLineText="Uncontrolled Form"
            arrowImage={controlButtonArrow}
            modalClass="orange-modal"
            onClick={() => openModal('uncontrolled')}
          />
          <ModalButton
            iconImage={libButtonIcon}
            firstLineText="Умная регистрация"
            secondLineText="React Hook Form"
            arrowImage={libButtonArrow}
            modalClass="green-modal"
            onClick={() => openModal('rhf')}
          />
        </div>
      </div>
      <img src={appHero} alt="Главный герой КотоГрада" className="app-hero" />
      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === 'uncontrolled' && (
          <div>
            <h2>Простая регистрация</h2>
            <p>Здесь будет форма без React Hook Form</p>
          </div>
        )}
        {modalType === 'rhf' && (
          <div>
            <h2>Умная регистрация</h2>
            <p>Здесь будет форма с React Hook Form</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
