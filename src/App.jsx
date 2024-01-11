import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Main from './components/Main';
import Controls from './components/Controls';
import { ALL_COUNTRIES } from './config';
import List from './components/List';
import Card from './components/Card';

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getCountries = async () => {
      axios.get(ALL_COUNTRIES, { signal })
        .then(({ data }) => {
          setCountries(data);
        })
        .catch((err) => {
          if (err.message !== 'canceled') {
            console.log('error: ', err);
          }
        });
    };

    getCountries();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <Main>
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
              <Card key={name} {...countryInfo} />
            );
          })}
        </List>
      </Main>
    </>

  );
};

export default App;
