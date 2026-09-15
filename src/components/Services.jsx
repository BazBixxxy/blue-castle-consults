// src/components/Services.jsx
import { Landmark, FileCheck2, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { business } from "@/lib/business";
import { useInView } from "@/hooks/useInView";

const SERVICES = [
  {
    icon: Landmark,
    title: "Property Valuation",
    description:
      "Independent valuations for sale, purchase, mortgage, insurance or financial reporting purposes, backed by a defensible methodology and local market data.",
  },
  {
    icon: FileCheck2,
    title: "Statutory Land Assessments",
    description:
      "Compensation and statutory valuations for land acquisition, resettlement and government or institutional processes, prepared to the standard authorities expect.",
  },
  {
    icon: Leaf,
    title: "Consulting & Environmental Assessments",
    description:
      "Asset management advisory and environmental impact assessments for developers and institutions managing property portfolios across Uganda.",
  },
];

export default function Services() {
  const [ref, inView] = useInView();

  return (
    <section id="services" className="border-t border-border bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What we do
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Three core services, each handled by people who understand Uganda's
            property and regulatory environment.
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-12 grid gap-6 md:grid-cols-3 motion-safe:transition-all motion-safe:duration-700 ${
            inView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          }`}
        >
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border">
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <WhatsAppCTA
                  message={`Hi ${business.name}, I'm interested in ${title} and would like a quote.`}
                  variant="outline"
                  size="sm"
                  className="mt-6 w-fit"
                >
                  Ask about this
                </WhatsAppCTA>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
