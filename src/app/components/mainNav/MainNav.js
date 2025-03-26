"use client";

import styles from "./mainNav.module.css";
import Image from "next/image";
import { useState } from "react";

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.mainWrapper}>
      <div className={styles.logo}>
        <a href="https://www.ffastronauts.com/">
          <Image
            src="/astronauts-main-logo.avif"
            alt="Vercel Logo"
            className={styles.logo}
            width={75}
            height={75}
          />
        </a>
      </div>

      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`${styles.hamburgerLines} ${isOpen ? styles.open : ""}`}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <ul className={`${styles.navLinksWrapper} ${isOpen ? styles.open : ""}`}>
        <a
          href="https://www.ffastronauts.com/products"
          className={styles.mainNavLink}
        >
          <li>Subscribe</li>
        </a>
        <a
          href="https://www.ffastronauts.com/podcast"
          className={styles.mainNavLink}
        >
          <li>Podcast</li>
        </a>
        <a
          href="https://www.ffastronauts.com/feed"
          className={styles.mainNavLink}
        >
          <li>Articles</li>
        </a>
        <a
          href="https://www.ffastronauts.com/rookie-guide"
          className={styles.mainNavLink}
        >
          <li>Rookie Guide</li>
        </a>
        <a
          href="https://discord.com/invite/sAUER88mnR"
          className={styles.mainNavLink}
        >
          <li>Discord</li>
        </a>
        <a
          href="https://identity.hudl.com/u/login/identifier?state=hKFo2SBDcHUtbEdlb2hPZUQ0TUtBODBLWlFlX2VSZGQ2ZmoybaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIG5YWThqWWI3TWJwMGxNSGZZQllDc0xEVGY0cmsyZGluo2NpZNkgbjEzUmZrSHpLb3phTnhXQzVkWlFvYmVXR2Y0V2pTbjU"
          className={styles.mainNavLink}
        >
          <li>Film Lab</li>
        </a>
        <a
          href="https://www.ffastronauts.com/blank"
          className={styles.mainNavLink}
        >
          <li>Weekly Projections</li>
        </a>
      </ul>
    </nav>
  );
}
