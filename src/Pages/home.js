import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { CountryContext } from '../Context/CountriesContext';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LanguageIcon from '@mui/icons-material/Language';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Navbar from '../Components/Navbar';
import CountriesMain from "../Components/CountriesMain"


const Container = styled.div`
  position: relative;
  display: Flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`

const CountryPage = styled.div`
  background-color: rgba(0,0,0,0.9);
  position: fixed;
  height: 100%;
  width: 100vw;
  color: white;
  margin: 0;
  display: flex;
  z-index: 20;
  flex-direction: column;
`

const CountryAllInfoContainer= styled.div`
    display: flex;

    @media (max-width: 500px) {
      flex-direction: column;
        overflow-y: scroll;
        height: auto;
    }
`

const NotClickedButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  padding-top: 20px;
  right: 5%;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  transform: scale(1.4);
`

const CountryInfo = styled.div`
  flex: 1;

  @media (max-width: 500px) {
    margin: 50px;
  }
`

const CountryTitle = styled.h1`
  font-size: 70px;
  color: white;
  position: relative;
  text-align: center;
  font-weight: bold;
  text-shadow: 5px 5px black;

  @media (max-width: 1000px) {
    font-size: 60px;
  }

  @media (max-width: 8500px) {
    font-size: 55px;
  }

  @media (max-width: 600px) {
    font-size: 50px;
  }

  @media (max-width: 400px) {
    font-size: 40px;
    margin-top: 60px;
  }

  @media (max-width: 350px) {
    font-size: 35px;
  }
`

const CountryImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1;
`

const CountryImg = styled.img`
  display: flex;
  width: 80%;
  height: auto;
`


const ReadMoreButton = styled.button`
  background-color: transparent;
  padding: 10px 20px;
  margin: 2px;
  border: 2px solid white;
  color: white;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: black;
    border-color: white;
  }
`

const CountryDesc = styled.p`
  padding-left: 10px;
  font-size: 17px;
`
const TitleContainer = styled.div`
  display: flex;
  justify: content: center;
  align-items: center;
`  


const Span = styled.p`
font-size: 17px;
  display: inline-block;
  color: white;
  align-self: center;
  font-weight: 1000;
  margin: 0;
`


const Home = () => {

  const { clicked, setClicked, countriesData, setCountriesData, countryData } = useContext(CountryContext);
    
    useEffect(() => {
      const getInfo = async () => { 
        const res = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountriesData(res)}
        
        getInfo()
      }, []);

      useEffect(() => {
        console.log(countriesData)
      }, [countriesData]);
      

  return (
    <Container>

      {clicked &&

          countryData &&
        <CountryPage>
          <CountryTitle>{countryData.name.common.toUpperCase()}</CountryTitle>
          <NotClickedButton onClick={() => setClicked(false)}><ClearIcon /></NotClickedButton>
          <CountryAllInfoContainer>
          <CountryImgContainer>
          <CountryImg src={countryData.flags.png} />
          </CountryImgContainer>
          <CountryInfo>
              { !countryData.capital ? <></> :
              (<>
              <TitleContainer>
              <LocationOnIcon style={{ paddingRight: "5px" }}/>
              <Span>Capital: </Span>
              </TitleContainer>
              <CountryDesc>{countryData.capital}</CountryDesc>
              </>
              )}
              { !countryData.population ? <></> :
              (<>
                <TitleContainer>
              <EmojiPeopleIcon style={{ paddingRight: "5px" }}/>
              <Span>Population: </Span>
              </TitleContainer>
              <CountryDesc>{countryData.population}</CountryDesc>
              </>
              )}
              { !countryData.languages ? <></> :
              (<>
              <TitleContainer>
              <LanguageIcon style={{ paddingRight: "5px" }}/>
              <Span>Languages: </Span>
              </TitleContainer>
              <CountryDesc>{Object.values(countryData.languages).map(language => `${language} `)}</CountryDesc>
              </>
              )}
              { !countryData.currencies ? <></> :
              (<>
              <TitleContainer>
              <LocalAtmIcon style={{ paddingRight: "5px" }}/>
              <Span>Currency: </Span>
              </TitleContainer>
              <CountryDesc>{Object.values(countryData.currencies)[0].name}</CountryDesc>
              </>
              )}
              <Link to={`/Countries/${countryData.name.common}`}>
                 <ReadMoreButton>Learn More</ReadMoreButton>
              </Link>
          </CountryInfo>
          </CountryAllInfoContainer>
        </CountryPage>
      }

        <Navbar />
        <CountriesMain />
    </Container>
  )
}

export default Home;