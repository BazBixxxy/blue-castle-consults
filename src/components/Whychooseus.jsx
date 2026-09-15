// src/components/WhyChooseUs.jsx
import { ShieldCheck, MapPin, Clock, ScrollText } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Independent & defensible",
    description:
      "Every valuation follows a clear methodology, so reports hold up with banks, courts and government bodies.",
  },
  {
    icon: MapPin,
    title: "Uganda-wide coverage",
    description:
      "Based in Kampala with the reach to assess property across the country, not just the central business district.",
  },
  {
    icon: ScrollText,
    title: "Statutory experience",
    description:
      "Direct experience with land acquisition and compensation processes, not just private-market valuations.",
  },
  {
    icon: Clock,
    title: "Responsive service",
    description:
      "Straightforward communication from first enquiry to final report, with realistic timelines set upfront.",
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView();

  return (
    <section className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Why clients choose {""}
          <span className="text-primary">Blue Castle</span>
        </h2>

        <div
          ref={ref}
          className={`mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 motion-safe:transition-all motion-safe:duration-700 ${
            inView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          }`}
        >
          {POINTS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
