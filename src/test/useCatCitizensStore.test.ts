import { useCatCitizensStore } from '../store/useCatCitizensStore';

describe('useCatCitizensStore', () => {
  it('добавляет нового гражданина', () => {
    const { citizens, addCitizen } = useCatCitizensStore.getState();
    expect(citizens).toHaveLength(0);

    const newCitizen = {
      name: 'Барсик',
      age: 3,
      email: 'barsik@example.com',
      gender: 'male',
      terms: true,
      country: 'Россия',
      password: '123456',
    };
    addCitizen(newCitizen);

    const updated = useCatCitizensStore.getState();
    expect(updated.citizens).toHaveLength(1);
    expect(updated.citizens[0].name).toBe('Барсик');
  });
});
