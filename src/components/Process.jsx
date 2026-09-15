// src/components/Process.jsx
import { useInView } from "@/hooks/useInView";

const STEPS = [
  {
    title: "Message us your details",
    description:
      "Tell us what's being assessed, its location and why you need the valuation or assessment.",
  },
  {
    title: "Site visit scheduled",
    description:
      "We agree on a convenient time and inspect the property in person.",
  },
  {
    title: "Assessment & research",
    description:
      "We analyse comparable data, documentation and relevant regulations to reach a supported valuation.",
  },
  {
    title: "Report delivered",
    description:
      "You receive a clear, professional report ready to submit to your bank, institution or authority.",
  },
];

export default function Process() {
  const [ref, inView] = useInView();

  return (
    <section id="process" className="border-t border-border bg-card/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How an engagement works
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            From first message to final report, four steps.
          </p>
        </div>

        <div
          ref={ref}
          className={`mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 motion-safe:transition-all motion-safe:duration-700 ${
            inView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
          }`}
        >
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative pl-2">
              <span className="text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
