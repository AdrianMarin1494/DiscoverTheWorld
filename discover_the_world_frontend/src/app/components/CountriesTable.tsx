"use client";

import React, { useEffect, useState } from "react";

import classes from "./CountriesTable.module.css";

interface CountriesTableProps {
    onSelectedRow: (countryName: string, countryMap: string, streetMap: string, unMember: string, area: string) => void
}

const CountriesTable: React.FC<CountriesTableProps> = ({onSelectedRow}) => {
    const [countriesData, setCountriesData] = useState<any[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [isDataChanging, setIsDataChanging] = useState<boolean>(false);
    const [isSortingAscending, setIsSortingAscending] = useState<boolean>(true);

    function selectedRow(countryName: string, countryMap: string, streetMap: string, unMember: string, area: string): void {
        onSelectedRow(countryName, countryMap, streetMap, unMember, area);
    }

    async function getCountries() {
        try {
            const res: Response = await fetch("https://restcountries.com/v3.1/all");
            const data: any[] = await res.json();
            console.log(data);
            if (data) {
                setCountriesData(data);
                setIsDataLoaded(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    if (!isDataLoaded) {
        return (
            <div className={classes["loading-data"]}>
                <h3>
                    Loading...
                </h3>
            </div>
        );
    }

    function handleSortingByName() {
        let sortingData = countriesData.sort((a, b) => {
            const nameA = a["name"]["common"].toUpperCase();
            const nameB = b["name"]["common"].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
        if (!isSortingAscending) {
            sortingData.reverse();
        }
        setIsSortingAscending(previous => !previous)
        setCountriesData(sortingData);
    }

    function handleSortingByPopulation() {
        let sortingData = countriesData.sort((a, b) => {
            return a["population"] - b["population"];
        })
        if (!isSortingAscending) {
            sortingData.reverse();
        }
        setIsSortingAscending(previous => !previous)
        setCountriesData(sortingData);
    }

    return (
        <div className={classes["countries-table"]}>
            <div className={classes["countries-actions"]}>
                <button onClick={handleSortingByName}>Sort by Name</button>
                <button onClick={handleSortingByPopulation}>Sort by population</button>
                <button>Sort by region</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Name</th>
                        <th>Capital</th>
                        <th>Region</th>
                        <th>Subregion</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
                    {countriesData.map((country) => {
                        return (
                            <tr key={country["name"]["common"]} 
                                onClick={() => selectedRow(
                                    country["name"]["common"], 
                                    country["maps"]["googleMaps"], 
                                    country["maps"]["openStreetMaps"], 
                                    country["unMember"],
                                    country["area"],
                                )}>
                                <td><img src={country["flags"]["svg"]} style={{width: "2vw", height: "2vh"}}/></td>
                                <td>{country["name"]["common"]}</td>
                                {country["capital"] !== undefined ? <td>{country["capital"][0]}</td> : <td>No info</td>}
                                <td>{country["region"]}</td>
                                <td>{country["subregion"]}</td>
                                <td>{country["population"]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CountriesTable;