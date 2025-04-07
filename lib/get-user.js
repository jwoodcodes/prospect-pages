'use server'

import { wixClientServer } from "./wix-server"

export async function getUser() {
    try {
        const client = await wixClientServer()
        const member = (await client.members.getCurrentMember()).member?.profile
        return member
    }
    catch(e) {
        console.error("Error fetching user:", e)
        return undefined
    }
}