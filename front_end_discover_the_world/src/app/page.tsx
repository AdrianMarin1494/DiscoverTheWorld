"use client";

import React, {useState} from "react";

import styles from './page.module.css'

import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import CountriesPage from "./pages/CountriesPage";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("MainPage");

  const handleSelectPage = (e) => {
    setCurrentPage(e);
  }

  return (
    <main className={styles.main}>
      <h3>{currentPage}</h3>
      <NavBar onSelectPage={handleSelectPage}/>
      {currentPage === "MainPage" && <MainPage />}
      {currentPage === "CountriesPage" && <CountriesPage />}
    </main>
  )
}
