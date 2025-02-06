import { NextResponse } from 'next/server';
import { getSessionTokenInServerSide, setSessionTokenInServerSide } from '@/app/_authorization/session';

export async function POST(request: Request) {
    const { sessionToken } = await request.json(); // 送られてくるセッショントークン
    // クッキーを設定
    await setSessionTokenInServerSide(sessionToken);
    return NextResponse.json({ message : "success" });
}

export async function GET(request: Request) {
    const sessionToken = await getSessionTokenInServerSide();
    return NextResponse.json({ sessionToken: sessionToken });

}
