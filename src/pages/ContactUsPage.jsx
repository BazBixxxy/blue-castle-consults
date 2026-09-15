import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Globe,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  subject: z.string().max(120, "Subject is too long.").optional(),
  message: z.string().min(10, "Your message should be at least 10 characters."),
});

export default function ContactUsPage() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const { authUser } = useAuthContext();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: `${authUser?.firstName ?? ""} ${authUser?.lastName ?? ""}`.trim(),
      email: authUser?.email ?? "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    setSending(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_JS_SERVICE_KEY,
        import.meta.env.VITE_EMAIL_JS_TEMPLATE,
        {
          to_name: "Daniel Perfumes Team",
          from_name: values.name,
          reply_to: values.email,
          subject: values.subject || "(No subject)",
          message: values.message,
        },
        { publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY }
      )
      .then(
        () => {
          toast.success("Message sent successfully!", {
            description: "We'll get back to you within 24-48 hours.",
          });
          form.reset();
          setSending(false);
        },
        (error) => {
          console.error("Email failed:", error);
          toast.error("Failed to send message", {
            description: "Please try again or contact us directly.",
          });
          setSending(false);
        }
      );
  };

  const faqs = [
    {
      question: "How quickly can I expect a response?",
      answer:
        "We typically respond within 24-48 hours during business days. For urgent matters, please call us directly at +256 782 009 476.",
    },
    {
      question: "How can I become a seller on Daniel Perfumes?",
      answer:
        "We welcome sellers worldwide! Simply mention your interest in becoming a seller in your message, along with details about your products, and we'll guide you through our streamlined onboarding process.",
    },
    {
      question: "Do you provide support in multiple languages?",
      answer:
        "Currently, we provide support in English. However, we're actively expanding our language support. Let us know your preferred language to help us prioritize.",
    },
    {
      question: "What information should I include for faster assistance?",
      answer:
        "To help us assist you quickly, please include: your order ID (if applicable), product details, screenshots of any issues, and a clear description of your question or problem.",
    },
    {
      question: "Can I speak with someone directly?",
      answer:
        "Absolutely! Call us at +256 782 009 476, Monday through Friday, 9:00 AM to 6:00 PM East Africa Time (EAT).",
    },
    {
      question: "What types of issues can you help with?",
      answer:
        "We assist with order inquiries, product questions, technical issues, seller applications, partnership opportunities, and general platform support.",
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Mon-Fri, 9AM-6PM EAT",
      action: "Call +256 782 009 476",
      href: "tel:+256782009476",
      variant: "outline",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "24-48 hour response time",
      action: "Send Message",
      href: "#contact-form",
      variant: "default",
    },
  ];

  const features = [
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Connect sellers and buyers worldwide",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Supporting businesses of all sizes",
    },
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "Quick response times and solutions",
    },
  ];

  useEffect(() => {
    document.title = "Contact Us | Daniel Perfumes";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()} // Demo alternative
              className="hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Contact Us</h1>
              <p className="text-sm text-muted-foreground">
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            <MessageSquare className="h-4 w-4" />
            Support Center
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How can we help you today?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with our team for support, partnerships, or any
            questions about Daniel Perfumes
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="group hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <method.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {method.description}
                    </p>
                    <Button
                      variant={method.variant}
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <a href={method.href}>{method.action}</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card id="contact-form" className="shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Tips */}
                <div className="bg-muted/50 border border-border/50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Tips for faster support
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • Include order numbers and specific product details
                    </li>
                    <li>• Attach screenshots if reporting an issue</li>
                    <li>• Be as detailed as possible in your message</li>
                    <li>• Check our FAQ section for quick answers</li>
                  </ul>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                                className="focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                                className="focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Subject
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Optional
                            </Badge>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Brief description of your inquiry"
                              {...field}
                              className="focus:ring-2 focus:ring-primary/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide as much detail as possible to help us assist you better..."
                              className="min-h-[120px] resize-none focus:ring-2 focus:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={sending}
                        className="flex-1 sm:flex-none"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About Daniel Perfumes */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">About Daniel Perfumes</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-muted-foreground">
                  A global e-commerce platform connecting sellers and buyers
                  worldwide, enabling businesses of all sizes to reach new
                  markets and grow.
                </p>

                <Separator />

                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-1 bg-primary/10 rounded">
                        <feature.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Response within 24-48 hours</span>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium py-3 hover:no-underline data-[state=open]:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-3">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
