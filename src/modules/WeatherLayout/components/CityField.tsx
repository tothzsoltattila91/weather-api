import { ChangeEvent } from 'react';

interface ComponentProps {
  value: string;
  onFieldChange(event: ChangeEvent<HTMLInputElement>): void;
  onSearch(): void;
}

function CityField({ value, onFieldChange, onSearch }: ComponentProps) {
  return (
    <div className="citySearch">
      <label>City Name </label>
      <div>
        <input className="cityField" value={value} onChange={onFieldChange} />
        <button className="searchButton" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export { CityField };
