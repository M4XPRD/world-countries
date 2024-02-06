import { NavigateFunction } from 'react-router-dom';
import Info from './Info';
import useDetails from './useDetails';

interface CountryDetailsProps {
  name: string;
  navigate: NavigateFunction;
}

const CountryDetails = ({ name = '', navigate }: CountryDetailsProps) => {
  const { status, error, currentCountry } = useDetails(name);

  return (
    <>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {currentCountry && <Info navigate={navigate} {...currentCountry} />}
    </>
  );
};

export default CountryDetails;
