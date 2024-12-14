// セッショントークンの取得
export function getSessionToken() : string | null {
    return localStorage.getItem('sessionToken');
}

// セッショントークンの設定
export function setSessionToken(sessionToken: string) : void {
    localStorage.setItem('sessionToken', sessionToken);
}
