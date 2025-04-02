"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import MainNav from "./components/mainNav/MainNav";
import dynamic from "next/dynamic";

// Dynamically import DataFetcher with no SSR to avoid server component issues
const DataFetcher = dynamic(
  () => import("./components/dataTable/DataFetcher"),
  { ssr: false }
);

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we have a token in cookies
    const cookies = document.cookie.split(";");
    const hasWixToken = cookies.some((cookie) =>
      cookie.trim().startsWith("wixToken=")
    );
    setIsAuthenticated(hasWixToken);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    console.log("Login button clicked"); // This should log when the button is clicked

    // Determine the redirect URI based on the environment
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? "https://prospect-pages.vercel.app/api/auth/callback"
        : "http://localhost:3000/api/auth/callback";

    const wixAuthUrl = `https://www.wix.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_WIX_CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`; // Use the dynamic redirect URI

    // console.log("Wix Auth URL:", wixAuthUrl); // Log the URL for debugging
    window.location.href = wixAuthUrl;
  };

  console.log("Client ID:", process.env.NEXT_PUBLIC_WIX_CLIENT_ID);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        {isAuthenticated ? (
          <>
            <DataFetcher />
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <p style={{ color: "green" }}>✓ Authenticated</p>
            </div>
          </>
        ) : (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              marginTop: "2rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <h2>Please Log In to View Prospect Data</h2>
            <button
              onClick={handleLogin}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "1rem",
              }}
            >
              Login to FFAstronauts
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
