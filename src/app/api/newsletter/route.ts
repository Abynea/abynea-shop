import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
    }
    // Démo : on simule l'inscription. Brancher ici votre ESP (Brevo, Klaviyo…).
    return NextResponse.json({ ok: true, code: "ABYNEA10" });
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
}
