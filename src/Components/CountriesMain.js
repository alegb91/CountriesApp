import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { CountryContext } from '../Context/CountriesContext';
import Loading from 'react-loading-components';


const Container = styled.div`
  position: relative;
  display: Flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
`

const CountriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0 0 0;
  justify-content: center;
  align-items: center;
`

const ImgContainer = styled.div`
width: 22.5%;
padding: 15px;
height: 200px;
display: flex;
justify-content: center;
align-items: center;

@media (max-width: 1200px ){
  width: 30%;
}

@media (max-width: 900px ){
  width: 45%;
}

@media (max-width: 600px ){
  width: 60%;
}

@media (max-width: 450px ){
  width: 80%;
}

@media (max-width: 350px ){
  height: 150px;
}
`

const Img = styled.img`
height: 100%;
max-width: 88%;
box-shadow: -1px 1px 1px gray;
transition: all 0.3s ease-in-out;
cursor: pointer;

&:hover {
  transform: scale(1.05);
}
`


const CountriesMain = () => {

    const { setClicked, countriesData, setCountriesData, setCountryData, countryInput, continentInput } = useContext(CountryContext);
    
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

        <CountriesContainer>
            {
            !countriesData ? (
              <div style={{ marginTop: "160px" }}>
            <Loading type='oval' width={100} height={100} fill='black' />
            </div>
            ) :
            countriesData.data.filter((country => {
                return country.name.common.toLowerCase().startsWith(countryInput.toLowerCase())
            }))
            .filter((country => {
            return country.continents[0].toLowerCase().startsWith(continentInput.toLowerCase())
            }))
            .map((country, i) => (
                <ImgContainer key={i}>
                <Img onClick={()=> {
                    setClicked(true);
                    setCountryData(country);
                    }} src={country.flags.png}/>
                </ImgContainer>   
                ))}
        </CountriesContainer>  
    </Container>
  )
}

export default CountriesMain;