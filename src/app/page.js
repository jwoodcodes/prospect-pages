import Image from "next/image";
import styles from "./page.module.css";
import MainNav from "./components/mainNav/MainNav";


export default function Home() {
  return (
    <div className={styles.page}>
      <MainNav />
      <main className={styles.main}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Prospect Data By Class</h1>
          <h2 className={styles.secondTitle}>click players name to view full prospect profile</h2>
        </div>
        <div className={styles.clsSelectBtnsWrapper}>
          <button className={styles.clsSelectBtn}>2021</button>
          <button className={styles.clsSelectBtn}>2022</button>
          <button className={styles.clsSelectBtn}>2023</button>
          <button className={styles.clsSelectBtn}>2024</button>
          <button className={styles.clsSelectBtn}>2025</button>

        </div>
      </main>
      
    </div>
  );
}
