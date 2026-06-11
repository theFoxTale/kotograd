import { imageToBase64 } from '../utils';

describe('imageToBase64', () => {
  it('конвертирует файл в base64 строку', async () => {
    const file = new File(['test content'], 'test.png', { type: 'image/png' });
    const base64 = await imageToBase64(file);
    expect(base64).toMatch(/^data:image\/png;base64,/);
  });
});
