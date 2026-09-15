import { BORDER, MUTED, ORANGE, SURFACE, TEXT } from "@/lib/lib";
import { SERVICES } from "@/lib/lib";
import { Card, SectionLabel } from "@/components/UI";

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: SURFACE,
        padding: "80px 0",
        borderTop: `1px solid ${BORDER}`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <SectionLabel>What We Do</SectionLabel>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 800,
            color: TEXT,
            margin: "0 0 8px",
            letterSpacing: "-0.025em",
          }}
        >
          Our Services
        </h2>
        <p
          style={{
            color: MUTED,
            fontSize: 15,
            marginBottom: 48,
            maxWidth: 480,
          }}
        >
          Transparent pricing where possible. Consultation-based where
          complexity demands it.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {SERVICES.map((s) => (
            <Card key={s.title}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: TEXT,
                  marginBottom: 6,
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: ORANGE,
                  marginBottom: 10,
                }}
              >
                {s.price}
              </div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
                {s.desc}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
