// recognizerエンドポイントへAPIリクエストを行う
'use client'

import { baseRequest, useCsrfToken, useMultipartFormData, useSessionToken } from "./modules"

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
export async function UpdateTrainingGroupName(id: string, name: string) {
    return baseRequest(`${API_ROOT_URL}/training-groups/${id}/`, 'PATCH', { name }, [useSessionToken, useCsrfToken]);
}

// グループの削除
export async function DeleteTrainingGroup(id: string) {
    return baseRequest(`${API_ROOT_URL}/training-groups/${id}/`, 'DELETE', null, [useSessionToken, useCsrfToken]);
}

// 学習データの取得
export async function GetTrainingData(groupId: string) {
    return baseRequest(`${API_ROOT_URL}/training-groups/${groupId}/images/`, 'GET', null, [useSessionToken]);
}

// 学習データの作成
export async function CreateTrainingData(groupId: string, label: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('label', label);
    return baseRequest(`${API_ROOT_URL}/training-groups/${groupId}/images/`, 'POST', formData, [useSessionToken, useCsrfToken, useMultipartFormData]);
}

// 学習データの更新
export async function UpdateTrainingData(id: string, label?: string, image?: File) {
    if (!label && !image) {
        throw new Error('must specify label or image');
    }
    const formData = new FormData();
    if (label) {
        formData.append('label', label);
    }
    if (image) {
        formData.append('image', image);
    }
    return baseRequest(`${API_ROOT_URL}/training-data/${id}/`, 'PATCH', formData, [useSessionToken, useCsrfToken, useMultipartFormData]);
}

// 学習データの削除
export async function DeleteTrainingData(id: string) {
    return baseRequest(`${API_ROOT_URL}/training-data/${id}/`, 'DELETE', null, [useSessionToken, useCsrfToken]);
}

// 学習データの学習
export async function Train(groupId: string) {
    return baseRequest(`${API_ROOT_URL}/train/${groupId}/`, 'POST', null, [useSessionToken, useCsrfToken]);
}

// 推論
export async function Predict(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return baseRequest(`${API_ROOT_URL}/predict/`, 'POST', formData, [useSessionToken, useCsrfToken]);
}
