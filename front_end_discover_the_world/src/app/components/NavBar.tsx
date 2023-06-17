"use client";

import { useState, useEffect, useRef } from "react";

const greetings = ["Welcome", "Hello", "Hi", "Greetings"];
const randomGreetingIndex = Math.floor(Math.random() * greetings.length);

const NavBar = ({onSelectPage}) => {
    const [randomGreeting, setRandomGreeting] = useState("");
    // add data from redux store
    let isLoggedIn: boolean = true;
    let userName: string = "Adrian";
    let selectedPage = useRef();

    useEffect(() => {
        setRandomGreeting(`${greetings[randomGreetingIndex]}, ${userName}`);
    }, []);

    function handleSelectPage() {
        console.log(selectedPage.current.value);
        onSelectPage(selectedPage.current.value);
    };

    return (
        <nav>
            {isLoggedIn && <span>{randomGreeting}</span>}
            <div>
                <button>Log in / Log out</button>
                <button>Register</button>
            </div>
            <div>
                <select onChange={handleSelectPage} ref={selectedPage}>
                    <option value="MainPage">Main Page</option>
                    <option value="CountriesPage">Countries Page</option>
                </select>
            </div>
        </nav>
    );
};

export default NavBar;