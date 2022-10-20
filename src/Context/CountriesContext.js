import React, { createContext, useState } from "react";

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {

    const [countryInput, setCountryInput] = useState("");
    const [continentInput, setContinentInput] = useState("");
    const [countryData, setCountryData] = useState();
    const [countriesData, setCountriesData] = useState();
    const [clicked, setClicked] = useState(false);
    const [timeZone, setTimeZone] = useState();
    const [climateInfo, setClimateInfo] = useState()

    return (
        <CountryContext.Provider value={{
            countryInput,
            setCountryInput,
            countryData,
            setCountryData,
            countriesData,
            setCountriesData,
            continentInput,
            setContinentInput,
            clicked,
            setClicked,
            setTimeZone,
            timeZone,
            climateInfo,
            setClimateInfo
        }}>
            {children}
        </CountryContext.Provider>
    )
}