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
          <span>Discover the Countries</span>
        </Link>
        <Link href="/astronomy">
          <span>Enjoy the Astronomy</span>
        </Link>
      </div>
    </main>
  )
}
