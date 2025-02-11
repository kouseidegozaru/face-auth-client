// usersエンドポイントへAPIリクエストを行う
'use client'

import { baseRequest } from "./modules"

// APIベースURL
const API_ROOT_URL = `http://localhost:3000/api`

export async function GetSessionToken(): Promise<string | null> {
    const response = await baseRequest(`${API_ROOT_URL}/session/`, 'GET', null)
    const data = await response.json();
    const { sessionToken } = data;
    return sessionToken
}

export async function SetSessionToken(sessionToken: string): Promise<string | null> {
    return (await baseRequest(`${API_ROOT_URL}/session/`, 'POST', { sessionToken })).json();
}

export async function SetCsrfToken(csrfToken: string): Promise<string | null> {
    return (await baseRequest(`${API_ROOT_URL}/csrf/`, 'POST', { csrfToken })).json();
}
