import { NextResponse } from 'next/server';
import { setCsrfToken } from '@/app/_authorization/csrf';

export async function POST(request: Request) {
    const { csrfToken } = await request.json(); // 送られてくるセッショントークン
    // クッキーを設定
    await setCsrfToken(csrfToken);
    return NextResponse.json({ message : "success" });
}