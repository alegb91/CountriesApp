import React, { useContext } from 'react'
import { CountryContext } from '../Context/CountriesContext';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import LanguageIcon from '@mui/icons-material/Language';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Loading from 'react-loading-components';


const AllInfoContainer = styled.div`
margin: 25px 0 0 0;
padding: 0;
background-image: url(${props => props.bgImage && props.bgImage});
background-repeat: no-repeat;
background-position: center;
background-size: auto 100%;
position: relative;
z-index: 0;
display: flex;

@media (max-width: 800px) {
  flex-direction: column;
}
`

const MainTitle = styled.div`
font-weight: bold;
z-index: 10;
text-align: center;
padding: 20px 10px 10px 10px;

@media (max-width: 450px) {
  font-size: 40px;
}
`

const SecondaryContainer= styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 10px 10px 40px;
`

const CountryInfoContainer = styled.div`
  flex: 1;
  z-index: 10;
  display: flex; 
  justify-content: center;
  align-items: center;
  `
  
  
const LeftContainer= styled.div`
padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;

  @media (max-width: 350px) {
    padding: 0;
  }
`

const RightContainer = styled.div`
padding: 10px 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   @media (max-width: 350px) {
    padding: 0;
    align-items: start;
  }
`

const DataTitle= styled.h2`
  font-size: 40px;
  margin: 10px 10px 20px 10px;
  z-index: 10;
  text-align: center;

  @media (max-width: 450px) {
    font-size: 30px;
  }
`

const DataImg= styled.img`
  width: 80px;
  height: auto;
`

const DataP = styled.p`
  font-size: 20px;
  font-weight: bold;
`

const CountryDesc = styled.p`
  padding-left: 10px;
  font-size: 18px;
  margin: 10px;
  font-weight: bold;
  `
const TitleContainer = styled.div`
  display: flex;
  justify: content: center;
  align-items: center;
`  


const Span = styled.p`
  font-size: 20px;
  display: inline-block;
  color: black;
  align-self: center;
  font-weight: 1000;
  margin: 0;
`

const Background= styled.div`
height: 100%;
width: 100%;
position: absolute;
background-color: rgba(255,255,255,0.8);
z-index: 0;
`

const Iframe = styled.iframe`
flex: 1;
border: 2px solid black;
opacity: 0.8;
position: relative;
padding: 0;
margin: 30px;

@media (max-width: 800px) {
  height: 300px;
  flex: none;
}
`

const CountryInfo = () => {
  

    const { countryData, timeZone, climateInfo } = useContext(CountryContext);

  return (

     !timeZone ?
      
      <div style={{ position: "relative", top: "0", bottom:"0", margin: "auto", marginTop: "160px" }}>
         <Loading type='oval' width={100} height={100} fill='black' />
         </div> :
      
    
    <AllInfoContainer bgImage={countryData.coatOfArms.png}>
      <Background />

      <SecondaryContainer>
        <MainTitle style={{ fontSize: "40px" }}>{countryData.name.common.toUpperCase()}</MainTitle>     
        <DataTitle>{timeZone.data.formatted}</DataTitle>
      <CountryInfoContainer>
        <RightContainer>
        <DataTitle>{Math.round(climateInfo.data.main.temp - 273.15)}°C</DataTitle>
        <DataImg src={`http://openweathermap.org/img/wn/${climateInfo.data.weather[0].icon}.png`}/>
        <DataP>Humidity: {climateInfo.data.main.humidity}%</DataP>
        <DataP> Wind Speed: {Math.round((climateInfo.data.wind.speed) * 1,60934)}km/h</DataP>
        </RightContainer>
          <LeftContainer>
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
               </LeftContainer>
          </CountryInfoContainer>
          </SecondaryContainer>

        <Iframe
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLEAPI_KEY}&q=${countryData.name.common}`}
            allowFullScreen>
        </Iframe>

        
    </AllInfoContainer>
  )
}

export default CountryInfo;