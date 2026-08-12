import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="hairline mt-24 bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 font-display text-lg text-ink">
              <span className="font-mono text-sm text-rust">{"</>"}</span>
              Angelo Tremonte
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Training, tech support, data analytics &amp; automation, video and
              audio production. Based in Ontario, Canada — working
              with clients everywhere.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">Services</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services#training" className="hover:text-rust">Training</Link></li>
              <li><Link href="/services#tech-support" className="hover:text-rust">Tech Support</Link></li>
              <li><Link href="/services#automation" className="hover:text-rust">Data &amp; Automation</Link></li>
              <li><Link href="/services#production" className="hover:text-rust">Video &amp; Audio Production</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Explore</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/portfolio" className="hover:text-rust">Portfolio</Link></li>
              <li><Link href="/blog" className="hover:text-rust">Writing</Link></li>
              <li><Link href="/book" className="hover:text-rust">Computer Aerobics</Link></li>
              <li><Link href="/about" className="hover:text-rust">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">Get in touch</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-rust">Book a consultation</Link></li>
              <li>
                <a href="angelo@tremonte.info" className="hover:text-rust">
                  angelo@tremonte.info
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-10 flex flex-col items-start justify-between gap-2 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Angelo Tremonte. All rights reserved.</p>
          <p className="font-mono">
            <span className="text-rust">$</span> built with Next.js — no CMS subscription required
          </p>
        </div>
      </div>
    </footer>
  );
}
