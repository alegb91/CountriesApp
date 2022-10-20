import styled from 'styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useContext } from 'react'
import { Link} from 'react-router-dom';
import { CountryContext } from '../Context/CountriesContext';

const SearchContainer = styled.div`
  margin: 0;
  padding: 0 30px;
  height: 12vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0,0,0,0.7);
  color: white;
  `

  const Button = styled.button`
  border: none; 
  background-color: transparent;
  transform: scale(1.5);
  cursor: pointer;
  padding: 0 20px;
  transition: all 0.3s ease-in-out;
  color: white;

  &:hover {
    transform: scale(1.7);
  }
  `

  const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `


  const Title = styled.h1`
    margin: 0;
    font-size: 24px;

    @media (max-width: 400px) {
      display: none;
    }
  `

const Flag = styled.img`
    height: 10vh;
    width: auto;
    padding: 0 20px;
  `

const NavbarCountry = () => {

    const { countryData, setClicked, setCountryInput, setContinentInput } = useContext(CountryContext);

    const resetInput = () => {
      setClicked(false);
      setCountryInput("");
      setContinentInput("");
    }

  return (
    <SearchContainer>
        <Link to="/">
          <Button onClick={resetInput()}><ArrowBackIosIcon /></Button>
        </Link>
        <TitleContainer>
          <Title>{countryData.name.common.toUpperCase()}</Title>
          <Flag src={countryData.flags.png}/>
        </TitleContainer>
    </SearchContainer>
  )
}

export default NavbarCountry;