"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOW_PORTFOLIO = false; // Change to true when ready

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Writing" },
  { href: "/book", label: "Book" },
  { href: "/about", label: "About" },
].filter(item => item.href !== "/portfolio" || SHOW_PORTFOLIO);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2 font-display text-lg font-medium tracking-tight text-ink">
          <span className="font-mono text-sm text-rust transition-transform group-hover:translate-x-0.5">{"</>"}</span>
          Angelo Tremonte
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-rust",
                pathname === item.href && "text-rust"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-sm border border-rust/60 bg-rust/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-rust transition-all hover:glow-btn hover:bg-rust hover:text-primary-foreground"
          >
            Book a Call
          </Link>
        </nav>

        <button
          className="text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-paper px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-rust"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-sm border border-rust/60 bg-rust/10 px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.15em] text-rust"
          >
            Book a Call
          </Link>
        </nav>
      )}
    </header>
  );
}
