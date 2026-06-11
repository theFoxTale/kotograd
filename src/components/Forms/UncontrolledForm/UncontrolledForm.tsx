import { useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';

import { uncontrolledFormText } from '../../../constants/formText';
import { useCatCitizensStore } from '../../../store/useCatCitizensStore';
import { checkPasswordStrength, type StrengthResult } from '../../../utils';

import './UncontrolledForm.css';
import * as React from 'react';

interface UncontrolledFormProps {
  onSuccess: () => void;
}

export const UncontrolledForm = ({ onSuccess }: UncontrolledFormProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const countries = useCatCitizensStore((state) => state.countries);
  const [countryError, setCountryError] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState('');
  const [strength, setStrength] = useState<StrengthResult>({
    score: 0,
    message: '',
    color: '',
  });

  const addCitizen = useCatCitizensStore((state) => state.addCitizen);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formDataObj = new FormData(form);

    const country = countryRef.current?.value.trim() || '';
    if (!countries.includes(country)) {
      setCountryError('Выберите страну из списка');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Пароль должен быть не менее 6 символов');
      return;
    }

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      gender: (formDataObj.get('gender') as string) || 'male',
      terms: termsRef.current?.checked || false,
      country,
      password,
    };

    addCitizen(formData);
    onSuccess();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setPassword(val);
    setStrength(checkPasswordStrength(val));
    if (val.length > 0 && val.length < 6) {
      setPasswordLengthError('Минимум 6 символов');
    } else {
      setPasswordLengthError('');
    }

    if (confirmPassword && val !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setConfirmPassword(val);

    if (password !== val) {
      setPasswordError('Пароли не совпадают');
    } else {
      setPasswordError('');
    }
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

      <div className="uncontrolled-form__field">
        <label htmlFor="uncontrolled-country">
          {uncontrolledFormText.countryLabel}
        </label>
        <input
          id="uncontrolled-country"
          ref={countryRef}
          type="text"
          list="countries-list"
          placeholder={uncontrolledFormText.countryPlaceholder}
        />
        <datalist id="countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {countryError && <div className="error-message">{countryError}</div>}
      </div>

      <div className="uncontrolled-form__container">
        <div className="uncontrolled-form__field">
          <label htmlFor="uncontrolled-password">
            {uncontrolledFormText.passwordLabel}
          </label>
          <input
            id="uncontrolled-password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={uncontrolledFormText.passwordPlaceholder}
          />
        </div>

        <div className="uncontrolled-form__field">
          <label htmlFor="uncontrolled-confirm-password">
            {uncontrolledFormText.confirmPasswordLabel}
          </label>
          <input
            id="uncontrolled-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            placeholder={uncontrolledFormText.confirmPasswordPlaceholder}
          />
        </div>
      </div>
      <div className="uncontrolled-form__container">
        {passwordLengthError && (
          <div className="error-message">{passwordLengthError}</div>
        )}
        {strength.message && (
          <div className="password-strength" style={{ color: strength.color }}>
            Сложность: {strength.message}
          </div>
        )}
        {passwordError && <div className="error-message">{passwordError}</div>}
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
