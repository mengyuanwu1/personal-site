"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  email: string;
};

type FormStatus =
  | {
      kind: "error" | "info" | "success";
      message: string;
    }
  | null;

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  function openEmailDraft(nextName: string, nextSender: string, nextMessage: string) {
    const subject = encodeURIComponent(`Website inquiry from ${nextName || "a visitor"}`);
    const body = encodeURIComponent(
      [`Name: ${nextName || "-"}`, `Email: ${nextSender || "-"}`, "", nextMessage || ""].join(
        "\n",
      ),
    );

    window.location.assign(`mailto:${email}?subject=${subject}&body=${body}`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextName = name.trim();
    const nextSender = sender.trim();
    const nextMessage = message.trim();
    const nextWebsite = website.trim();

    if (!nextName || !nextSender || !nextMessage) {
      setStatus({
        kind: "error",
        message: "Please fill out your name, email, and message before sending.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nextName,
          sender: nextSender,
          message: nextMessage,
          website: nextWebsite,
        }),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;

      if (response.ok) {
        setName("");
        setSender("");
        setMessage("");
        setWebsite("");
        setStatus({
          kind: "success",
          message: "Thanks! Your message was sent successfully.",
        });
        return;
      }

      if (response.status === 503) {
        openEmailDraft(nextName, nextSender, nextMessage);
        setStatus({
          kind: "info",
          message:
            data?.error ??
            "Email delivery is not configured yet, so an email draft was opened instead.",
        });
        return;
      }

      setStatus({
        kind: "error",
        message: data?.error ?? "Something went wrong while sending your message.",
      });
    } catch {
      openEmailDraft(nextName, nextSender, nextMessage);
      setStatus({
        kind: "info",
        message:
          "The contact service could not be reached, so an email draft was opened instead.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Name</span>
        <input
          autoComplete="name"
          onChange={(event) => setName(event.target.value)}
          required
          type="text"
          value={name}
        />
      </label>
      <label className="form-field">
        <span>Email</span>
        <input
          autoComplete="email"
          onChange={(event) => setSender(event.target.value)}
          required
          type="email"
          value={sender}
        />
      </label>
      <label className="form-field">
        <span>Message</span>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          required
          rows={7}
          value={message}
        />
      </label>
      <label aria-hidden="true" className="form-field form-field-hidden">
        <span>Website</span>
        <input
          autoComplete="off"
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          type="text"
          value={website}
        />
      </label>
      {status ? (
        <p aria-live="polite" className={`form-status form-status-${status.kind}`}>
          {status.message}
        </p>
      ) : null}
      <button className="form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
