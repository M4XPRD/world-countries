import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { searchByCountry } from '../config';
import Button from '../components/Button';
import Info from '../components/Info';

const Details = () => {
  const [country, setCountry] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getCountryData = async () => {
      axios
        .get(searchByCountry(name), { signal })
        .then(({ data }) => {
          const [countryData] = data;
          setCountry(countryData);
        })
        .catch((err) => {
          if (err.message !== 'canceled') {
            console.log('error: ', err);
          }
        });
    };

    getCountryData();

    return () => {
      controller.abort();
    };
  }, [name]);

  return (
    <div>
      <Button type="button" onClick={handleGoBack}>
        <IoArrowBack />
        {' '}
        Back
      </Button>
      {country && (
        <Info {...country} navigate={navigate} />
      )}
    </div>
  );
};

export default Details;
