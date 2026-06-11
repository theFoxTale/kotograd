import { render, screen } from '@testing-library/react';
import { CitizenCard } from '../components';

describe('CitizenCard', () => {
  const citizen = {
    id: '1',
    name: 'Барсик',
    age: 3,
    email: 'barsik@example.com',
    gender: 'male',
    terms: true,
    country: 'Россия',
    password: '123',
    createdAt: Date.now(),
  };

  it('отображает информацию о котике', () => {
    render(<CitizenCard {...citizen} isHighlighted={false} />);
    expect(screen.getByText('Барсик')).toBeInTheDocument();
    expect(screen.getByText('3 лет')).toBeInTheDocument();
    expect(screen.getByText('barsik@example.com')).toBeInTheDocument();
    expect(screen.getByText('Кот')).toBeInTheDocument();
  });
});
