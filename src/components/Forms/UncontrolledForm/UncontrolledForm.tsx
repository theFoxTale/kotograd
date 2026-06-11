import { type ChangeEvent, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';

import { uncontrolledFormText } from '../../../constants/formText';
import { useCatCitizensStore } from '../../../store/useCatCitizensStore';
import {
  checkPasswordStrength,
  imageToBase64,
  type StrengthResult,
} from '../../../utils';

import { ZodError } from 'zod';
import { citizenSchema } from '../../../utils';

import './UncontrolledForm.css';

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState<StrengthResult>({
    score: 0,
    message: '',
    color: '',
  });

  const [imageBase64, setImageBase64] = useState<string>('');
  const [imageError, setImageError] = useState('');

  const addCitizen = useCatCitizensStore((state) => state.addCitizen);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});

    const form = event.currentTarget;
    const formDataObj = new FormData(form);
    const country = countryRef.current?.value.trim() || '';

    if (!countries.includes(country)) {
      setFieldErrors((prev) => ({
        ...prev,
        country: 'Выберите страну из списка',
      }));
      return;
    }

    if (!imageBase64) {
      setFieldErrors((prev) => ({ ...prev, image: 'Загрузите фото котика' }));
      return;
    }

    const rawData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value || '',
      gender: (formDataObj.get('gender') as string) || 'male',
      terms: termsRef.current?.checked || false,
      country,
      password,
      confirmPassword,
    };

    try {
      const validatedData = citizenSchema.parse(rawData);
      const formData = { ...validatedData, imageBase64 };
      addCitizen(formData);
      onSuccess();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0].toString()] = issue.message;
          }
        });
        setFieldErrors(errors);
      }
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setPassword(val);
    setStrength(checkPasswordStrength(val));
    if (fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: '' }));
    }
    if (fieldErrors.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleConfirmChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setConfirmPassword(val);
    if (fieldErrors.confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError('');

    if (!file) {
      setImageBase64('');
      return;
    }

    const validTypes = ['image/png', 'image/jpeg'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!validTypes.includes(file.type)) {
      setImageError('Только PNG или JPEG');
      return;
    }

    if (file.size > maxSize) {
      setImageError('Размер файла не более 2 MB');
      return;
    }

    try {
      const base64 = await imageToBase64(file);
      setImageBase64(base64);
    } catch {
      setImageError('Ошибка при загрузке изображения');
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

          <div className="field-error-container">
            {fieldErrors.name && (
              <div className="error-message">{fieldErrors.name}</div>
            )}
          </div>
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

          <div className="field-error-container">
            {fieldErrors.age && (
              <div className="error-message">{fieldErrors.age}</div>
            )}
          </div>
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

        <div className="field-error-container">
          {fieldErrors.email && (
            <div className="error-message">{fieldErrors.email}</div>
          )}
        </div>
      </div>

      <div className="uncontrolled-form__container">
        <div className="uncontrolled-form__field">
          <label htmlFor="uncontrolled-image">
            {uncontrolledFormText.imageLabel}
          </label>

          <input
            id="uncontrolled-image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />

          <div className="image-hint">{uncontrolledFormText.imageHint}</div>

          <div className="field-error-container">
            {imageError && <div className="error-message">{imageError}</div>}
            {imageBase64 && (
              <img src={imageBase64} alt="Preview" className="image-preview" />
            )}
            {fieldErrors.image && (
              <div className="error-message">{fieldErrors.image}</div>
            )}
          </div>
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

          <div className="field-error-container">
            {fieldErrors.gender && (
              <div className="error-message">{fieldErrors.gender}</div>
            )}
          </div>
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

        <div className="field-error-container">
          {fieldErrors.country && (
            <div className="error-message">{fieldErrors.country}</div>
          )}
        </div>
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

          <div className="field-error-container">
            {fieldErrors.password && (
              <div className="error-message">{fieldErrors.password}</div>
            )}
          </div>
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

          <div className="field-error-container">
            {fieldErrors.confirmPassword && (
              <div className="error-message">{fieldErrors.confirmPassword}</div>
            )}
          </div>
        </div>
      </div>

      {strength.message && (
        <div className="password-strength" style={{ color: strength.color }}>
          Сложность: {strength.message}
        </div>
      )}

      <div className="uncontrolled-form__container-term">
        <div className="uncontrolled-form__field uncontrolled-form__field--checkbox">
          <label>
            <input type="checkbox" ref={termsRef} />
            {uncontrolledFormText.termsLabel}
          </label>
        </div>

        <div className="field-error-container">
          {fieldErrors.terms && (
            <div className="error-message">{fieldErrors.terms}</div>
          )}
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {uncontrolledFormText.submitButton}
      </button>
    </form>
  );
};
