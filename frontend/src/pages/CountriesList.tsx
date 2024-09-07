import React from 'react';
import { useCountries } from '../api/requests';

const CountriesList: React.FC = () => {
  const { data: countries, isLoading, isError, error } = useCountries();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Countries List</h1>
      <ul>
        {countries.map((country: { countryCode: string; name: string }) => (
          <li key={country.countryCode}>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
