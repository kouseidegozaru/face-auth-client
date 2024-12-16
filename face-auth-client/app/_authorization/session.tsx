// サーバーサイドでセッショントークンを取得する関数
'use server'

import { getCookie, setCookie } from "./cookie";

export async function getSessionToken() : Promise<string | null> {
    return getCookie('sessionToken');
}

export async function setSessionToken(sessionToken: string) : Promise<void> {
    return setCookie('sessionToken', sessionToken);
}
