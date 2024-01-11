import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Controls from './components/Controls';

const App = () => (
  <>
    <Header />
    <Main>
      <Controls />
    </Main>
  </>

);

export default App;
