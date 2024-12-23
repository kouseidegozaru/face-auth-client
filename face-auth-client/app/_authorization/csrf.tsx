// csrfトークンの発行
'use server'

import { setCookie } from "./cookie";

export async function setCsrfToken(csrfToken: string) : Promise<void> {
    return await setCookie('csrftoken', csrfToken);
}
