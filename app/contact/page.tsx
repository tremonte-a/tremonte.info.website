import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Angelo Tremonte",
  description: "Book a consultation for training, tech support, automation, or production work.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-ink text-balance">
            Book a consultation
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Tell me a bit about what you need. I&apos;ll follow up to schedule
            a short call so we can talk through the project before anything
            is scoped or priced.
          </p>

          <div className="mt-10 space-y-5 border-t border-line pt-8">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-rust" />
              <div>
                <p className="text-sm font-medium text-ink">Email</p>
                <a
                  href="mailto:angelo@tremonte.info"
                  className="text-sm text-muted-foreground hover:text-rust"
                >
                  angelo@tremonte.info
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-rust" />
              <div>
                <p className="text-sm font-medium text-ink">Location</p>
                <p className="text-sm text-muted-foreground">
                  Ontario, Canada — remote &amp; on-site
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-rust" />
              <div>
                <p className="text-sm font-medium text-ink">Response time</p>
                <p className="text-sm text-muted-foreground">
                  Within one business day
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-line bg-card p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
