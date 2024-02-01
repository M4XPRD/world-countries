import Info from './Info';
import useDetails from './useDetails';

const CountryDetails = ({ name = '', navigate }) => {
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
