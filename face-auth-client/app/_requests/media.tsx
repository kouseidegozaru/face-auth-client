// mediaエンドポイントへAPIリクエストを行う
'use cilient'

import { baseRequest} from "./modules";

// APIベースURL
const API_BASE_URL = process.env.API_BASE_URL
const API_ROOT_URL = `${API_BASE_URL}`

// 画像取得
export async function getImage(imagePath: string) : Promise<string> {
    try {
        const response = await baseRequest(`${API_ROOT_URL}${imagePath}`, 'GET', {});
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}
