import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useCatCitizensStore } from '../store/useCatCitizensStore';
import { ReactHookForm } from '../components';
import { rhfFormText } from '../constants/formText';

describe('ReactHookForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    useCatCitizensStore.getState().resetCitizens();
  });

  it('показывает ошибку при пустом поле имени', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onSuccess={mockOnSuccess} />);

    const nameInput = screen.getByPlaceholderText(rhfFormText.namePlaceholder);
    await user.type(nameInput, 'барсик');
    await user.clear(nameInput);

    expect(await screen.findByText(/имя обязательно/i)).toBeInTheDocument();
  });

  it('показывает ошибку, если имя не начинается с заглавной буквы', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onSuccess={mockOnSuccess} />);

    const nameInput = screen.getByLabelText(rhfFormText.nameLabel);
    await user.type(nameInput, 'барсик');
    await user.tab();

    expect(
      await screen.findByText(/первая буква имени должна быть заглавной/i)
    ).toBeInTheDocument();
  });

  it('показывает ошибку, если имя содержит цифры', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onSuccess={mockOnSuccess} />);

    const nameInput = screen.getByPlaceholderText(rhfFormText.namePlaceholder);
    await user.type(nameInput, '123');
    await user.tab();

    expect(
      await screen.findByText(/имя не должно содержать цифры/i)
    ).toBeInTheDocument();
  });

  it('показывает ошибку при несовпадении паролей', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onSuccess={mockOnSuccess} />);

    await user.type(
      screen.getByPlaceholderText(rhfFormText.namePlaceholder),
      'Мурзик'
    );
    await user.type(
      screen.getByPlaceholderText(rhfFormText.agePlaceholder),
      '2'
    );
    await user.type(
      screen.getByPlaceholderText(rhfFormText.emailPlaceholder),
      'murzik@example.com'
    );
    await user.type(
      screen.getByPlaceholderText(rhfFormText.countryPlaceholder),
      'США'
    );
    await user.click(screen.getByLabelText(rhfFormText.termsLabel));

    const passwordInput = screen.getByLabelText(rhfFormText.passwordLabel);
    const confirmInput = screen.getByLabelText(
      rhfFormText.confirmPasswordLabel
    );

    await user.type(passwordInput, '123456');
    await user.type(confirmInput, '654321');
    await user.tab();

    expect(await screen.findByText(/пароли не совпадают/i)).toBeInTheDocument();
  });

  it('успешно отправляет форму с валидными данными', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByLabelText(rhfFormText.nameLabel), 'Барсик');
    await user.type(screen.getByLabelText(rhfFormText.ageLabel), '3');
    await user.type(
      screen.getByLabelText(rhfFormText.emailLabel),
      'barsik@example.com'
    );
    await user.type(screen.getByLabelText(rhfFormText.countryLabel), 'Россия');
    await user.type(screen.getByLabelText(rhfFormText.passwordLabel), '123456');
    await user.type(
      screen.getByLabelText(rhfFormText.confirmPasswordLabel),
      '123456'
    );
    await user.click(screen.getByLabelText(rhfFormText.termsLabel));

    await user.click(
      screen.getByRole('button', { name: rhfFormText.submitButton })
    );

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });

    const { citizens } = useCatCitizensStore.getState();
    expect(citizens).toHaveLength(1);
    expect(citizens[0].name).toBe('Барсик');
  });

  it('показывает ошибку при неподходящем типе файла', async () => {
    userEvent.setup();
    render(<ReactHookForm onSuccess={mockOnSuccess} />);

    const fileInput = screen.getByLabelText(/фото/i);
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(await screen.findByText(/только png или jpeg/i)).toBeInTheDocument();
  });

  it('показывает ошибку при слишком большом файле', async () => {
    userEvent.setup();
    render(<ReactHookForm onSuccess={mockOnSuccess} />);

    const fileInput = screen.getByLabelText(/фото/i);
    const bigFile = new File(['a'.repeat(3 * 1024 * 1024)], 'test.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(fileInput, { target: { files: [bigFile] } });

    expect(
      await screen.findByText(/размер файла не более 2 mb/i)
    ).toBeInTheDocument();
  });
});
