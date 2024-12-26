// recognizerエンドポイントへAPIリクエストを行う

// APIベースURL
const API_BASE_URL = process.env.API_BASE_URL
const API_ROOT_URL = `${API_BASE_URL}/recognizer`

// APIリクエストを行う共通の関数
async function requestApi(endpoint: string, method: string, body: object | null, 
    sessionToken: string | null = null, csrfToken: string | null = null): Promise<Response> {
    
    // リクエストヘッダー
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    // 認証トークンをヘッダーに追加
    if (sessionToken) {
        headers['Authorization'] = `Token ${sessionToken}`;
    }

    // csrfトークンをヘッダーに追加
    if (csrfToken) {
        headers['X-CSRFToken'] = csrfToken;
    }

    // リクエストオブジェクト
    const request : RequestInit = {
        method: method,
        headers: headers
    }

    // メソッドがPOSTの場合、bodyを追加
    if (method === 'POST' || method === 'PATCH') {
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
