import { useNavigate } from 'react-router-dom';
import List from 'components/List';
import Card from 'components/Card';
import { CountryInfo } from 'types';
import useCountries from './useCountries';

const CountryList = () => {
  const navigate = useNavigate();

  const [countries, { error, status }] = useCountries();

  return (
    <>
      {error && <h2 style={{ paddingTop: '2.5rem' }}>Can&apos;t fetch data</h2>}
      {status === 'loading' && <h2 style={{ paddingTop: '2.5rem' }}>Loading...</h2>}

      {status === 'received' && (
      <List>
        {countries.map((c) => {
          const countryInfo: CountryInfo = {
            img: c.flags.png,
            name: c.name,
            info: [
              {
                title: 'Population',
                description: c.population.toLocaleString('en'),
              },
              {
                title: 'Region',
                description: c.region,
              },
              {
                title: 'Capital',
                description: c.capital,
              },
            ],
          };

          return (
            <Card
              key={c.name}
              onClick={() => navigate(`/country/${c.name}`)}
              {...countryInfo}
            />
          );
        })}
      </List>
      )}
    </>
  );
};

export default CountryList;
