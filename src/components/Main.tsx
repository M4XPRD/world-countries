import styled from 'styled-components';
import { ReactNode } from 'react';
import Container from './Container';

const Wrapper = styled.main`
  padding: 2rem 0;
  
  @media (min-width: 767px) {
    padding: 4rem 0;
  }
`;

interface MainProps {
  children: ReactNode,
}

const Main = ({ children }: MainProps) => (
  <Wrapper>
    <Container>
      {children}
    </Container>
  </Wrapper>
);

export default Main;
