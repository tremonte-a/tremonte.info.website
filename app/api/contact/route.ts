import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  service: string;
  message: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // In production, wire this up to an email service (e.g. Resend, SMTP)
  // or a booking tool webhook. Logged here so the sandbox demo works
  // without external credentials.
  console.log("New contact submission:", body);

  return NextResponse.json({ success: true });
}
