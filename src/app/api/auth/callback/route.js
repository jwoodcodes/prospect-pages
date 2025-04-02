import { NextResponse } from "next/server";
import { setAuthToken } from "@/app/utils/auth";
import fetch from "node-fetch";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code provided" },
      { status: 400 }
    );
  }

  try {
    // Determine the redirect URI based on the environment
    const redirectUri =
      process.env.NODE_ENV === "production"
        ? "https://prospect-pages.vercel.app/api/auth/callback"
        : "http://localhost:3000/api/auth/callback";

    // Exchange code for token with Wix
    const tokenResponse = await fetch("https://www.wix.com/_api/oauth/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        client_secret: process.env.WIX_API_KEY,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const data = await tokenResponse.json();

    if (tokenResponse.ok) {
      const accessToken = data.access_token;
      // Create response with redirect
      const response = NextResponse.redirect(new URL("/", request.url));

      // Set the token in cookies
      response.cookies.set("wixToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return response;
    } else {
      const errorData = await tokenResponse.json();
      console.error("Error response from Wix:", errorData);
      return NextResponse.json(
        { error: errorData },
        { status: tokenResponse.status }
      );
    }
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
