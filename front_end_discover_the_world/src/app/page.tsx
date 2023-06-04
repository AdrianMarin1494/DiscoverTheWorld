"use client";

import React from "react";

import styles from './page.module.css'
import CountriesData from "./components/CountriesData";


export default function Home() {

  return (
    <main className={styles.main}>
      <CountriesData />
    </main>
  )
}
