// src/components/RequestQuote.jsx
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { business } from "@/lib/business";

export default function RequestQuote() {
  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Get a transparent quote
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Every property and assessment is different, so we price each
          engagement individually. Send us the property type, its location and
          what the valuation is for, and we'll come back with a clear quote and
          timeline.
        </p>
        <div className="mt-8 flex justify-center">
          <WhatsAppCTA
            message={`Hi ${business.name}, I'm interested in a property valuation and would like a quote.`}
            size="lg"
          >
            Request a Quote on WhatsApp
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
}
