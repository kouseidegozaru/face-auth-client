// サーバーサイドでcookieを操作するための関数
'use server'

import { cookies } from "next/headers";

export async function getCookie(key: string) : Promise<string | null> {
    const cookieStore = await cookies();
    if (!cookieStore) return null;
    const cookieValue = cookieStore.get(key);
    if (!cookieValue) return null;
    return cookieValue.value ?? null;
}

export async function setCookie(key: string, value: string) : Promise<void> {
    const cookieStore = await cookies();
    if (!cookieStore) return;
    cookieStore.set(key, value, { httpOnly: true });
}
