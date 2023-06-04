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
            // onClick={() => setSelectedCountry(item)}
            onClick={() => setCountryDetails(data.filter(i => i["name"]["common"] === item))}
        >
            {item}
        </li>
        ));
    // useEffect(() => {
    //     console.log(data.filter(item => item["name"]["common"] === selectedCountry));
    //     setCountryDetails(data.filter(item => item["name"]["common"] === selectedCountry));
    // }, [selectedCountry]);
    console.log(countryDetails)
    
    return (
        <div>
            <input 
                type="text" 
                ref={userInput} 
                onChange={filterData}
            />
            {/* {selectedCountry && <DetailsModal countryName={selectedCountry} onClose={() => setSelectedCountry("")} />} */}
            {countryDetails[0] && <DetailsModal 
                countryName={countryDetails[0]["name"]["common"]} 
                onClose={() => setCountryDetails("")}
            />}
            <ul>
                {countiresList}
            </ul>
        </div>
    );
};

export default CountriesData;