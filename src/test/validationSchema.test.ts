import { citizenSchema } from '../utils';

describe('validationSchema', () => {
  it('отклоняет email без точки в домене', () => {
    const result = citizenSchema.safeParse({
      name: 'Барсик',
      age: 3,
      email: 'test@example',
      gender: 'male',
      country: 'Россия',
      password: '123456',
      confirmPassword: '123456',
      terms: true,
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toMatch(/некорректный email/i);
  });
});
