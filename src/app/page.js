import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import MainNav from "./components/mainNav/MainNav";
import DataFetcher from "./components/dataTable/DataFetcher";

export default function Home() {
  return (
    <div className={styles.page}>
      <MainNav />
      <main className={styles.main}>
        <Image
          src="/star-bar.jpg"
          alt="starry night"
          className={styles.starBar}
          width={3000}
          height={150}
          priority
        />
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Prospect Data By Class</h1>
          <h2 className={styles.secondTitle}>
            click players name to view full prospect profile
          </h2>
        </div>

        <DataFetcher />
      </main>
    </div>
  );
}
