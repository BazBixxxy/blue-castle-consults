// src/components/About.jsx
import { useInView } from "@/hooks/useInView";
import { business } from "@/lib/business";

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="border-t border-border py-24">
      <div
        ref={ref}
        className={`mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 motion-safe:transition-all motion-safe:duration-700 ${
          inView
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
        }`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
          <img
            src="/about.jpg"
            alt="Blue Castle Consults team reviewing a property assessment"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Local expertise, professional standards
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {business.name} is a Kampala-based real estate appraisal and
            consulting firm. We work with individual property owners,
            developers, lenders and institutions who need a valuation or
            assessment they can rely on, whether it's for a sale, a loan
            application, an insurance claim or a statutory requirement.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Our work covers property valuation, statutory land assessments and
            environmental impact assessments, along with ongoing asset
            management consulting across Uganda. Every report is built to hold
            up under scrutiny, whether it's read by a bank, a court or a
            government body.
          </p>
        </div>
      </div>
    </section>
  );
}
