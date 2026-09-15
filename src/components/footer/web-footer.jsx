import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Twitter, Mail, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import ContactUs from "../contact-us";
import TermsAndConditions from "../policies/terms-and-conditions";
import PrivacyPolicies from "../policies/privacy-policies";

export function FooterBlock() {
  const currentYear = format(new Date(), "yyyy");
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Stay Connected</h3>
            <p className="text-muted-foreground max-w-md">
              Follow us on social media for the latest updates, tips, and
              community highlights.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="GitHub">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="LinkedIn">
                <FaTiktok className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <Separator className="w-full max-w-md" />

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Daniel Perfumes &#183; All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <PrivacyPolicies />
              <TermsAndConditions />
              <ContactUs />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
