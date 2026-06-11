import { checkPasswordStrength } from '../utils';

describe('checkPasswordStrength', () => {
  it('возвращает слабый пароль', () => {
    const result = checkPasswordStrength('123');
    expect(result.score).toBeLessThanOrEqual(2);
    expect(result.message).toBe('Слабый');
  });

  it('возвращает средний пароль', () => {
    const result = checkPasswordStrength('Aa1');
    expect(result.score).toBe(3);
    expect(result.message).toBe('Средний');
  });

  it('возвращает сильный пароль', () => {
    const result = checkPasswordStrength('Aa1!bcd');
    expect(result.score).toBe(5);
    expect(result.message).toBe('Сильный');
  });
});
