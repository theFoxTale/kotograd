import { formFields } from '../../constants/formText';

import './CitizenCard.css';

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
        <p>
          <strong>{name}</strong>, {age} лет
        </p>
        <p>{email}</p>
        <p>
          Пол:{' '}
          {gender === 'male' ? formFields.genderMale : formFields.genderFemale}
        </p>
        <p className="citizen-date">{new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};
