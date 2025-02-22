// サーバーサイドでセッショントークンを取得する関数
'use server'

import { getCookie, setCookie } from "./cookie";

export async function getSessionTokenInServerSide() : Promise<string | null> {
    return await getCookie('sessionToken');
}

export async function setSessionTokenInServerSide(sessionToken: string) : Promise<void> {
    return await setCookie('sessionToken', sessionToken);
}
