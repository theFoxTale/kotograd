import { create } from 'zustand';

export interface Citizen {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  terms: boolean;
  createdAt: number;
}

interface CatCitizensStore {
  citizens: Citizen[];
  addCitizen: (data: Omit<Citizen, 'id' | 'createdAt'>) => void;
}

export const useCatCitizensStore = create<CatCitizensStore>((set) => ({
  citizens: [],
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
