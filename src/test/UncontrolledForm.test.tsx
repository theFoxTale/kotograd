import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UncontrolledForm } from '../components';
import { uncontrolledFormText } from '../constants/formText';
import { useCatCitizensStore } from '../store/useCatCitizensStore';

describe('UncontrolledForm', () => {
  const mockOnSuccess = vi.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
    useCatCitizensStore.getState().resetCitizens();
  });

  it('показывает ошибки валидации при отправке пустой формы', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const submitButton = screen.getByRole('button', {
      name: uncontrolledFormText.submitButton,
    });
    await user.click(submitButton);

    expect(
      await screen.findByText(/Выберите страну из списка/i)
    ).toBeInTheDocument();
  });

  it('показывает ошибки валидации при отправке пустой формы (кроме страны)', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    await user.type(
      screen.getByPlaceholderText(uncontrolledFormText.countryPlaceholder),
      'Россия'
    );

    const submitButton = screen.getByRole('button', {
      name: uncontrolledFormText.submitButton,
    });
    await user.click(submitButton);

    expect(
      await screen.findByText(/Необходимо принять условия/i)
    ).toBeInTheDocument();
  });

  it('успешно отправляет форму с корректными данными', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    await user.type(
      screen.getByPlaceholderText(uncontrolledFormText.namePlaceholder),
      'Барсик'
    );
    await user.type(
      screen.getByPlaceholderText(uncontrolledFormText.agePlaceholder),
      '3'
    );
    await user.type(
      screen.getByPlaceholderText(uncontrolledFormText.emailPlaceholder),
      'barsik@example.com'
    );
    await user.type(
      screen.getByPlaceholderText(uncontrolledFormText.countryPlaceholder),
      'Россия'
    );
    await user.type(
      screen.getByLabelText(uncontrolledFormText.passwordLabel),
      '123456'
    );
    await user.type(
      screen.getByLabelText(uncontrolledFormText.confirmPasswordLabel),
      '123456'
    );
    await user.click(screen.getByLabelText(uncontrolledFormText.termsLabel));

    await user.click(
      screen.getByRole('button', { name: uncontrolledFormText.submitButton })
    );

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });

    const { citizens } = useCatCitizensStore.getState();
    expect(citizens).toHaveLength(1);
    expect(citizens[0].name).toBe('Барсик');
  });

  it('показывает ошибку при несовпадении паролей', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    await user.type(
      screen.getByPlaceholderText(uncontrolledFormText.countryPlaceholder),
      'Россия'
    );

    await user.type(
      screen.getByLabelText(uncontrolledFormText.passwordLabel),
      '123456'
    );
    await user.type(
      screen.getByLabelText(uncontrolledFormText.confirmPasswordLabel),
      '654321'
    );

    await user.click(
      screen.getByRole('button', { name: uncontrolledFormText.submitButton })
    );
    expect(await screen.findByText(/Пароли не совпадают/i)).toBeInTheDocument();
  });

  it('показывает ошибку при неподходящем типе файла в uncontrolled форме', async () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

    const fileInput = screen.getByLabelText(/фото/i);
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(await screen.findByText(/только png или jpeg/i)).toBeInTheDocument();
  });

  it('показывает ошибку при слишком большом файле в uncontrolled форме', async () => {
    render(<UncontrolledForm onSuccess={mockOnSuccess} />);

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
