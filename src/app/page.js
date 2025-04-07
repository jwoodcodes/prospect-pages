"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import MainNav from "./components/mainNav/MainNav";
import dynamic from "next/dynamic";

import { wixClient } from "../../lib/wix-client";
import Cookies from "js-cookie";  

import { getUser } from "../../lib/get-user";

// import DataFetcher from "./components/dataTable/DataFetcher";

// Dynamically import DataFetcher with no SSR to avoid server component issues
const DataFetcher = dynamic(
  () => import("./components/dataTable/DataFetcher"),
  { ssr: false }
);

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [user, setUser] = useState(null); // State to hold user data

  useEffect(() => {
    // Fetch user data after the initial render
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
      
    };

    fetchUser();
  }, []);

  async function verifyLogin() {

    const data = JSON.parse(localStorage.getItem('oAuthRedirectData'));


    try {
      
      const {code, state} = wixClient.auth.parseFromUrl();
      
      console.log("Code:", code);
      console.log("State:", state);
      console.log("Data:", data);

      console.log("Calling getMemberTokens with:", { code, state, data });
      const tokens = await wixClient.auth.getMemberTokens(code, state, data);
      console.log(tokens.accessToken)
      Cookies.set('accessToken', JSON.stringify(tokens.accessToken))
      Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken))

      // wixClient.auth.setTokens(tokens)
      // console.log(tokens)

    }
    catch(e) {
      console.error("Error fetching tokens:", e);
    }
  }

  useEffect(() => {
    
    verifyLogin();
    
  }, [user]);

  const handleLogin = async () => {
    const loginRequest  = wixClient.auth.generateOAuthData('http://localhost:3000')

    localStorage.setItem('oAuthRedirectData', JSON.stringify(loginRequest));
    const { authUrl } = await wixClient.auth.getAuthUrl(loginRequest);
    window.location.href = authUrl

    
 
  };

  

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
      
        {wixClient.auth.loggedIn() ? (
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
