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

// ユーザー登録
export async function registerUser(
    username: string,
    email: string,
    password1: string,
    password2: string
) {
    return requestApi('/registration/', 'POST', {
        name: username,
        email,
        password1,
        password2
    });
}

// 登録メール認証
export async function verifyRegistrationEmail(token: string) {
    return requestApi('/registration/verify-email/', 'POST', { key: token });
}

// 登録メール再送
export async function resendRegistrationEmail(email: string) {
    return requestApi('/registration/resend-email/', 'POST', { email });
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
        key: token,
        uid,
        new_password1: newPassword1,
        new_password2: newPassword2
    });
}

// ログイン中のユーザー情報取得
export async function getUser(sessionToken: string) {
    return requestApi('/user/', 'GET', {}, sessionToken);
}

