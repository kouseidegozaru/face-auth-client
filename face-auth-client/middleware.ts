import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as recognizerPath from "./app/_links/recognizer";
import { LoginPage } from "./app/_links/accounts";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ログイン状態を事前に取得
  const isLogin = req.cookies.get("sessionToken")?.value;

  // ログインが必要かを判定
  const mustLoginPaths = Object.values(recognizerPath)
    .filter((item) => item?.path) // Ensure the item has a path property
    .map((item) => item.path);
  const mustLogin = !isLogin && mustLoginPaths.includes(pathname);

  // メインページにリダイレクトするか
  const mustRedirectToMainPage = pathname === "/" || pathname === "/index";

  // メインページにリダイレクト
  if (mustRedirectToMainPage) {
    const groupPagePath = recognizerPath.GroupPage?.path || "/";
    return NextResponse.redirect(new URL(groupPagePath, req.url));
  }

  // ログインページにリダイレクト
  if (mustLogin) {
    const loginPagePath = LoginPage?.path;
    return NextResponse.redirect(new URL(loginPagePath, req.url));
  }

  return NextResponse.next();
}

// 適用範囲を設定
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/", "/recognizer/:path*"],
};