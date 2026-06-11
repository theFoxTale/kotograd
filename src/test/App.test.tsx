import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import { uncontrolledFormText, rhfFormText } from '../constants/formText';
import { appText, buttonTexts, labelText } from '../constants/appText';

describe('App', () => {
  it('отображает заголовок и кнопки вызова форм', () => {
    render(<App />);

    expect(screen.getByText(appText.appTitle)).toBeInTheDocument();
    expect(
      screen.getByText(buttonTexts.uncontrolledButtonTitle)
    ).toBeInTheDocument();
    expect(screen.getByText(buttonTexts.rhfButtonTitle)).toBeInTheDocument();
  });

  it('открывает модальное окно с неконтролируемой формой по клику на первую кнопку', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(buttonTexts.uncontrolledButtonTitle));

    const modal = await screen.findByRole('dialog');
    expect(
      within(modal).getByText(uncontrolledFormText.title)
    ).toBeInTheDocument();
    expect(
      within(modal).getByLabelText(uncontrolledFormText.nameLabel)
    ).toBeInTheDocument();
  });

  it('открывает модальное окно с формой React Hook Form по второй кнопке', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(buttonTexts.rhfButtonTitle));

    const modal = await screen.findByRole('dialog');
    expect(within(modal).getByText(rhfFormText.title)).toBeInTheDocument();
    expect(
      within(modal).getByLabelText(rhfFormText.nameLabel)
    ).toBeInTheDocument();
  });

  it('закрывает модальное окно по кнопке "✕"', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(buttonTexts.uncontrolledButtonTitle));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByLabelText(labelText.modalClose);
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('закрывает модальное окно по клавише ESC', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(buttonTexts.uncontrolledButtonTitle));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('закрывает модальное окно по клику на оверлей', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(buttonTexts.uncontrolledButtonTitle));

    const modal = await screen.findByRole('dialog');
    const overlay = modal.parentElement;
    await user.click(overlay!);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('перемещает фокус внутри модального окна при нажатии Tab', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(buttonTexts.uncontrolledButtonTitle));

    const modal = await screen.findByRole('dialog');
    const focusableElements = modal.querySelectorAll(
      'input, button, [tabindex]'
    );
    expect(focusableElements.length).toBeGreaterThan(0);

    await user.tab();
    expect(document.activeElement).toBe(focusableElements[0]);
  });
});
