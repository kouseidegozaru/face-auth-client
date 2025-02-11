// recognizerエンドポイントへAPIリクエストを行う
'use client'

import { baseRequest, useCsrfToken, useSessionToken } from "./modules"

// APIベースURL
const API_BASE_URL = process.env.API_BASE_URL
const API_ROOT_URL = `${API_BASE_URL}/recognizer`

// グループ一覧の取得
export async function GetTrainingGroup() {
    return baseRequest(`${API_ROOT_URL}/training-groups/`, 'GET', null, [useSessionToken]);
}

// グループの作成
export async function CreateTrainingGroup(name: string) {
    return baseRequest(`${API_ROOT_URL}/training-groups/`, 'POST', { name }, [useSessionToken, useCsrfToken]);
}

// グループ名の更新
export async function UpdateTrainingGroupName(sessionToken: string, csrfToken: string, id: string, name: string) {
    return requestApi(`/training-groups/${id}/`, 'PATCH', { name }, sessionToken, csrfToken);
}

// グループの削除
export async function DeleteTrainingGroup(sessionToken: string, csrfToken: string, id: string) {
    return requestApi(`/training-groups/${id}/`, 'DELETE', null, sessionToken, csrfToken);
}

// 学習データの取得
export async function GetTrainingData(sessionToken: string, groupId: string) {
    return requestApi(`/training-groups/${groupId}/images/`, 'GET', null, sessionToken);
}

// 学習データの作成
export async function CreateTrainingData(sessionToken: string, csrfToken: string, groupId: string, label: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('label', label);
    return requestApi(`/training-groups/${groupId}/images/`, 'POST', formData, sessionToken, csrfToken);
}

// 学習データの更新
export async function UpdateTrainingData(sessionToken: string, csrfToken: string, id: string, label: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('label', label);
    return requestApi(`/training-data/${id}/`, 'PATCH', formData, sessionToken, csrfToken);
}

// 学習データの削除
export async function DeleteTrainingData(sessionToken: string, csrfToken: string, id: string) {
    return requestApi(`/training-data/${id}/`, 'DELETE', null, sessionToken, csrfToken);
}

// 学習データの学習
export async function Train(sessionToken: string, csrfToken: string, groupId: string) {
    return requestApi(`/train/${groupId}/`, 'POST', null, sessionToken, csrfToken);
}

// 推論
export async function Predict(sessionToken: string, csrfToken: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return requestApi('/predict/', 'POST', formData, sessionToken, csrfToken);
}
