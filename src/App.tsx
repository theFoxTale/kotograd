import { useState } from 'react';

import {
  Modal,
  WelcomeSection,
  UncontrolledForm,
  ReactHookForm,
  CitizensList,
} from './components';
import { imageAlt } from './constants/appText';

import './App.css';
import appHero from './assets/images/cat-hero.png';

type ModalType = 'uncontrolled' | 'rhf' | null;

function App() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [newCitizenId, setNewCitizenId] = useState<string | null>(null);

  const openModal = (type: 'uncontrolled' | 'rhf') => setModalType(type);

  const closeModal = (citizenId?: string) => {
    setModalType(null);
    if (citizenId) {
      setNewCitizenId(citizenId);
      setTimeout(() => setNewCitizenId(null), 3000);
    }
  };

  return (
    <div className="app-container">
      <div className="app-main">
        <WelcomeSection
          onOpenUncontrolled={() => openModal('uncontrolled')}
          onOpenRHF={() => openModal('rhf')}
        />
        <img src={appHero} alt={imageAlt.hero} className="app-hero" />
      </div>

      <CitizensList newCitizenId={newCitizenId} />

      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === 'uncontrolled' && (
          <UncontrolledForm onSuccess={closeModal} />
        )}
        {modalType === 'rhf' && <ReactHookForm onSuccess={closeModal} />}
      </Modal>
    </div>
  );
}

export default App;
