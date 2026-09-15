import { SectionWrapper, PageHeader, FadeIn } from "@/components/common";
import { ORG } from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSub] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setSub(true);
  };

  return (
    <>
      <PageHeader
        label="Contact"
        title="We'd love to hear from you."
        subtitle="Whether you want to donate, volunteer, partner, or simply learn more — our team is here to help."
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <FadeIn>
            {submitted ? (
              <div className="text-center py-16 rounded-2xl border border-border bg-card">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-xl font-semibold text-foreground mb-2">
                  Message Sent!
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll respond within 2 business days. Thank you for reaching
                  out.
                </p>
              </div>
            ) : (
              <form onSubmit={handle} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name">Full Name *</Label>
                  <Input
                    id="c-name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-email">Email *</Label>
                  <Input
                    id="c-email"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Subject</Label>
                  <Select
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, subject: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What's this about?" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "General Inquiry",
                        "Donation",
                        "Volunteering",
                        "Partnership",
                        "Media & Press",
                        "Programs",
                        "Events",
                        "Other",
                      ].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-msg">Message *</Label>
                  <Textarea
                    id="c-msg"
                    rows={6}
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </FadeIn>

          {/* Contact info */}
          <FadeIn delay={100}>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-5">
                  Contact Details
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Mail className="h-4 w-4" />,
                      label: "Email",
                      value: ORG.email,
                      href: `mailto:${ORG.email}`,
                    },
                    {
                      icon: <Phone className="h-4 w-4" />,
                      label: "Phone",
                      value: ORG.phone,
                      href: `tel:${ORG.phone}`,
                    },
                    {
                      icon: <MapPin className="h-4 w-4" />,
                      label: "Address",
                      value: ORG.address,
                      href: null,
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                          {c.label}
                        </p>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="text-sm text-foreground hover:text-primary transition-colors"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground">{c.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  {[
                    {
                      href: ORG.social.instagram,
                      Icon: Instagram,
                      label: "Instagram",
                    },
                    {
                      href: ORG.social.twitter,
                      Icon: Twitter,
                      label: "Twitter",
                    },
                    {
                      href: ORG.social.facebook,
                      Icon: Facebook,
                      label: "Facebook",
                    },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div>
                <p className="text-xs font-bold text-primary tracking-widest uppercase mb-4">
                  Find Us
                </p>
                <div className="rounded-xl overflow-hidden border border-border bg-muted/60 h-52 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Opposite Acacia Mall, Kampala Road
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Kampala, Uganda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionWrapper>
    </>
  );
}
