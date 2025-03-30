import { NextResponse } from "next/server";
import { setAuthToken } from "@/app/utils/auth";

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
    // Exchange code for token with Wix
    const tokenResponse = await fetch("https://www.wixapis.com/oauth/access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        client_secret: process.env.WIX_API_KEY,
        client_id: process.env.NEXT_PUBLIC_WIX_SITE_ID,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to get access token");
    }

    const { access_token } = await tokenResponse.json();

    // Create response with redirect
    const response = NextResponse.redirect(new URL("/", request.url));

    // Set the token in cookies
    response.cookies.set("wixToken", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
