export const formFields = {
  nameLabel: 'Кличка пушистого жителя *',
  namePlaceholder: 'Введите кличку',
  ageLabel: 'Сколько зим пережил котик? *',
  agePlaceholder: 'Возраст в годах',
  emailLabel: 'Почта хранителя котика *',
  emailPlaceholder: 'example@mail.ru',
  genderLabel: 'Пол пушистика *',
  genderMale: 'Кот',
  genderFemale: 'Кошечка',
  termsLabel: 'Соглашаюсь с условиями и обещаю регулярно гладить котика *',
  submitButton: 'Зарегистрировать котика',
};

export const uncontrolledFormText = {
  title: 'Простая регистрация',
  subtitle: 'Неконтролируемая форма (без RHF)',
  ...formFields,
};

export const rhfFormText = {
  title: 'Умная регистрация',
  subtitle: 'Управляемая форма с React Hook Form',
  ...formFields,
};
