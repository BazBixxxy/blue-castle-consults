// src/components/Listings.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WhatsAppCTA from "./Whatsappcta";
import { business, listings } from "@/lib/business";

export default function Listings() {
  return (
    <section id="listings" className="border-t border-border bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Plots available now
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Prices shown are starting prices per plot. Message us with a
            location and we'll confirm current availability and exact plot
            sizes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <Card
              key={item.id}
              className={`flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                item.note ? "border-primary/40" : ""
              }`}
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.location}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.road}</p>
                  </div>
                  {item.note ? (
                    <Badge variant="secondary">{item.note}</Badge>
                  ) : null}
                </div>
                <p className="mt-6 text-2xl font-bold text-foreground">
                  From {item.priceFrom}
                </p>
                <div className="mt-6">
                  <WhatsAppCTA
                    variant="outline"
                    className="w-full"
                    message={`Hi ${business.shortName}, I'm interested in a plot in ${item.location} along ${item.road} starting from ${item.priceFrom}. Is it still available?`}
                  >
                    Ask About This Plot
                  </WhatsAppCTA>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
