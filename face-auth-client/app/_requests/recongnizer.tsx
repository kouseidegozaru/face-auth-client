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

// グループ一覧の取得
export async function GetTrainingGroup(sessionToken: string) {
    return requestApi('/training-group/', 'GET', null, sessionToken);
}

// グループの作成
export async function CreateTrainingGroup(sessionToken: string, csrfToken: string, name: string) {
    return requestApi('/training-group/', 'POST', { name }, sessionToken, csrfToken);
}

// グループ名の更新
export async function UpdateTrainingGroupName(sessionToken: string, csrfToken: string, id: number, name: string) {
    return requestApi(`/training-group/${id}/`, 'PATCH', { name }, sessionToken, csrfToken);
}

// グループの削除
export async function DeleteTrainingGroup(sessionToken: string, csrfToken: string, id: number) {
    return requestApi(`/training-group/${id}/`, 'DELETE', null, sessionToken, csrfToken);
}

// 学習データの取得
export async function GetTrainingData(sessionToken: string, groupId: number) {
    return requestApi(`/training-group/${groupId}/images/`, 'GET', null, sessionToken);
}

// 学習データの作成
export async function CreateTrainingData(sessionToken: string, csrfToken: string, groupId: number, label: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('label', label);
    return requestApi(`/training-group/${groupId}/images/`, 'POST', formData, sessionToken, csrfToken);
}

// 学習データの更新
export async function UpdateTrainingData(sessionToken: string, csrfToken: string, id: number, label: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('label', label);
    return requestApi(`/training-data/${id}/`, 'PATCH', formData, sessionToken, csrfToken);
}
