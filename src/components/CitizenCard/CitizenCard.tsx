import { formFields } from '../../constants/formText';

import './CitizenCard.css';
import genderIcon from '../../assets/images/icons/gender.png';
import ownerIcon from '../../assets/images/icons/owner.png';
import ageIcon from '../../assets/images/icons/age.png';

interface CitizenCardProps {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  createdAt: number;
  isHighlighted: boolean;
}

export const CitizenCard = ({
  name,
  age,
  email,
  gender,
  createdAt,
  isHighlighted,
}: CitizenCardProps) => {
  return (
    <div className={`citizen-card ${isHighlighted ? 'highlight' : ''}`}>
      <div className="citizen-avatar">🐱</div>
      <div className="citizen-info">
        <p className="citizen-header">
          <strong>{name}</strong>
        </p>

        <div className="citizen-card__details">
          <div className="detail-item">
            <img src={genderIcon} alt="Пол" className="card-icon" />
            <p className="citizen-text">
              {gender === 'male'
                ? formFields.genderMale
                : formFields.genderFemale}
            </p>
          </div>

          <div className="detail-item">
            <img src={ageIcon} alt="Пол" className="card-icon" />
            <p className="citizen-text">{age} лет</p>
          </div>

          <div className="detail-item">
            <img src={ownerIcon} alt="Пол" className="card-icon" />
            <p className="citizen-text">{email}</p>
          </div>
        </div>

        <div className="citizen-card__footer">
          <p className="citizen-date">Присоединился к нам </p>
          <p className="citizen-date">{new Date(createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
