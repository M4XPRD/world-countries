import styled from 'styled-components';
import { Country } from 'types';
import { NavigateFunction } from 'react-router-dom';
import useNeighbours from './useNeighbours';

const Wrapper = styled.section`
  margin-top: 2.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;

const ListGroup = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--color-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

interface InfoProps extends Country {
  navigate: NavigateFunction,
}

const Info = (props: InfoProps) => {
  const {
    name,
    nativeName,
    flag,
    capital,
    population,
    region,
    subregion,
    topLevelDomain,
    currencies = [],
    languages = [],
    borders = [],
    navigate,
  } = props;

  const neighbours = useNeighbours(borders);

  const handleNeighbourCountry = (neighbourName: string) => {
    navigate(`/country/${neighbourName}`);
  };

  return (
    <Wrapper>
      <InfoImage src={flag} alt={name} />
      <div>
        <InfoTitle>{name}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name: </b>
              {nativeName}
            </ListItem>
            <ListItem>
              <b>Population: </b>
              {population.toLocaleString('en')}
            </ListItem>
            <ListItem>
              <b>Region: </b>
              {region}
            </ListItem>
            <ListItem>
              <b>Subregion: </b>
              {subregion}
            </ListItem>
            <ListItem>
              <b>Capital: </b>
              {capital}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain: </b>
              {topLevelDomain.map((domain) => (
                <span key={domain}>{domain}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currencies: </b>
              {currencies.map((currency) => (
                <span key={currency.code}>{currency.name}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Languages: </b>
              {languages.map((lang, index) => (
                <span key={lang.name}>
                  {lang.name}
                  {index + 1 !== languages.length && ', '}
                  {' '}
                </span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries: </b>
          {!borders.length ? (
            <span>There are no border countries</span>
          ) : (
            <TagGroup>
              {neighbours.map((countryName) => (
                <Tag
                  key={countryName}
                  onClick={() => handleNeighbourCountry(countryName)}
                >
                  {countryName}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};

export default Info;
