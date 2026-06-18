import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

interface GoogleProfile { sub: string; email: string; email_verified: boolean; name: string; picture?: string }

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("google_oauth_state")?.value;
  const verifier = cookieStore.get("google_oauth_verifier")?.value;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${requestUrl.origin}/api/auth/google/callback`;

  if (!code || !state || state !== expectedState || !verifier) return NextResponse.redirect(new URL("/entrar?error=google_invalid_state", request.url));

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID ?? "", client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "", redirect_uri: redirectUri, grant_type: "authorization_code", code_verifier: verifier }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) throw new Error("Falha ao trocar código OAuth");
    const tokens = await tokenResponse.json();
    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${tokens.access_token}` }, cache: "no-store" });
    if (!profileResponse.ok) throw new Error("Falha ao consultar perfil Google");
    const profile = (await profileResponse.json()) as GoogleProfile;
    if (!profile.email_verified) throw new Error("E-mail Google não verificado");

    let user = await prisma.user.findFirst({ where: { OR: [{ googleId: profile.sub }, { email: profile.email.toLowerCase() }] } });
    if (user) {
      user = await prisma.user.update({ where: { id: user.id }, data: { googleId: profile.sub, authProvider: user.password ? "local_google" : "google", avatarUrl: user.avatarUrl ?? profile.picture ?? null } });
    } else {
      user = await prisma.user.create({ data: { email: profile.email.toLowerCase(), name: profile.name, password: null, googleId: profile.sub, authProvider: "google", profileComplete: false, avatarUrl: profile.picture ?? null } });
    }

    await createSession({ id: user.id, email: user.email, name: user.name, role: user.role, state: user.state, profileComplete: user.profileComplete });
    const response = NextResponse.redirect(new URL(user.profileComplete ? "/comunidade" : "/completar-cadastro", request.url));
    response.cookies.delete("google_oauth_state");
    response.cookies.delete("google_oauth_verifier");
    return response;
  } catch (error) {
    console.error("google_oauth_error", error);
    return NextResponse.redirect(new URL("/entrar?error=google_failed", request.url));
  }
}
