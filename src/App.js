import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Pages/home';
import Country from "./Pages/country"

const Container = styled.div`
`

function App() {

  return (
    <Container>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Countries/:id" element={<Country />}/>
        </Routes>
    </Container>
  );
}

export default App;
