import { NextResponse } from 'next/server';
import { getSessionToken, setSessionToken } from '@/app/_authorization/session';

export async function POST(request: Request) {
    const { sessionToken } = await request.json(); // 送られてくるセッショントークン
    // クッキーを設定
    await setSessionToken(sessionToken);
    return NextResponse.json({ message : "success" });
}

export async function GET(request: Request) {
    const sessionToken = await getSessionToken();
    return NextResponse.json({ sessionToken: sessionToken });

}
