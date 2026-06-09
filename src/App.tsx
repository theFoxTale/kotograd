import { useState } from 'react';

import {
  Modal,
  WelcomeSection,
  UncontrolledForm,
  ReactHookForm,
} from './components';
import { imageAlt } from './constants/appText';

import './App.css';
import appHero from './assets/images/cat-hero.png';

type ModalType = 'uncontrolled' | 'rhf' | null;

function App() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const openModal = (type: 'uncontrolled' | 'rhf') => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <div className="app-container">
      <WelcomeSection
        onOpenUncontrolled={() => openModal('uncontrolled')}
        onOpenRHF={() => openModal('rhf')}
      />
      <img src={appHero} alt={imageAlt.hero} className="app-hero" />

      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === 'uncontrolled' && <UncontrolledForm />}
        {modalType === 'rhf' && <ReactHookForm />}
      </Modal>
    </div>
  );
}

export default App;
