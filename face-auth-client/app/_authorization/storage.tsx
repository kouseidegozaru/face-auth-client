
// セッションストレージに値を格納
export function setSessionStorage(key: string, value: string) : void {
    sessionStorage.setItem(key, value);
}

// セッションストレージから値を取得
export function getSessionStorage(key: string) : string | null {
    return sessionStorage.getItem(key);
}

// セッションストレージから値を削除
export function removeSessionStorage(key: string) : void {
    sessionStorage.removeItem(key);
}
