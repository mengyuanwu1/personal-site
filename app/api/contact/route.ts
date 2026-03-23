import { NextRequest, NextResponse } from "next/server";

import { siteContent } from "../../../content/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Your message could not be read. Please try again." },
      { status: 400 },
    );
  }

  const {
    name: rawName,
    sender: rawSender,
    message: rawMessage,
    website: rawWebsite,
  } = (payload ?? {}) as Record<string, unknown>;

  const name = cleanString(rawName, 120);
  const sender = cleanString(rawSender, 200);
  const message = cleanString(rawMessage, 5000);
  const website = cleanString(rawWebsite, 200);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !sender || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }

  if (!emailPattern.test(sender)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          "This site's email delivery is not configured yet. An email draft will open as a fallback.",
      },
      { status: 503 },
    );
  }

  const recipient = process.env.CONTACT_TO_EMAIL ?? siteContent.email;
  const senderIdentity =
    process.env.CONTACT_FROM_EMAIL ?? "Personal Site <onboarding@resend.dev>";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: senderIdentity,
      to: [recipient],
      reply_to: sender,
      subject: `Website inquiry from ${name}`,
      text: [
        "New website inquiry",
        "",
        `Name: ${name}`,
        `Email: ${sender}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    console.error("Contact form delivery failed", await resendResponse.text());

    return NextResponse.json(
      { error: "Your message could not be sent right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
