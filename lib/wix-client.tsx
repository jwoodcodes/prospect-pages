'use client'

import { createClient, OAuthStrategy } from "@wix/sdk"
import { members } from "@wix/members"
import Cookies from "js-cookie"

let refreshToken = Cookies.get('refreshToken') ? JSON.parse(Cookies.get('refreshToken')) : null;
let accessToken = Cookies.get('accessToken') ? JSON.parse(Cookies.get('accessToken')) : null;

export const wixClient = createClient({
    
    modules: {  
        members
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
        tokens: {
            accessToken,
            refreshToken
        }
    })

})