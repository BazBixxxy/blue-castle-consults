import { useAuthContext } from "@/context/auth-context";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizable-navbar";
import { useState } from "react";
import CartPopover from "../cart";
import { ModeToggle } from "../mode-toggle";
import ProfileComponent from "../profile/profile-component";

export default function NavbarComponent() {
  const navItems = [
    // {
    //   name: "Home",
    //   link: "/",
    // },
    {
      name: "Shop",
      link: "/products",
    },
    {
      name: "Orders",
      link: "/orders",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { authUser } = useAuthContext();

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4 relative">
          <ModeToggle />
          <CartPopover />
          {authUser ? (
            <ProfileComponent />
          ) : (
            <NavbarButton variant="secondary" href="/login">
              Login
            </NavbarButton>
          )}
          {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center justify-center gap-3">
            {/* <AnimatedThemeToggler /> */}
            <ModeToggle />
            <CartPopover />
            {authUser && <ProfileComponent />}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            {!authUser && (
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="/login"
              >
                Login
              </NavbarButton>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
