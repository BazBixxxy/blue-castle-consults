import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { Phone } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Enter a valid email address."),
  subject: z.string().max(120, "Subject is too long.").optional(),
  message: z.string().min(10, "Your message should be at least 10 characters."),
});

export default function ContactUs() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
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
        // Replace with your IDs if different
        import.meta.env.VITE_EMAIL_JS_SERVICE_KEY,
        import.meta.env.VITE_EMAIL_JS_TEMPLATE,
        {
          to_name: "Baz Bixxxy",
          from_name: values.name,
          reply_to: values.email,
          subject: values.subject || "(No subject)",
          message: values.message,
        },
        { publicKey: import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY }
      )
      .then(
        () => {
          toast.success("Message sent 🎉", {
            description:
              "Thanks for reaching out. We’ll get back to you shortly.",
          });
          form.reset();
          setOpen(false);
          setSending(false);
        },
        (error) => {
          console.error("Email failed:", error);
          toast.error("Something went wrong", {
            description: "We couldn’t send your message. Please try again.",
          });
          setSending(false);
        }
      );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Contact Us</Button>
      </DialogTrigger>

      {/* If you’re using the responsive DialogContent with side variants, you can pass side="bottom" here */}
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Contact Us
          </DialogTitle>
          <div ref={scrollRef} className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Questions, feedback, or partnership ideas? Send us a message
                  and our team will respond as soon as possible.
                </p>

                <div className="mt-4">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your name</FormLabel>
                            <FormControl>
                              <Input
                                className="text-primary"
                                placeholder="Jane Doe"
                                {...field}
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
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="jane@example.com"
                                className="text-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Subject{" "}
                              <span className="text-muted-foreground">
                                (optional)
                              </span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="How can we help?"
                                className="text-primary"
                                {...field}
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
                                placeholder="Tell us a bit more…"
                                className="resize-none h-32 text-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Sticky-ish footer actions for consistency with your other dialogs */}
                      <div className="pt-1" />
                    </form>
                  </Form>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="border-t px-6 py-4 sm:items-center gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={sending}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="secondary" disabled={sending}>
            <a href="tel:+256782009476" className="contents">
              <Phone />
              Call
            </a>
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={sending}>
            {sending ? (
              <>
                <Loader2 className="animate-spin size-4" />
                <span>Sending...</span>
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
