import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { rhfFormText } from '../../../constants/formText';
import { useCatCitizensStore } from '../../../store/useCatCitizensStore';
import { checkPasswordStrength, imageToBase64 } from '../../../utils';

import './ReactHookForm.css';

interface FormValues {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  country: string;
  password: string;
  confirmPassword: string;
  image?: FileList;
}

interface ReactHookFormProps {
  onSuccess: () => void;
}

export const ReactHookForm = ({ onSuccess }: ReactHookFormProps) => {
  const addCitizen = useCatCitizensStore((state) => state.addCitizen);
  const countries = useCatCitizensStore((state) => state.countries);

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors },
    setError,
    clearErrors,
  } = useForm<FormValues>({
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

  const imageFile = watch('image');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const validTypes = ['image/png', 'image/jpeg'];
      const maxSize = 2 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        setError('image', { message: 'Только PNG или JPEG' });
        return;
      }
      if (file.size > maxSize) {
        setError('image', { message: 'Размер файла не более 2 MB' });
        return;
      }
      clearErrors('image');
      imageToBase64(file).then((base64) => setImagePreview(base64));
    } else {
      setImagePreview('');
    }
  }, [imageFile, setError, clearErrors]);

  const onSubmit = async (data: FormValues) => {
    if (!countries.includes(data.country)) {
      setError('country', { message: 'Выберите страну из списка' });
      return;
    }

    const imageBase64 = imageFile?.[0]
      ? await imageToBase64(imageFile[0])
      : undefined;
    addCitizen({
      ...data,
      imageBase64,
    });

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
            {...register('name', { required: true })}
            type="text"
            placeholder={rhfFormText.namePlaceholder}
          />
        </div>

        <div className="rhf-form__field">
          <label htmlFor="rhf-age">{rhfFormText.ageLabel}</label>
          <input
            id="rhf-age"
            {...register('age', { required: true, valueAsNumber: true })}
            type="number"
            placeholder={rhfFormText.agePlaceholder}
          />
        </div>
      </div>

      <div className="rhf-form__field">
        <label htmlFor="rhf-email">{rhfFormText.emailLabel}</label>
        <input
          id="rhf-email"
          {...register('email', { required: true })}
          type="email"
          placeholder={rhfFormText.emailPlaceholder}
        />
      </div>

      <div className="rhf-form__container">
        <div className="rhf-form__field">
          <label htmlFor="rhf-image">{rhfFormText.imageLabel}</label>
          <input
            id="rhf-image"
            type="file"
            accept="image/png, image/jpeg"
            {...register('image')}
          />
          <div className="image-hint">{rhfFormText.imageHint}</div>
          {errors.image && (
            <div className="error-message">{errors.image.message}</div>
          )}
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
        </div>
      </div>

      <div className="rhf-form__field">
        <label htmlFor="rhf-country">{rhfFormText.countryLabel}</label>
        <input
          id="rhf-country"
          {...register('country', { required: true })}
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
          <label htmlFor="rhf-email">{rhfFormText.passwordLabel}</label>
          <input
            type="password"
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: { value: 6, message: 'Минимум 6 символов' },
            })}
            placeholder={rhfFormText.passwordPlaceholder}
          />
        </div>

        <div className="rhf-form__field">
          <label htmlFor="rhf-email">{rhfFormText.confirmPasswordLabel}</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value === watch('password') || 'Пароли не совпадают',
            })}
            placeholder={rhfFormText.confirmPasswordPlaceholder}
          />
        </div>
      </div>

      <div className="rhf-form__container">
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}
        {password && (
          <div className="password-strength" style={{ color: strength.color }}>
            Сложность: {strength.message}
          </div>
        )}
        {errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword.message}</div>
        )}
      </div>

      <div className="rhf-form__field rhf-form__field--checkbox">
        <label>
          <input type="checkbox" {...register('terms', { required: true })} />
          {rhfFormText.termsLabel}
        </label>
      </div>

      <button type="submit" className="submit-btn" disabled={!isValid}>
        {rhfFormText.submitButton}
      </button>
    </form>
  );
};
