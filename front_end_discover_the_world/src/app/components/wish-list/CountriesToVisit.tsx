"use client";

import React, {useState, useEffect, useRef} from "react";

const CountriesToVisit = () => {
    const [countreisToVisit, setCountriesToVisit] = useState([]);
    const inputCountry = "";

    const handleAddCountry = () => {
        console.log(inputCountry);
    };

    return (
        <div>
            <label htmlFor="add-country">Add a country to your wishlist</label>
            <input placeholder="Country to visit..." ref={inputCountry} />
            <button onClick={handleAddCountry}>Add country</button>
        </div>
    );
};

export default CountriesToVisit;