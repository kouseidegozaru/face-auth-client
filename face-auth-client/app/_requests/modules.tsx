import { GetSessionToken, SetCsrfToken } from './cookie';

class BaseError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * セッショントークンエラー
 */
class SessionError extends BaseError {
    constructor(message = "Session token is missing") {
        super(message, 401);
    }
}

type HeadersType = Record<string, string>;

// セッショントークンを使用するオプション関数
async function useSessionToken(headers: HeadersType): Promise<void> {
    const sessionToken = await GetSessionToken();
    if (!sessionToken) {
        throw new SessionError();
    }
    headers['Authorization'] = `Token ${sessionToken}`;
}

// 任意のヘッダーを追加する関数
async function addAuthHeaders(
    headers: HeadersType,
    authFuncs: Array<(headers: HeadersType) => Promise<void>>
): Promise<void> {
    for (const authFunc of authFuncs) {
        await authFunc(headers);
    }
}

// ベースリクエスト関数
async function baseRequest(
    url: string,
    method: string,
    body?: object | null,
    customAuthFuncs: Array<(headers: HeadersType) => Promise<void>> = []
): Promise<Response> {

    // リクエストヘッダー
    const headers: HeadersType = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    // 認証ヘッダーを追加
    await addAuthHeaders(headers, customAuthFuncs);

    // リクエストの作成
    const request: RequestInit = {
        method,
        headers: new Headers(headers),
        credentials: 'include',
    };

    // bodyを含むメソッドの場合はbodyを追加
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        request.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, request);
        return response;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

