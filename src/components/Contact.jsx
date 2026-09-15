// src/components/Contact.jsx
import { MapPin, Phone, Clock } from "lucide-react";
import { business } from "@/lib/business";
import WhatsAppCTA from "./Whatsappcta";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Visit or message us
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Drop by our Kampala Road office during business hours, or reach us
            on WhatsApp any time and we'll respond as soon as we can.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <MapPin className="h-5 w-5 flex-none text-primary" aria-hidden />
              <p className="text-sm text-foreground/90">{business.address}</p>
            </div>
            <div className="flex gap-4">
              <Phone className="h-5 w-5 flex-none text-primary" aria-hidden />
              <a
                href={`tel:+${business.phone}`}
                className="text-sm text-foreground/90 hover:text-foreground"
              >
                {business.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-4">
              <Clock className="h-5 w-5 flex-none text-primary" aria-hidden />
              <div className="space-y-1 text-sm text-foreground/90">
                {business.hours.map((h) => (
                  <div key={h.days} className="flex gap-2">
                    <span className="text-muted-foreground">{h.days}:</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <WhatsAppCTA
            message={`Hi ${business.name}, I just visited your website and I'd like to know more.`}
            size="lg"
            className="mt-8"
          >
            Chat with Us on WhatsApp
          </WhatsAppCTA>
        </div>

        <div className="h-[360px] w-full overflow-hidden rounded-2xl border border-border md:h-full">
          <iframe
            title={`Map showing ${business.name}`}
            src={`https://www.google.com/maps?q=${business.coordinates.lat},${business.coordinates.lng}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
