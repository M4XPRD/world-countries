import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import CountryDetails from 'features/details/CountryDetails';
import Button from '../components/Button';

const Details = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button onClick={handleGoBack}>
        <IoArrowBack />
        {' '}
        Back
      </Button>
      <CountryDetails name={name} navigate={navigate} />
    </div>
  );
};

export default Details;
