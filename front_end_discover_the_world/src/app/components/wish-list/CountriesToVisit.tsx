"use client";

import React, {useState, useEffect, useRef} from "react";

const CountriesToVisit = () => {
    const [countreisToVisit, setCountriesToVisit] = useState({});
    let inputCountry = useRef("");

    useEffect(() => {
        async function getCountriesData() {
            const res = await fetch("https://discovertheworld-b4978-default-rtdb.europe-west1.firebasedatabase.app/.json");
            const data = await res.json();
            console.log(data);
            setCountriesToVisit(data);
        }
        getCountriesData();
    }, []);
    console.log(countreisToVisit);
    
    
    const handleAddCountry = () => {
        let newCountriesList = {...countreisToVisit}
        let newCountry = inputCountry.current.value;
        newCountriesList[newCountry] = newCountry;
        console.log(newCountriesList);
        setCountriesToVisit(newCountriesList);
    };
    const countriesList = Object.values(countreisToVisit).map((country) => <li key={country}>{country}</li>)
    
    return (
        <div>
            <label htmlFor="add-country">Add a country to your wishlist</label>
            <br />
            <input placeholder="Country to visit..." ref={inputCountry} />
            <button onClick={handleAddCountry}>Add country</button>
            <ul>
                {countriesList}
            </ul>
        </div>
    );
};

export default CountriesToVisit;