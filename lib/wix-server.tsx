

import { createClient, OAuthStrategy, IOAuthStrategy, WixClient } from "@wix/sdk"
import { collections, products } from "@wix/stores"
import { orders } from "@wix/ecom"
import { members } from "@wix/members"
import { cookies } from "next/headers"


export const wixClientServer = async () => {
    let refreshToken
    let accessToken

    try {
        const cookieStore = await cookies()
     refreshToken = JSON.parse(cookieStore.get('refreshToken')?.value || "{}")
        accessToken = JSON.parse(cookieStore.get('accessToken')?.value || "{}")
    } catch (error) {
        console.error('Error fetching cookies:', error);
    }



  const wixClient = createClient({
    
    modules: {  
        members, 
        collections,
        products,
        orders  
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: {
            accessToken,
            refreshToken
        },
    }),
})

    return wixClient
}