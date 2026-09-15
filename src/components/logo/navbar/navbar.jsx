import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/lib";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    setOpen(false);

    document
      .getElementById(id.toLowerCase().replace(/ /g, "-"))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <button
          onClick={() => scrollTo("Hero")}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <div className="h-3 w-5 rounded-sm border-[3px] border-primary-foreground" />
          </div>

          <span className="text-lg font-extrabold tracking-tight">
            OdinDevs
          </span>
        </button>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </Button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button onClick={() => scrollTo("Contact")}>Get a Quote</Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80">
            <div className="mt-8 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Button
                  key={link}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => scrollTo(link)}
                >
                  {link}
                </Button>
              ))}

              <Button className="mt-4" onClick={() => scrollTo("Contact")}>
                Get a Quote
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
