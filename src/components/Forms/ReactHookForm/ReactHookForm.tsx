import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { rhfFormText } from '../../../constants/formText';
import { useCatCitizensStore } from '../../../store/useCatCitizensStore';

import type { CitizenFormData } from '../../../utils';
import {
  checkPasswordStrength,
  citizenSchema,
  imageToBase64,
} from '../../../utils';

import { zodResolver } from '@hookform/resolvers/zod';

import './ReactHookForm.css';

interface ReactHookFormProps {
  onSuccess: () => void;
}

export const ReactHookForm = ({ onSuccess }: ReactHookFormProps) => {
  const addCitizen = useCatCitizensStore((state) => state.addCitizen);
  const countries = useCatCitizensStore((state) => state.countries);

  const [imageBase64, setImageBase64] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState('');

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<CitizenFormData>({
    resolver: zodResolver(citizenSchema),
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      gender: 'male',
      terms: false,
      country: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const password = watch('password');
  const strength = checkPasswordStrength(password);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError('');
    if (!file) {
      setImageBase64('');
      setImagePreview('');
      return;
    }

    const validTypes = ['image/png', 'image/jpeg'];
    const maxSize = 2 * 1024 * 1024;
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
      setImagePreview(base64);
    } catch {
      setImageError('Ошибка при загрузке изображения');
    }
  };

  const onSubmit = async (data: CitizenFormData) => {
    if (!countries.includes(data.country)) {
      setError('country', { message: 'Выберите страну из списка' });
      return;
    }
    addCitizen({ ...data, imageBase64 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rhf-form">
      <h2 className="form-title">{rhfFormText.title}</h2>
      <p className="form-subtitle">{rhfFormText.subtitle}</p>

      <div className="rhf-form__container">
        <div className="rhf-form__field">
          <label htmlFor="rhf-name">{rhfFormText.nameLabel}</label>
          <input
            id="rhf-name"
            {...register('name')}
            type="text"
            placeholder={rhfFormText.namePlaceholder}
          />
          {errors.name && (
            <div className="error-message">{errors.name.message}</div>
          )}
        </div>

        <div className="rhf-form__field">
          <label htmlFor="rhf-age">{rhfFormText.ageLabel}</label>
          <input
            id="rhf-age"
            {...register('age', { valueAsNumber: true })}
            type="number"
            placeholder={rhfFormText.agePlaceholder}
          />
          {errors.age && (
            <div className="error-message">{errors.age.message}</div>
          )}
        </div>
      </div>

      <div className="rhf-form__field">
        <label htmlFor="rhf-email">{rhfFormText.emailLabel}</label>
        <input
          id="rhf-email"
          {...register('email')}
          type="email"
          placeholder={rhfFormText.emailPlaceholder}
        />
        {errors.email && (
          <div className="error-message">{errors.email.message}</div>
        )}
      </div>

      <div className="rhf-form__container">
        <div className="rhf-form__field">
          <label htmlFor="rhf-image">{rhfFormText.imageLabel}</label>
          <input
            id="rhf-image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          <div className="image-hint">{rhfFormText.imageHint}</div>
          {imageError && <div className="error-message">{imageError}</div>}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="rhf-form__field rhf-form__field--radio">
          <label>{rhfFormText.genderLabel}</label>
          <div className="rhf-form__radio-group">
            <label>
              <input
                type="radio"
                value="male"
                {...register('gender')}
                defaultChecked
              />{' '}
              {rhfFormText.genderMale}
            </label>
            <label>
              <input type="radio" value="female" {...register('gender')} />{' '}
              {rhfFormText.genderFemale}
            </label>
          </div>
          {errors.gender && (
            <div className="error-message">{errors.gender.message}</div>
          )}
        </div>
      </div>

      <div className="rhf-form__field">
        <label htmlFor="rhf-country">{rhfFormText.countryLabel}</label>
        <input
          id="rhf-country"
          {...register('country')}
          type="text"
          list="rhf-countries-list"
          placeholder={rhfFormText.countryPlaceholder}
        />
        <datalist id="rhf-countries-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        {errors.country && (
          <div className="error-message">{errors.country.message}</div>
        )}
      </div>

      <div className="rhf-form__container">
        <div className="rhf-form__field">
          <label htmlFor="rhf-password">{rhfFormText.passwordLabel}</label>
          <input
            id="rhf-password"
            type="password"
            {...register('password')}
            placeholder={rhfFormText.passwordPlaceholder}
          />
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </div>

        <div className="rhf-form__field">
          <label htmlFor="rhf-confirm-password">
            {rhfFormText.confirmPasswordLabel}
          </label>
          <input
            id="rhf-confirm-password"
            type="password"
            {...register('confirmPassword')}
            placeholder={rhfFormText.confirmPasswordPlaceholder}
          />
          {errors.confirmPassword && (
            <div className="error-message">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
      </div>

      {password && (
        <div className="password-strength" style={{ color: strength.color }}>
          Сложность: {strength.message}
        </div>
      )}

      <div className="rhf-form__field rhf-form__field--checkbox">
        <label>
          <input type="checkbox" {...register('terms')} />
          {rhfFormText.termsLabel}
        </label>
        {errors.terms && (
          <div className="error-message">{errors.terms.message}</div>
        )}
      </div>

      <button type="submit" className="submit-btn" disabled={!isValid}>
        {rhfFormText.submitButton}
      </button>
    </form>
  );
};
