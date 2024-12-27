// usersエンドポイントへAPIリクエストを行う

// APIベースURL
const API_ROOT_URL = `http://localhost:3000/api`

// APIリクエストを行う共通の関数
async function requestApi(endpoint: string, method: string, body: object | null): Promise<Response> {
    
    // リクエストヘッダー
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    // リクエストオブジェクト
    const request : RequestInit = {
        method: method,
        headers: headers,
    }

    // メソッドがPOSTの場合、bodyを追加
    if (method === 'POST') {
        request.body = JSON.stringify(body);
    }

    try {
        // APIリクエスト
        const response = await fetch(`${API_ROOT_URL}${endpoint}`, request);
        return response
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

export async function GetSessionToken(): Promise<
    { sessionToken: string } | {}> {
    return (await requestApi('/session/', 'GET', null)).json();
}

export async function SetSessionToken(sessionToken: string): Promise<string | null> {
    return (await requestApi('/session/', 'POST', { sessionToken })).json();
}

export async function SetCsrfToken(csrfToken: string): Promise<string | null> {
    return (await requestApi('/csrf/', 'POST', { csrfToken })).json();
}
