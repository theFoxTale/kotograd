export interface StrengthResult {
  score: number;
  message: string;
  color: string;
}

export const checkPasswordStrength = (password: string): StrengthResult => {
  let score = 0;

  if (password.length >= 6) score++;

  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;

  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, message: 'Слабый', color: '#e74c3c' };
  if (score <= 4) return { score, message: 'Средний', color: '#f39c12' };
  return { score, message: 'Сильный', color: '#2ecc71' };
};
