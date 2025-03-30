const WIX_API_URL = "https://www.wixapis.com/v1";

export const checkUserSubscription = async (token) => {
  try {
    // First verify the token is valid
    const memberResponse = await fetch(`${WIX_API_URL}/members/v1/members/my`, {
      headers: {
        Authorization: token,
        "wix-site-id": process.env.NEXT_PUBLIC_WIX_SITE_ID,
        "wix-account-id": process.env.WIX_ACCOUNT_ID,
      },
    });

    if (!memberResponse.ok) {
      return false;
    }

    // Check subscription status
    const pricingResponse = await fetch(
      `${WIX_API_URL}/pricing-plans/v1/member-subscriptions/my`,
      {
        headers: {
          Authorization: token,
          "wix-site-id": process.env.NEXT_PUBLIC_WIX_SITE_ID,
          "wix-account-id": process.env.WIX_ACCOUNT_ID,
        },
      }
    );

    if (!pricingResponse.ok) {
      return false;
    }

    const subscriptionData = await pricingResponse.json();
    return subscriptionData.active; // or however Wix indicates an active subscription
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wixToken", token);
    localStorage.setItem(
      "wixTokenExpiry",
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    ); // 30 days
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("wixToken");
    const expiry = localStorage.getItem("wixTokenExpiry");

    if (!token || !expiry) {
      return null;
    }

    if (new Date().getTime() > parseInt(expiry)) {
      localStorage.removeItem("wixToken");
      localStorage.removeItem("wixTokenExpiry");
      return null;
    }

    return token;
  }
  return null;
};
