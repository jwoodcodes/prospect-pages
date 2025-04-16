import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import MainNav from "./components/mainNav/MainNav";
import DataFetcher from "./components/dataTable/DataFetcher";


import localFont from "next/font/local";

const aAtmospheric = localFont({
  src: "./fonts/aAtmospheric.ttf",
});

const hemiHead = localFont({
  src: "./fonts/hemi head bd it.ttf",
});

const astroFonts = localFont({
  src: [
    {
      path: './fonts/aAtmospheric.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/hemi head bd it.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/Play-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Play-Regular.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
})


export default function Home() {
  return (
    <div className={styles.page}>
      <MainNav />
      <main className={styles.main}>
        {/* <Image
          src="/star-bar.jpg"
          alt="starry night"
          className={styles.starBar}
          width={3000}
          height={150}
          priority
        /> */}
        
        <div className={styles.titleWrapper}>
          <h1 className={`${aAtmospheric.className} ${styles.title}`}>Prospect Data By Class</h1>
          <h2 className={`${hemiHead.className} ${styles.secondTitle}`} style={{color: "var(--color-orange-primary)", fontSize: "clamp(1.25rem, 2vw, 1.1rem)", letterSpacing: "0.05rem"}}>
 
  
            click players name to view full prospect profile
          </h2>
        </div>

        <DataFetcher />
      </main>
    </div>
  );
}
