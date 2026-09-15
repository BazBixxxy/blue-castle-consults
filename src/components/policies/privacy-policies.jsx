"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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

export default function PrivacyPolicies() {
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Privacy Policy</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Privacy Policy
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto"
          >
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Introduction</strong>
                      </p>
                      <p>
                        This Privacy Policy explains how we collect, use,
                        disclose, and safeguard your information when you use
                        our platform. By accessing the platform, you consent to
                        the practices described herein.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Information We Collect</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>
                          Personal details such as your name, email, phone
                          number, and address when you register or interact with
                          our services.
                        </li>
                        <li>
                          Usage information such as device type, browser,
                          location data, and pages accessed.
                        </li>
                        <li>
                          Any content you voluntarily provide, such as profile
                          details or uploaded documents.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>How We Use Your Information</strong>
                      </p>
                      <p>
                        We use the information collected to provide, maintain,
                        and improve our services, verify identities, ensure
                        security, personalize user experiences, and comply with
                        legal obligations.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Sharing of Information</strong>
                      </p>
                      <p>
                        We do not sell your personal data. Information may be
                        shared only with trusted service providers, legal
                        authorities (when required), or with your consent, and
                        always in compliance with applicable laws.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Data Security</strong>
                      </p>
                      <p>
                        We implement appropriate technical and organizational
                        measures to protect your personal data against
                        unauthorized access, disclosure, alteration, or
                        destruction. However, no system is 100% secure.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Data Retention</strong>
                      </p>
                      <p>
                        We retain your information only as long as necessary to
                        fulfill the purposes outlined in this policy, comply
                        with legal requirements, and resolve disputes.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Your Rights</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Access and request a copy of your personal data</li>
                        <li>Request correction or deletion of your data</li>
                        <li>
                          Withdraw consent where processing is based on it
                        </li>
                        <li>
                          Object to or restrict certain forms of data processing
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Cookies & Tracking</strong>
                      </p>
                      <p>
                        Our platform may use cookies and similar technologies to
                        enhance your experience, remember preferences, and
                        analyze traffic. You may manage cookie preferences
                        through your browser settings.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Changes to This Policy</strong>
                      </p>
                      <p>
                        We may update this Privacy Policy periodically. Any
                        changes will be reflected on this page, and continued
                        use of the platform indicates acceptance of those
                        changes.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Contact Us</strong>
                      </p>
                      <p>
                        If you have questions or concerns about this Privacy
                        Policy or how we handle your data, please contact our
                        support team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t px-6 py-4 sm:items-center hidden">
          {!hasReadToBottom && (
            <span className="text-muted-foreground grow text-xs max-sm:text-center">
              Read all sections before accepting.
            </span>
          )}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" disabled={!hasReadToBottom}>
              I agree
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
