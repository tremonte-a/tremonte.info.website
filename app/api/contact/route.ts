import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Extend the payload to include the Turnstile token
interface ContactPayload {
  name: string;
  email: string;
  service: string;
  message: string;
  turnstileToken: string; // added
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

  // Validate required fields (including Turnstile token)
  if (!body.name || !body.email || !body.message || !body.turnstileToken) {
    return NextResponse.json(
      { error: "Name, email, message, and verification are required." },
      { status: 400 }
    );
  }

  // ----- Verify Turnstile token -----
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("CLOUDFLARE_TURNSTILE_SECRET_KEY is not set.");
    return NextResponse.json(
      { error: "Server configuration error. Please contact the administrator." },
      { status: 500 }
    );
  }

  try {
    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: secretKey,
          response: body.turnstileToken,
        }),
      }
    );

    const verificationData = await verificationResponse.json();

    // Check if verification succeeded
    if (!verificationData.success) {
      console.error("Turnstile verification failed:", verificationData);
      return NextResponse.json(
        { error: "Verification failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    // Optional: Check the score if you have Turnstile's "bot" or "interactive" score
    // For Turnstile, success is enough; you can also check `verificationData.action`
    // to ensure it matches your expected action.

    // ----- Proceed with email sending -----
    const recipientEmail = process.env.RECIPIENT_EMAIL;
    if (!recipientEmail) {
      console.error("RECIPIENT_EMAIL environment variable is not set.");
      return NextResponse.json(
        { error: "Server configuration error. Please contact the administrator." },
        { status: 500 }
      );
    }

    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    if (!fromEmail) {
      console.error("CONTACT_FROM_EMAIL environment variable is not set.");
      return NextResponse.json(
        { error: "Server configuration error. Please contact the administrator." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: `New contact form submission from ${body.name}`,
      replyTo: body.email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Service:</strong> ${body.service || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}