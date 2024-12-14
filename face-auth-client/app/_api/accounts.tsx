// usersエンドポイントへAPIリクエストを行う

// APIベースURL
const API_BASE_URL = process.env.API_BASE_URL
const API_ROOT_URL = `${API_BASE_URL}/users`

// APIリクエストを行う共通の関数
async function requestApi(endpoint: string, method: string, body: object | null, token: string | null = null): Promise<any> {
    
    // リクエストヘッダー
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    // 認証トークンをヘッダーに追加
    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    try {
        // APIリクエスト
        const response = await fetch(`${API_ROOT_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });

        // レスポンスチェック
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Unknown error');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

