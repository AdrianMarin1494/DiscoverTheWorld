"use client";

import React, {useState, useEffect, useRef} from "react";

import { getCountries } from "../services/getCountries";
import DetailsModal from "./DetailsModal";

const CountriesData = () => {
    const [data, setData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [countryDetails, setCountryDetails] = useState([]);
    const userInput = useRef();
    const selectedRegion = useRef();
    const selectedLanguage = useRef();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const result = await getCountries();
                setData(result);
                console.log(result);
                setCountries(result.map(item => (
                        item["name"]["common"]
                )));
                setFilteredCountries(result.map(item => (
                    item["name"]["common"]
            )));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    function filterData() {
        console.log(userInput.current.value)
        let searchingWord = userInput.current.value
        setFilteredCountries(countries.filter(country => country.includes(searchingWord)))
    }
    function filterCountriesByRegion() {
        console.log(data);
        const dataFilteredByRegion = data.filter(item => item["region"].includes(selectedRegion.current.value));
        const countriesFilteredByRegion = dataFilteredByRegion.map(item => item["name"]["common"])
        setFilteredCountries(countriesFilteredByRegion);
    };
    function filterCountriesByLanguage() {
        const dataFilteredByLanguage = data.filter(item => {
            if (selectedLanguage.current.value === "") {
                return true;
            }
            if ("languages" in item) {
              return Object.values(item["languages"]).includes(selectedLanguage.current.value);
            }
            return false; // Skip items that don't have the "languages" key
          });
        const countriesFilteredByLanguage= dataFilteredByLanguage.map(item => item["name"]["common"])
        setFilteredCountries(countriesFilteredByLanguage);
    };
    const countiresList = filteredCountries.map(item => (
        <li 
            key={item}
            onClick={() => setCountryDetails(data.filter(i => i["name"]["common"] === item))}
        >
            {item}
        </li>
        ));
    console.log(countryDetails)
    
    return (
        <div>
            <label htmlFor="filter-by-region">Select the continent</label>
            <select id="filter-by-region" onChange={filterCountriesByRegion} ref={selectedRegion}>
                <option value="">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Antarctic">Antartic</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            <br />
            <label htmlFor="filter-by-language">Select a language</label>
            <select id="filter-by-lanaguage" onChange={filterCountriesByLanguage} ref={selectedLanguage}>
                <option value="">All</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="Arabic">Arabic</option>
            </select>
            <br />
            <label htmlFor="search-country">Search country</label>
            <input
                id="search-country"
                type="text" 
                ref={userInput} 
                onChange={filterData}
            />
            {countryDetails[0] && <DetailsModal 
                countryName={countryDetails[0]["name"]["common"]}
                capitalName={countryDetails[0]["capital"][0]}
                regionName={countryDetails[0]["region"]}
                borders={countryDetails[0]["borders"] ? `${countryDetails[0]["borders"].map(item => item)}` : "No data"}
                languages={
                    `${Object.values(countryDetails[0]["languages"]).map(item => item)}`
                }
                flag={countryDetails[0]["flag"]}
                map={countryDetails[0]["maps"]["googleMaps"]}
                onClose={() => setCountryDetails("")}
            />}
            <ul>
                {countiresList}
            </ul>
        </div>
    );
};

export default CountriesData;