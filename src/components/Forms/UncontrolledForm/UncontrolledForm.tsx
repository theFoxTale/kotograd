import { useRef } from 'react';
import type { SyntheticEvent } from 'react';

import { uncontrolledFormText } from '../../../constants/formText';
import { useCatCitizensStore } from '../../../store/useCatCitizensStore';

import './UncontrolledForm.css';

interface UncontrolledFormProps {
  onSuccess: () => void;
}

export const UncontrolledForm = ({ onSuccess }: UncontrolledFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const addCitizen = useCatCitizensStore((state) => state.addCitizen);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formDataObj = new FormData(form);

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      gender: (formDataObj.get('gender') as string) || 'male',
      terms: termsRef.current?.checked || false,
    };

    addCitizen(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="uncontrolled-form">
      <h2 className="form-title">{uncontrolledFormText.title}</h2>
      <p className="form-subtitle">{uncontrolledFormText.subtitle}</p>

      <div className="uncontrolled-form__container">
        <div className="uncontrolled-form__field">
          <label htmlFor="uncontrolled-name">
            {uncontrolledFormText.nameLabel}
          </label>
          <input
            id="uncontrolled-name"
            ref={nameRef}
            type="text"
            placeholder={uncontrolledFormText.namePlaceholder}
          />
        </div>

        <div className="uncontrolled-form__field">
          <label htmlFor="uncontrolled-age">
            {uncontrolledFormText.ageLabel}
          </label>
          <input
            id="uncontrolled-age"
            ref={ageRef}
            type="number"
            placeholder={uncontrolledFormText.agePlaceholder}
          />
        </div>
      </div>

      <div className="uncontrolled-form__field">
        <label htmlFor="uncontrolled-email">
          {uncontrolledFormText.emailLabel}
        </label>
        <input
          id="uncontrolled-email"
          ref={emailRef}
          type="email"
          placeholder={uncontrolledFormText.emailPlaceholder}
        />
      </div>

      <div className="uncontrolled-form__field uncontrolled-form__field--radio">
        <label>{uncontrolledFormText.genderLabel}</label>
        <div className="uncontrolled-form__radio-group">
          <label>
            <input type="radio" value="male" name="gender" defaultChecked />{' '}
            {uncontrolledFormText.genderMale}
          </label>
          <label>
            <input type="radio" value="female" name="gender" />{' '}
            {uncontrolledFormText.genderFemale}
          </label>
        </div>
      </div>

      <div className="uncontrolled-form__field uncontrolled-form__field--checkbox">
        <label>
          <input type="checkbox" ref={termsRef} />
          {uncontrolledFormText.termsLabel}
        </label>
      </div>

      <button type="submit" className="submit-btn">
        {uncontrolledFormText.submitButton}
      </button>
    </form>
  );
};
