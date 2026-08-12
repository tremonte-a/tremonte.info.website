import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  name: string;
  email: string;
  service: string;
  message: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

  // Validate required fields
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // ✅ Check if the recipient email is configured
  const recipientEmail = process.env.RECIPIENT_EMAIL;
  if (!recipientEmail) {
    console.error("RECIPIENT_EMAIL environment variable is not set.");
    return NextResponse.json(
      { error: "Server configuration error. Please contact the administrator." },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>", // Keep this or change to your verified domain later
      to: [recipientEmail], // ✅ Now using the ENV variable!
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