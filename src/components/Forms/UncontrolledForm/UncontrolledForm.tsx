import { useRef } from 'react';
import type { SyntheticEvent } from 'react';

import './UncontrolledForm.css';

export const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formDataObj = new FormData(form);

    const formData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      gender: (formDataObj.get('gender') as string) || '',
      terms: termsRef.current?.checked || false,
    };
    console.log('Uncontrolled form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="uncontrolled-form">
      <h2 className="form-title">Простая регистрация</h2>
      <p className="form-subtitle">Неконтролируемая форма (без RHF)</p>

      <div className="uncontrolled-form__container">
        <div className="uncontrolled-form__field">
          <label htmlFor="uncontrolled-name">Кличка пушистого жителя *</label>
          <input
            id="uncontrolled-name"
            ref={nameRef}
            type="text"
            placeholder="Введите кличку"
          />
        </div>
        <div className="uncontrolled-form__field">
          <label htmlFor="uncontrolled-age">Сколько зим пережил котик? *</label>
          <input
            id="uncontrolled-age"
            ref={ageRef}
            type="number"
            placeholder="Возраст в годах"
          />
        </div>
      </div>

      <div className="uncontrolled-form__field">
        <label htmlFor="uncontrolled-email">Почта хранителя котика *</label>
        <input
          id="uncontrolled-email"
          ref={emailRef}
          type="email"
          placeholder="example@mail.ru"
        />
      </div>

      <div className="uncontrolled-form__field uncontrolled-form__field--radio">
        <label>Пол котика *</label>
        <div className="uncontrolled-form__radio-group">
          <label>
            <input type="radio" value="male" name="gender" defaultChecked /> Кот
          </label>
          <label>
            <input type="radio" value="female" name="gender" /> Кошечка
          </label>
        </div>
      </div>

      <div className="uncontrolled-form__field uncontrolled-form__field--checkbox">
        <label>
          <input type="checkbox" ref={termsRef} />
          Соглашаюсь с условиями и обещаю регулярно гладить котика *
        </label>
      </div>

      <button type="submit" className="submit-btn">
        Зарегистрировать котика
      </button>
    </form>
  );
};
