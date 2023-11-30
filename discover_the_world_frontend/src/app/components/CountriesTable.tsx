"use client";

import React, { useEffect, useState } from "react";

import classes from "./CountriesTable.module.css";

interface CountriesTableProps {
    onSelectedRow: (countryName: string, countryMap: string, streetMap: string, unMember: string, area: string) => void
}

const CountriesTable: React.FC<CountriesTableProps> = ({onSelectedRow}) => {
    const [countriesData, setCountriesData] = useState<any[] | null>(null);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    function selectedRow(countryName: string, countryMap: string, streetMap: string, unMember: string, area: string): void {
        onSelectedRow(countryName, countryMap, streetMap, unMember, area);
    }

    async function getCountries() {
        try {
            const res: Response = await fetch("https://restcountries.com/v3.1/all");
            const data: any[] = await res.json();
            console.log(data);
            if (data) {
                const listedData = data.map((country) => {
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
                    );
                })
                setCountriesData(listedData);
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

    return (
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
                    {countriesData}
                </tbody>
            </table>
        </div>
    );
};

export default CountriesTable;