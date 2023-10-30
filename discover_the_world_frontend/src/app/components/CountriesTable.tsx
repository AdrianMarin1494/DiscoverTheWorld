"use client";

import React, { useEffect, useState } from "react";

const CountriesTable = () => {
    const [countriesData, setCountriesData] = useState<any[] | null>(null);
    async function getCountries() {
        try {
            const res: Response = await fetch("https://restcountries.com/v3.1/all");
            const data: any[] = await res.json();
            console.log(data);
            if (data) {
                const listedData = data.map((country) => {
                    return (
                        <tr key={country["name"]["common"]}>
                            <td>{country["name"]["common"]}</td>
                            {country["capital"] !== undefined ? <td>{country["capital"][0]}</td> : <td>No info</td>}
                            <td>{country["region"]}</td>
                            <td>{country["subregion"]}</td>
                            <td>{country["population"]}</td>
                        </tr>
                    );
                })
                setCountriesData(listedData);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
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