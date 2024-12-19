import { setSessionStorage, getSessionStorage, removeSessionStorage } from "./storage";

// セッションストレージにメールアドレスを格納
export function setEmail(email: string) : void {
    setSessionStorage('email', email);
}

// セッションストレージからメールアドレスを取得
export function getEmail() : string | null {
    return getSessionStorage('email');
}

// セッションストレージからメールアドレスを削除
export function removeEmail() : void {
    removeSessionStorage('email');
}
