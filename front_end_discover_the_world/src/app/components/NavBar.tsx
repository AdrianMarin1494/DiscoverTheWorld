"use client";

import { useState, useEffect } from "react";

const greetings = ["Welcome", "Hello", "Hi", "Greetings"];
const randomGreetingIndex = Math.floor(Math.random() * greetings.length);

const NavBar = () => {
    const [randomGreeting, setRandomGreeting] = useState("");
    // add data from redux store
    let isLoggedIn = true;
    let userName = "Adrian";
    useEffect(() => {
        setRandomGreeting(`${greetings[randomGreetingIndex]}, ${userName}`);
    }, []);

    return (
        <nav>
            {isLoggedIn && <span>{randomGreeting}</span>}
            <div>
                <button>Log in / Log out</button>
                <button>Register</button>
            </div>
        </nav>
    );
};

export default NavBar;