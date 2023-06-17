"use client";

import React, {useState, useEffect, useRef} from "react";

const CountriesToVisit = () => {
    const [countreisToVisit, setCountriesToVisit] = useState([]);
    let inputCountry = useRef("");

    const countriesList = countreisToVisit.map((country) => <li key={country}>{country}</li>)

    const handleAddCountry = () => {
        console.log(inputCountry.current.value);
        setCountriesToVisit(prevCountries => [...prevCountries, inputCountry.current.value]);
    };

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