// src/components/WhatsAppCTA.jsx
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { business } from "@/lib/business";

export default function WhatsAppCTA({ message, children, ...props }) {
  return (
    <Button asChild {...props}>
      <a
        href={getWhatsAppLink(business.phone, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </Button>
  );
}
