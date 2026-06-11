import { render, screen } from '@testing-library/react';

import { CitizensList } from '../components';
import { useCatCitizensStore } from '../store/useCatCitizensStore';

describe('CitizensList', () => {
  beforeEach(() => {
    useCatCitizensStore.getState().resetCitizens();
  });

  it('показывает сообщение, когда нет котиков', () => {
    render(<CitizensList newCitizenId={null} />);
    expect(screen.getByText(/ни одного котика/i)).toBeInTheDocument();
  });

  it('отображает список котиков', () => {
    const { addCitizen } = useCatCitizensStore.getState();
    addCitizen({
      name: 'Мурзик',
      age: 2,
      email: 'mur@mail.ru',
      gender: 'male',
      terms: true,
      country: 'Россия',
      password: '123',
    });
    render(<CitizensList newCitizenId={null} />);
    expect(screen.getByText('Мурзик')).toBeInTheDocument();
  });
});
