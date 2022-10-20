import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { CountryContext } from '../Context/CountriesContext';
import axios from "axios";
import styled from 'styled-components';
import NavbarCountry from '../Components/NavbarCountry';
import CountryInfo from '../Components/CountryInfo';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`


const Country = () => {

  const { countryData, setCountryData, setTimeZone, setClimateInfo } = useContext(CountryContext);

  const {id} = useParams();

  console.log(countryData)

  useEffect(() => { 
    !countryData &&
      axios.get(`https://restcountries.com/v3.1/all`)
      .then(res => res.data.map(country => 
          country.name.common === id && setCountryData(country)
      ))
    });

    useEffect(() => {
      countryData &&
      axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.REACT_APP_TIMEZONEDB_KEY}&format=json&by=position&lat=${countryData.latlng[0]}&lng=${countryData.latlng[1]}`)
      .then(res => setTimeZone(res))
    },[countryData])

    useEffect(() => {
      countryData &&
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryData.name.common}&appid=7fd12f101f60e40c6fdc494861d4c7f2`)
      .then(res => setClimateInfo(res))
    },[countryData])

    return (
    countryData &&
    <Container>

      <NavbarCountry />
      <CountryInfo />

    </Container>
    )
}

export default Country;