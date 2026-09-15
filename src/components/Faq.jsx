// src/components/FAQ.jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What is a property valuation used for?",
    answer:
      "A valuation report is commonly needed for property sales and purchases, mortgage applications, insurance, financial reporting, or resolving a dispute. We'll confirm which format your report needs based on who it's being submitted to.",
  },
  {
    question: "How long does an assessment take?",
    answer:
      "Timelines depend on the property type, location and purpose of the assessment. We'll give you a realistic estimate once we understand the scope, and confirm it before we begin.",
  },
  {
    question: "Do you work outside Kampala?",
    answer:
      "Yes. While our office is in Kampala, we assess properties and handle statutory assessments across Uganda.",
  },
  {
    question: "What do I need to provide to get started?",
    answer:
      "Typically the property location, any existing title or land documents, and the reason for the valuation. Message us on WhatsApp and we'll guide you through exactly what's needed for your case.",
  },
  {
    question: "Can you help with statutory or compensation valuations?",
    answer:
      "Yes, statutory land assessments and compensation valuations for land acquisition are one of our core services, alongside private property valuations and consulting.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-border bg-card/40 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Common questions
        </h2>

        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-left text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
