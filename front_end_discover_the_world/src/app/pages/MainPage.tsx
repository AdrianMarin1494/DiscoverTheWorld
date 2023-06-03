"use client";

import React, {useEffect} from "react";

const MainPage = () => {
    interface CountriesInterface {
        name: string[],
        capital: string[],
        continents: string[][],
        languages: {[key: string]: string}[];
    }
    const countries: CountriesInterface = {name: [], capital: [], continents: [], languages: []}
    async function getData() {
        const result = await fetch("https://restcountries.com/v3.1/all");
        const data = await result.json();
        console.log(data);
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
        console.log(countries);
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>

        </div>
    );
};

export default MainPage;