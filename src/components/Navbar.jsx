// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { business } from "@/lib/business";
import { ModeToggle } from "./mode-toggle";
import WhatsAppCTA from "./Whatsappcta";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <img src="/logo.png" alt={business.name} className="h-8 w-auto" />
          <span className="font-bold tracking-tight text-foreground">
            {business.shortName}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <ModeToggle />
          <WhatsAppCTA
            message={`Hi ${business.name}, I just visited your website and I'd like to know more.`}
            size="sm"
          >
            Get in Touch
          </WhatsAppCTA>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="rounded-md p-2 text-foreground md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-10 flex flex-col gap-6">
              {LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="text-base text-foreground/90 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
              <WhatsAppCTA
                message={`Hi ${business.name}, I just visited your website and I'd like to know more.`}
                className="w-full"
              >
                Get in Touch
              </WhatsAppCTA>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
