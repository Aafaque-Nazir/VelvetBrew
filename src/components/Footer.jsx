import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Massive Watermark */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
        <h1 className="text-[20vw] font-bold leading-none text-white whitespace-nowrap select-none">
          VELVET BREW
        </h1>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold tracking-tighter">
              VELVET<span className="text-bronze-500">BREW</span>
            </h3>
            <p className="text-white/60 text-lg leading-relaxed max-w-xs">
              Milled from chaos. <br />
              Refined by obsession.
            </p>
            <div className="flex gap-6 pt-4">
              <SocialLink href="#" label="IG" />
              <SocialLink href="#" label="TW" />
              <SocialLink href="#" label="LN" />
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="flex flex-col gap-4">
            <FooterHeading>Collection</FooterHeading>
            <FooterLink href="/machines">Machines</FooterLink>
            <FooterLink href="/accessories">Accessories</FooterLink>
            <FooterLink href="/beans">Beans</FooterLink>
          </div>

          {/* Links Column 2 */}
          <div className="flex flex-col gap-4">
            <FooterHeading>Company</FooterHeading>
            <FooterLink href="/about">Story</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/press">Press</FooterLink>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <FooterHeading>Stay in the loop</FooterHeading>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-white/40"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-bronze-500 opacity-50 group-hover:opacity-100 transition-opacity uppercase text-xs font-bold tracking-widest">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-white/40 text-sm">
          <p>© 2026 VelvetBrew Inc.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-xs opacity-50 block">
      {children}
    </h4>
  );
}

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-white/70 hover:text-bronze-500 hover:pl-2 transition-all duration-300 text-lg block"
    >
      {children}
    </a>
  );
}

function SocialLink({ href, label }) {
  return (
    <a
      href={href}
      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-bronze-500 hover:text-black hover:border-bronze-500 transition-all duration-300 font-bold text-xs"
    >
      {label}
    </a>
  );
}
