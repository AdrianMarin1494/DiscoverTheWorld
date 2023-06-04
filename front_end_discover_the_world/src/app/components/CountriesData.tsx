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