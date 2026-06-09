import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('App', () => {
  it('отображает заголовок и кнопки вызова форм', () => {
    render(<App />);
    expect(screen.getByText('КотоГрад')).toBeInTheDocument();
    expect(screen.getByText('Простая регистрация')).toBeInTheDocument();
    expect(screen.getByText('Умная регистрация')).toBeInTheDocument();
  });

  it('открывает модальное окно с неконтролируемой формой по клику на первую кнопку', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Простая регистрация'));

    const modal = await screen.findByRole('dialog');
    expect(within(modal).getByText('Простая регистрация')).toBeInTheDocument();
    expect(
      within(modal).getByLabelText(/Кличка пушистого жителя/i)
    ).toBeInTheDocument();
  });

  it('закрывает модальное окно по кнопке "✕"', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Простая регистрация'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Закрыть');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('открывает модальное окно с формой React Hook Form по второй кнопке', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText('Умная регистрация'));

    const modal = await screen.findByRole('dialog');
    expect(within(modal).getByText('Умная регистрация')).toBeInTheDocument();
    expect(
      within(modal).getByLabelText(/Кличка пушистого жителя/i)
    ).toBeInTheDocument();
  });
});
