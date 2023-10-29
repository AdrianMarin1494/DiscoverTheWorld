"use client";

import React from "react";

import MainPage from "./components/pages/MainPage";
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <MainPage />
    </main>
  )
}
