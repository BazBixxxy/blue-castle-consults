// src/components/Hero.jsx
import { useEffect, useState } from "react";
import { business } from "@/lib/business";
import WhatsAppCTA from "./Whatsappcta";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-16"
    >
      <style>{`
        @keyframes bc-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(24px, 18px) scale(1.08); }
        }
        @keyframes bc-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, -16px) scale(1.06); }
        }
        .motion-safe\\:bc-blob-a { animation: bc-drift-a 14s ease-in-out infinite; }
        .motion-safe\\:bc-blob-b { animation: bc-drift-b 16s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:bc-blob-a, .motion-safe\\:bc-blob-b { animation: none; }
        }
      `}</style>

      <div
        aria-hidden
        className="motion-safe:bc-blob-a absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="motion-safe:bc-blob-b absolute -bottom-32 -right-16 -z-10 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-primary/15 to-transparent blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <p
            className={`text-sm font-medium text-primary motion-safe:transition-all motion-safe:duration-700 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            }`}
          >
            Kampala, Uganda
          </p>

          <h1
            className={`mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-foreground motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-100 md:text-6xl ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            }`}
          >
            Clear, defensible property valuations you can act on
          </h1>

          <p
            className={`mt-6 max-w-md text-lg leading-relaxed text-muted-foreground motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-200 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            }`}
          >
            {business.name} provides professional property valuation, statutory
            land assessments and consulting for property owners, developers and
            institutions across Uganda.
          </p>

          <div
            className={`mt-8 flex flex-wrap items-center gap-4 motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-300 ${
              loaded
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0 motion-reduce:opacity-100 motion-reduce:translate-y-0"
            }`}
          >
            <WhatsAppCTA
              message={`Hi ${business.name}, I just visited your website and I'd like to know more.`}
              size="lg"
            >
              Chat with Us on WhatsApp
            </WhatsAppCTA>
            <a
              href="#services"
              className="text-sm font-medium text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
            >
              See our services
            </a>
          </div>
        </div>

        <div
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border motion-safe:transition-all motion-safe:duration-1000 motion-safe:delay-150 ${
            loaded
              ? "scale-100 opacity-100"
              : "scale-105 opacity-0 motion-reduce:opacity-100 motion-reduce:scale-100"
          }`}
        >
          <img
            src="/hero.jpg"
            alt="Commercial property in Kampala assessed by Blue Castle Consults"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-transparent" />
        </div>
      </div>
    </section>
  );
}
