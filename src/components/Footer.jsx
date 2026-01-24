import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "./ui/Button";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter">
              VELVET<span className="text-bronze-500">BREW</span>
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Crafting perfection in every cup. Experience the pinnacle of home
              espresso with our precision-engineered machines.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6 text-bronze-500">Shop</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Espresso Machines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Grinders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Coffee Beans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-bronze-500">Company</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-bronze-500">Stay Updated</h4>
            <p className="text-sm text-white/60 mb-4">
              Subscribe for exclusive offers and brewing tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-white/5 border border-white/10 rounded px-4 py-2 w-full text-sm focus:outline-none focus:border-bronze-500"
              />
              <Button size="sm">Join</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-xs text-white/40">
            © 2026 VelvetBrew Inc. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Facebook size={18} />} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <a
      href="#"
      className="text-white/60 hover:text-bronze-500 transition-colors"
    >
      {icon}
    </a>
  );
}
