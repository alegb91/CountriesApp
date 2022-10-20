import { CountryContext } from '../Context/CountriesContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { useState } from 'react';


const SearchContainer = styled.div`
    padding: 0 30px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
    color: white;
  
  @media(max-width: 1300px) {
    flex-direction: column;
  }

  @media(max-width: 600px) {
    padding: 0;
  }
    `

  const Input = styled.input`
    width: 200px; 
    padding: 10px 25px;
    background-color: white;
    border-radius: 50px;
    border: 2px solid white;
    font-size: 16px;
    color: black;

    &:focus {
      outline: none;
    }

    @media(max-width: 1300px) {
      align-self: start;
      margin: 10px 10px 10px 10px; 
    }
  
    @media(max-width: 600px) {
      flex: 1;
    }
    `

  const Continents = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

    @media (max-width: 600px) {
      flex-direction: column;
      display: ${props => props.menuClicked ? "flex" : "none"};
    }
  `

  const ContinentButton = styled.button`
    background-color: transparent;
    color: white;
    border: none;
    padding: 27px 20px;
    margin: 0 2px;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: rgba(255,255,255,0.1); 
    }

    @media (max-width: 900px) {
      padding: 27px 10px;
    }

    @media (max-width: 600px) {
      display: block;
      width: 100%;
    }
  `

  const Hammbmenu = styled.a`
    margin: 20px 30px;  
    padding: 0;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    align-self: end;
    width: 30px;
    height: 21px;
    cursor: pointer;
    z-index: 5;
    color: white;

    @media (max-width: 600px) {
        display: flex;
    }
` 

const HambMenuLine = styled.div`
    margin: 0;  
    padding: 0;
    height: 3px;
    width: 100%;
    background-color: white;
    border-radius: 5px;
`

  const OthersContainer = styled.div`
    display: flex;
    justify-content: cebter;
    align-items: center;
    width: 100%;

    @media(max-width: 600px) {
      justify-content: space-between;
    }

    @media(max-width: 500px) {
      flex-direction: column-reverse;
    }
  `

  const Menucontainer= styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    @media(max-width: 600px) {
      flex: 1;
      justify-content: space-between;
    }
  `

  const ClearButton = styled.button`
    background-color: transparent;
    color: white;
    padding: 10px 25px;
    margin: 10px 10px;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border-radius: 50px;
    border: none;
    border: 2px solid white;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: white;
      color: black;
      border: 2px solid white;
    }

    @media (max-width: 900px) {
      margin-left: 10px;
    }
  `

const Navbar = () => {

    const { setContinentInput, setCountryInput } = useContext(CountryContext);

    const [ menuClicked, setMenuClicked ] = useState(false)

    const handleClear = () => {
        setContinentInput("");
        setCountryInput("");
        document.getElementById("Input").value = "";
      }

  return (
    <SearchContainer>
      <OthersContainer>
        <Input id="Input" onChange={e => setCountryInput(e.target.value)}/> 
        <Menucontainer>
          <ClearButton color="black" onClick={() => handleClear()}>Clear</ClearButton>
          <Hammbmenu onClick={() => setMenuClicked(!menuClicked)}>
              <HambMenuLine></HambMenuLine>
              <HambMenuLine></HambMenuLine>
              <HambMenuLine></HambMenuLine>
          </Hammbmenu>
          </Menucontainer>
        </OthersContainer>
        <Continents menuClicked={menuClicked}>
          <ContinentButton color="rgb(185, 57, 170, 0.6)" onClick={() => setContinentInput("Europe")}>Europe</ContinentButton>
          <ContinentButton color="rgb(220, 200, 30,0.6)" onClick={() => setContinentInput("Asia")}>Asia</ContinentButton>
          <ContinentButton color="rgb(38, 100, 255,0.8)" onClick={() => setContinentInput("Oceania")}>Oceania</ContinentButton>
          <ContinentButton color="rgb(30, 202, 72,0.6)" onClick={() => setContinentInput("Africa")}>Africa</ContinentButton>
          <ContinentButton color="rgb(228,13,13,0.6)" onClick={() => setContinentInput("South America")}>South America</ContinentButton>
          <ContinentButton color="rgb(228,13,13,0.6)" onClick={() => setContinentInput("North America")}>North America</ContinentButton>
          <ContinentButton color="rgb(0,207,183,0.6)" onClick={() => setContinentInput("Antarctica")}>Antarctica</ContinentButton>
        </Continents>
      </SearchContainer>
  )
}

export default Navbar;