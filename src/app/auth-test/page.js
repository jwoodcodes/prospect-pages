"use client";
import { useEffect, useState } from "react";

export default function AuthTest() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [siteId, setSiteId] = useState("");

  useEffect(() => {
    // Get the site ID from env
    setSiteId(process.env.NEXT_PUBLIC_WIX_SITE_ID || "");

    // Check if we have a token in cookies
    const cookies = document.cookie.split(";");
    const hasWixToken = cookies.some((cookie) =>
      cookie.trim().startsWith("wixToken=")
    );
    setIsAuthenticated(hasWixToken);
  }, []);

  const handleLogin = () => {
    const wixAuthUrl = `https://www.wix.com/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_WIX_CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/api/auth/callback"
    )}`;
    window.location.href = wixAuthUrl;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Authentication Test Page</h1>
      <div style={{ marginBottom: "1rem" }}>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Back to Home
        </a>
      </div>
      {isAuthenticated ? (
        <p>You are logged in! 🎉</p>
      ) : (
        <button
          onClick={handleLogin}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login with Wix
        </button>
      )}
    </div>
  );
}
