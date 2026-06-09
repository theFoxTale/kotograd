import { useCatCitizensStore } from '../../store/useCatCitizensStore';
import { CitizenCard } from '../CitizenCard/CitizenCard';

import './CitizensList.css';

interface CitizensListProps {
  newCitizenId?: string | null;
}

export function CitizensList({ newCitizenId }: CitizensListProps) {
  const citizens = useCatCitizensStore((state) => state.citizens);

  return (
    <div className="submissions-section">
      <h2 className="submissions-title">Наши пушистые жители</h2>
      <div className="submissions-grid">
        {citizens.length === 0 ? (
          <p className="submissions-empty">
            Пока ни одного котика не зарегистрировано.
          </p>
        ) : (
          citizens.map((citizen) => (
            <CitizenCard
              key={citizen.id}
              id={citizen.id}
              name={citizen.name}
              age={citizen.age}
              email={citizen.email}
              gender={citizen.gender}
              createdAt={citizen.createdAt}
              isHighlighted={citizen.id === newCitizenId}
            />
          ))
        )}
      </div>
    </div>
  );
}
