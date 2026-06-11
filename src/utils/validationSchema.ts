import { z } from 'zod';

// Схема проверки email
const emailSchema = z.string().refine(
  (email) => {
    if (!email.includes('@')) return false;

    const [localPart, domain] = email.split('@');
    if (!localPart || localPart.length === 0) return false;

    return !(!domain || !domain.includes('.'));
  },
  { message: 'Некорректный email (пример: kotik@example.com)' }
);

// Схема проверки полей формы
export const citizenSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Имя обязательно')
      .refine((val) => !/\d/.test(val), 'Имя не должно содержать цифры')
      .refine(
        (val) => /^[A-ZА-ЯЁ]/.test(val),
        'Первая буква имени должна быть заглавной'
      ),

    age: z
      .number()
      .refine((val) => !isNaN(val), 'Возраст должен быть числом')
      .min(0, 'Возраст не может быть отрицательным')
      .max(40, 'Слишком большой возраст'),

    email: emailSchema,
    gender: z.enum(['male', 'female']),
    country: z.string().min(1, 'Выберите страну'),

    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),

    terms: z
      .boolean()
      .refine((val) => val === true, 'Необходимо принять условия'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type CitizenFormData = z.infer<typeof citizenSchema>;
