'use server'

import { getUser } from "../_requests/accounts"
import { SessionError } from "../_requests/modules";
// ユーザーがログインしていてるかを確認
export async function IsLogin(): Promise<boolean> {
    try {
        // ユーザー情報が正常に取得できた場合はtrueを返す
        const response = await getUser();
        return response.ok;
    } catch (error) {
        // セッションエラーの場合はfalseを返す
        if (error instanceof SessionError) {
            return false;
        }
        console.log(error);
        return false;
    }
}
