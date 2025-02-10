// usersエンドポイントへAPIリクエストを行う
'use cilient'

import { baseRequest, useSessionToken} from "./modules";

// APIベースURL
const API_BASE_URL = process.env.API_BASE_URL
const API_ROOT_URL = `${API_BASE_URL}/users`

// ユーザー登録
export async function registerUser(
    username: string,
    email: string,
    password1: string,
    password2: string
) {
    return baseRequest(`${API_ROOT_URL}/registration/`, 'POST', {
        name: username,
        email,
        password1,
        password2
    });
}

// 登録メール認証
export async function verifyRegistrationEmail(token: string) {
    return baseRequest(`${API_ROOT_URL}/registration/verify-email/`, 'POST', { key: token });
}

// 登録メール再送
export async function resendRegistrationEmail(email: string) {
    return baseRequest(`${API_ROOT_URL}/registration/resend-email/`, 'POST', { email });
}

// ログイン
export async function loginUser(email: string, password: string) {
    return requestApi('/login/', 'POST', { email, password });
}

// ログアウト
export async function logoutUser(sessionToken: string) {
    return requestApi('/logout/', 'POST', {}, sessionToken);
}

// パスワードリセットメール送信
export async function sendPasswordResetEmail(email: string) {
    return requestApi('/password/reset/', 'POST', { email });
}

// パスワードリセット
export async function confirmPasswordReset(
    uid: string,
    token: string,
    newPassword1: string,
    newPassword2: string
) {
    return requestApi('/password/reset/confirm/', 'POST', {
        token,
        uid,
        new_password1: newPassword1,
        new_password2: newPassword2
    });
}

// ログイン中のユーザー情報取得
export async function getUser(sessionToken: string) {
    return requestApi('/user/', 'GET', {}, sessionToken);
}

// csrfトークンの発行
export async function getCSRFToken() : Promise<string | null> {
    const response = await requestApi('/csrf-token/', 'GET', {});
    const data = await response.json();
    const { csrfToken } = data;
    return csrfToken
}