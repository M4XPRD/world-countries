import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Controls from '../components/Controls';
import List from '../components/List';
import Card from '../components/Card';
import { ALL_COUNTRIES } from '../config';

const HomePage = ({ countries, setCountries }) => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/country/${name}`);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getCountries = async () => {
      if (!countries.length) {
        axios
          .get(ALL_COUNTRIES, { signal })
          .then(({ data }) => {
            setCountries(data);
          })
          .catch((err) => {
            if (err.message !== 'canceled') {
              console.log('error: ', err);
            }
          });
      }
    };

    getCountries();

    return () => {
      controller.abort();
    };
  }, [setCountries, countries.length]);

  return (
    <>
      <Controls />
      <List>
        {countries.map((country) => {
          const {
            capital, name, population, region, flags,
          } = country;
          const countryInfo = {
            img: flags.png,
            name,
            info: [
              {
                title: 'Population',
                description: population.toLocaleString(),
              },
              {
                title: 'Region',
                description: region,
              },
              {
                title: 'Capital',
                description: capital,
              },
            ],
          };

          return (
            <Card
              key={name}
              onClick={() => handleClick(name)}
              {...countryInfo}
            />
          );
        })}
      </List>
    </>
  );
};

export default HomePage;
