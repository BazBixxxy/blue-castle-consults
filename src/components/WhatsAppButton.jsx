// src/components/WhatsAppButton.jsx
import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { business } from "@/lib/business";
import { getWhatsAppLink } from "@/lib/whatsapp";

const WA_URL = getWhatsAppLink(
  business.phone,
  `Hello ${business.shortName}, I visited your website and would like to enquire about your real estate valuation and consulting services.`
);

function WaIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes wa-ring {
          0% {
            transform: scale(1);
            opacity: .4;
          }
          70% {
            transform: scale(1.65);
            opacity: 0;
          }
          100% {
            transform: scale(1.65);
            opacity: 0;
          }
        }

        @keyframes wa-pop {
          0% {
            opacity: 0;
            transform: scale(.65) translateY(10px);
          }
          65% {
            transform: scale(1.05) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes wa-slide {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .wa-pop {
          animation: wa-pop .45s cubic-bezier(.34,1.56,.64,1) both;
        }

        .wa-slide {
          animation: wa-slide .3s ease both;
        }

        .wa-ring {
          position: absolute;
          inset: -7px;
          border-radius: 9999px;
          background: hsl(var(--primary));
          opacity: .25;
          pointer-events: none;
          animation: wa-ring 2.2s ease-out infinite;
        }
      `}</style>

      <div
        className="fixed bottom-6 right-5 sm:right-6 z-[9999] flex flex-col items-end gap-3"
        style={{ pointerEvents: "none" }}
      >
        {open && (
          <div
            className="wa-slide w-[300px] sm:w-[340px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-card"
            style={{ pointerEvents: "auto" }}
          >
            {/* Header */}
            <div className="px-4 py-3.5 flex items-center gap-3 border-b border-border bg-primary/10">
              <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center flex-shrink-0 text-primary bg-background">
                <WaIcon size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight text-foreground">
                  {business.name}
                </p>

                <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse flex-shrink-0 opacity-60" />
                  Usually responds within a few hours
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>

            {/* Message */}
            <div className="px-4 py-5 bg-muted/30">
              <div className="inline-block bg-background rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[92%] relative">
                <span className="absolute -left-[9px] top-0 border-t-[10px] border-t-background border-l-[9px] border-l-transparent" />

                <p className="text-sm leading-relaxed text-foreground/85">
                  👋 Hello! Welcome to {business.shortName}.
                </p>

                <p className="text-sm leading-relaxed text-foreground/80 mt-2">
                  Need a property valuation, statutory land assessment, or
                  professional real estate advice? Our team is happy to help.
                </p>

                <p className="text-[10px] text-muted-foreground mt-2 text-right">
                  {business.shortName} Team · now
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="px-4 py-3.5 bg-card border-t border-border">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full rounded-xl py-3 font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition shadow-sm"
              >
                <WaIcon size={18} />
                Chat with {business.shortName}
              </a>

              <p className="text-[11px] text-muted-foreground text-center mt-2">
                Valuation · Assessments · Consulting
              </p>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <div className="relative wa-pop" style={{ pointerEvents: "auto" }}>
          {!open && <span className="wa-ring" />}

          <button
            onClick={() => setOpen((value) => !value)}
            aria-label={
              open
                ? "Close chat"
                : `Chat with ${business.shortName} on WhatsApp`
            }
            className="relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-primary text-primary-foreground hover:scale-105 transition-all duration-200"
          >
            <span
              className="transition-all duration-300"
              style={{
                transform: open ? "scale(0.85)" : "scale(1)",
              }}
            >
              {open ? <X className="h-6 w-6" /> : <WaIcon size={27} />}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
