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
        // const dataFilteredByRegion = data.filter(item => item["continents"][0] === selectedRegion.current.value);
        const dataFilteredByRegion = data.filter(item => item["region"].includes(selectedRegion.current.value));
        const countriesFilteredByRegion = dataFilteredByRegion.map(item => item["name"]["common"])
        console.log(selectedRegion.current.value);
        console.log(countriesFilteredByRegion);
        setFilteredCountries(countriesFilteredByRegion);
    }
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
            <label htmlFor="filter-by-region">Select Region</label>
            <select id="filter-by-region" onChange={filterCountriesByRegion} ref={selectedRegion}>
                <option value="">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Antarctic">Antartic</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            <input 
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
                onClose={() => setCountryDetails("")}
            />}
            <ul>
                {countiresList}
            </ul>
        </div>
    );
};

export default CountriesData;