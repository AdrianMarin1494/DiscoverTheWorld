"use client";

import React, { useEffect, useState } from "react";

import classes from "./CountriesTable.module.css";

interface CountriesTableProps {
    onSelectedRow: (countryName: string, countryMap: string, streetMap: string, unMember: string, area: string) => void
}

const CountriesTable: React.FC<CountriesTableProps> = ({onSelectedRow}) => {
    const [countriesData, setCountriesData] = useState<any[]>([]);
    const [savedData, setSavedData] = useState<any[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
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
                setSavedData(data);
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

    function handleSortingByRegion() {
        let sortingData = countriesData.sort((a, b) => {
            const nameA = a["region"].toUpperCase();
            const nameB = b["region"].toUpperCase();
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

    function handleFilterByRegion(chosenRegion: string) {
        if (chosenRegion === "All") {
            setCountriesData(savedData);
        } else {
            let filteredData = savedData.filter(country => {
                return country["region"] === chosenRegion
            })
            setCountriesData(filteredData);
        }
    }

    function handleFilterBySubregion(chosenSubregion: string) {
        if (chosenSubregion === "All") {
            setCountriesData(savedData);
        } else {
            let filteredData = savedData.filter(country => {
                return country["subregion"] === chosenSubregion
            })
            setCountriesData(filteredData);
        }
    }

    function handleFilterByPopulation(chosenPopulationNumber: string) {
        let intChosenPopulationNumber = Number(chosenPopulationNumber);
        let filteredData = savedData.filter(country => {
            return country["population"] >= intChosenPopulationNumber;
        });
        setCountriesData(filteredData);

    }

    let regions: string[] = [];
    savedData.map(country => {
        if (regions.indexOf(country["region"]) === -1) {
            regions.push(country["region"])
        }
    })
    regions = regions.sort();
    const regionsOptions = regions.map((region) => {
        return <option value={region}>{region}</option>
    })

    let subregions: string[] = [];
    countriesData.map(country => {
        if (subregions.indexOf(country["subregion"]) === -1) {
            subregions.push(country["subregion"])
        }
    })
    subregions = subregions.sort();
    const subregionsOptions = subregions.map((region) => {
        return <option value={region}>{region}</option>
    })

    return (
        <div className={classes["countries-content"]}>
            <div className={classes["countries-actions"]}>
                <button onClick={handleSortingByName}>Sort by Name</button>
                <button onClick={handleSortingByRegion}>Sort by Region</button>
                <button onClick={handleSortingByPopulation}>Sort by Population</button>
                <label htmlFor="regionFilter">Filter by Region</label>
                <select name="regionFilter" id="regionFilter" onChange={(e) => handleFilterByRegion(e.target.value)}>
                    <option value={"All"}>All</option>
                    {regionsOptions}
                </select>
                <label htmlFor="subregionFilter">Filter by Subegion</label>
                <select name="subregionFilter" id="subregionFilter" onChange={(e) => handleFilterBySubregion(e.target.value)}>
                    <option value={"All"}>All</option>
                    {subregionsOptions}
                </select>
                <label htmlFor="populationFilter">Filter by Population(higher then)</label>
                <input name="populationFilter" id="populationFilter" onChange={(e) => {handleFilterByPopulation(e.target.value)}}/>
            </div>
            <div className={classes["countries-table"]}>
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
        </div>
    );
};

export default CountriesTable;