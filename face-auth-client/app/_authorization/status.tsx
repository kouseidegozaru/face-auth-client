import { getUser } from "../_requests/accounts"
import { getSessionToken } from "../_authorization/session"

// ユーザーがログインしていてるかを確認
export default async function IsLogin(): Promise<boolean> {
    // セッショントークンを取得
    const sessionToken = getSessionToken();
    // セッショントークンがnullの場合はfalseを返す
    if (sessionToken == null) {
        return false;
    }

    try {
        // ユーザー情報が正常に取得できた場合はtrueを返す
        const response = await getUser(sessionToken);
        return response.ok;
    } catch (error) {
        console.log(error);
        return false;
    }
}
