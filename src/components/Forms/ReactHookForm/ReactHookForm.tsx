import { useForm } from 'react-hook-form';

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
      <h2 className="form-title">Умная регистрация</h2>
      <p className="form-subtitle">Управляемая форма с React Hook Form</p>

      <div className="rhf-form__container">
        <div className="rhf-form__field">
          <label htmlFor="rhf-name">Кличка пушистого жителя *</label>
          <input
            id="rhf-name"
            {...register('name', { required: true })}
            type="text"
            placeholder="Введите кличку"
          />
        </div>
        <div className="rhf-form__field">
          <label htmlFor="rhf-age">Сколько зим пережил котик? *</label>
          <input
            id="rhf-age"
            {...register('age', { required: true, valueAsNumber: true })}
            type="number"
            placeholder="Возраст в годах"
          />
        </div>
      </div>

      <div className="rhf-form__field">
        <label htmlFor="rhf-email">Почта хранителя котика *</label>
        <input
          id="rhf-email"
          {...register('email', { required: true })}
          type="email"
          placeholder="example@mail.ru"
        />
      </div>

      <div className="rhf-form__field rhf-form__field--radio">
        <label>Пол котика *</label>
        <div className="rhf-form__radio-group">
          <label>
            <input
              type="radio"
              value="male"
              {...register('gender')}
              defaultChecked
            />{' '}
            Кот
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} />{' '}
            Кошечка
          </label>
        </div>
      </div>

      <div className="rhf-form__field rhf-form__field--checkbox">
        <label>
          <input type="checkbox" {...register('terms', { required: true })} />
          Соглашаюсь с условиями и обещаю регулярно гладить котика *
        </label>
      </div>

      <button type="submit" className="submit-btn" disabled={!isValid}>
        Зарегистрировать котика
      </button>
    </form>
  );
};
