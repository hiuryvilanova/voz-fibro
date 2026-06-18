import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "vf_cookie_preferences";

export async function GET() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return NextResponse.json({ preferences: null });

  try {
    return NextResponse.json({ preferences: JSON.parse(value) });
  } catch {
    return NextResponse.json({ preferences: null });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const preferences = {
    essential: true,
    experience: Boolean(body.experience),
    analytics: Boolean(body.analytics),
    updatedAt: new Date().toISOString(),
  };

  const response = NextResponse.json({ preferences });
  response.cookies.set(COOKIE_NAME, JSON.stringify(preferences), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 180,
  });
  return response;
}
