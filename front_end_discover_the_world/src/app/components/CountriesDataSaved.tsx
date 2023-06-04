"use client";

import React, {useState, useEffect} from "react";

import { getCountries } from "../services/getCountries";

interface CountriesInterface {
    name: string[],
    capital: string[],
    continents: string[][],
    languages: {[key: string]: string}[];
}

const CountriesData = () => {
    const [countriesDetails, setCountriesDetails] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [capitalsList, setCapitalsList] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await getCountries();
                const countries: CountriesInterface = {name: [], capital: [], continents: [], languages: []}
                for (let i = 0; i < 10; i++) {
                    try {
                        countries["name"].push(data[i]["name"]["common"]);
                    } catch(e) {
                        console.log(e);
                        countries["name"].push("No country data");
                    }
                    try {
                        countries["capital"].push(data[i]["capital"][0]);
                    } catch (e) {
                        countries["capital"].push("No capital data");
                        console.log(e);
                    }
                    try {
                        countries["continents"].push(data[i]["continents"]);
                    } catch(e) {
                        console.log(e);
                        countries["continents"].push(["No continents data"]);
                    }
                    try {
                        countries["languages"].push(data[i]["languages"]);
                    } catch(e) {
                        console.log(e);
                        countries["languages"].push({language: "No language data"});
                    }
                }
                setCountriesDetails(countries);
                setCountriesList(countries["name"].map((item) => <li key={item}>{item}</li>))
                setCapitalsList(countries["capital"].map((item) => <li key={item}>{item}</li>))
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    
    console.log(countriesDetails);
    console.log(countriesList);
    
    return (
        <div>
            <ul>
                {countriesList} {capitalsList}
            </ul>
            <hr />
            <ul>
                {capitalsList}
            </ul>
        </div>
    );
};

export default CountriesData;