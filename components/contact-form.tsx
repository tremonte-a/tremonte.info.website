"use client";

import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Turnstile } from "next-turnstile"; // 👈 Added import

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null); // 👈 New state

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    // Validate Turnstile token
    if (!turnstileToken) {
      setStatus("error");
      // Optionally set an error message
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      service,
      message: formData.get("message"),
      turnstileToken, // 👈 Include the token
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setService("");
      setTurnstileToken(null); // Reset token after success
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 border border-rust/30 bg-rust-light p-10 text-center">
        <CheckCircle className="h-8 w-8 text-rust" />
        <p className="font-display text-xl text-ink">Message sent</p>
        <p className="text-sm text-muted-foreground">
          Thanks for reaching out — I&apos;ll get back to you within a
          business day to schedule your consultation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="font-mono text-xs uppercase tracking-wider">
            Name
          </Label>
          <Input id="name" name="name" required className="mt-2 rounded-none border-line bg-secondary" />
        </div>
        <div>
          <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 rounded-none border-line bg-secondary"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="service" className="font-mono text-xs uppercase tracking-wider">
          Which service are you interested in?
        </Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="service" className="mt-2 rounded-none border-line bg-secondary">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="tech-support">Tech Support</SelectItem>
            <SelectItem value="automation">Data Analytics &amp; Automation</SelectItem>
            <SelectItem value="production">Video &amp; Audio Production</SelectItem>
            <SelectItem value="not-sure">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message" className="font-mono text-xs uppercase tracking-wider">
          Tell me about your project
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 rounded-none border-line bg-secondary"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          Something went wrong. Please try again or email directly.
        </div>
      )}

      {/* 👇 Turnstile widget */}
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
        onVerify={(token) => setTurnstileToken(token)}
        onError={() => setStatus("error")}
        onExpire={() => setTurnstileToken(null)}
      />

      <button
        type="submit"
        disabled={status === "loading" || !turnstileToken} // 👈 Disable until token is present
        className="inline-flex items-center gap-2 rounded-sm bg-rust px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-primary-foreground transition-all hover:glow-btn disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {status === "loading" ? "Sending..." : "Send & Request a Consultation"}
      </button>
    </form>
  );
}