"use client";

import React from "react";
import Link from "next/link";

import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <h3>Discover the World</h3>
      <div>
        <Link href="/countries">
          <span>Countries</span>
        </Link>
      </div>
    </main>
  )
}
