import { NextResponse } from "next/server";

export async function getPlayerInfo(id: string) {
    const API_KEY = process.env.API_KEY
    const PLAYER_TAG = id
    const url = `https://api.clashroyale.com/v1/players/%23${PLAYER_TAG}`;

    try {
    const response = await fetch(url, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    return data;
    
    // console.log(data.cards);
    // @ts-ignore
    } catch (err: Error) {
    console.error("Request failed:", err.message);
    }

}
