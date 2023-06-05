"use client";

import React from "react";

import styles from './page.module.css'
import MainPage from "./pages/MainPage";
import CountriesPage from "./pages/CountriesPage";

export default function Home() {

  return (
    <main className={styles.main}>
      <CountriesPage />
    </main>
  )
}
