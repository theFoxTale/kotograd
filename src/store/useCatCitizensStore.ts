import { create } from 'zustand';

export interface Citizen {
  id: string;
  name: string;

  age: number;
  email: string;
  gender: string;
  country: string;

  terms: boolean;
  createdAt: number;
}

interface CatCitizensStore {
  citizens: Citizen[];
  countries: string[];
  addCitizen: (data: Omit<Citizen, 'id' | 'createdAt'>) => void;
}

const defaultCountries = [
  'Россия',
  'США',
  'Канада',
  'Великобритания',
  'Германия',
  'Франция',
  'Италия',
  'Испания',
  'Китай',
  'Япония',
  'Корея',
  'Бразилия',
  'Австралия',
  'Индия',
  'Мексика',
  'Нидерланды',
  'Швеция',
  'Норвегия',
  'Финляндия',
  'Польша',
  'Беларусь',
  'Казахстан',
];

export const useCatCitizensStore = create<CatCitizensStore>((set) => ({
  citizens: [],
  countries: defaultCountries,
  addCitizen: (data) =>
    set((state) => ({
      citizens: [
        {
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          ...data,
        },
        ...state.citizens,
      ],
    })),
}));
