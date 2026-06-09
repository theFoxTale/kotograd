import { useForm } from 'react-hook-form';
import { rhfFormText } from '../../../constants/formText';

import './ReactHookForm.css';

interface FormValues {
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
}

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      gender: 'male',
      terms: false,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => {
    console.log('React Hook Form data:', data);
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
