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

export default function GeneralPolicies() {
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
        <Button variant="ghost">General Policies</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            General Policies
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto"
          >
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold text-sm text-muted-foreground">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p>
                        <strong>Platform Purpose</strong>
                      </p>
                      <p>
                        Our platform enables small and medium enterprises (SMEs)
                        to register, list, and sell their products online.
                        Registered sellers can create accounts, provide accurate
                        product details, and make their products available to
                        buyers across the country.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Seller Responsibilities</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>
                          Provide accurate and complete product details,
                          including descriptions, prices, and images.
                        </li>
                        <li>
                          Ensure that all listed products comply with local
                          regulations and are safe for sale.
                        </li>
                        <li>
                          Honor accepted orders and deliver products in a timely
                          manner.
                        </li>
                        <li>
                          Maintain up-to-date inventory information to prevent
                          overselling or inaccurate listings.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Buyer Responsibilities</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>
                          Provide accurate information when placing orders,
                          including delivery details.
                        </li>
                        <li>
                          Respect payment terms and complete transactions in
                          good faith.
                        </li>
                        <li>
                          Refrain from fraudulent activity, misuse of the
                          platform, or attempts to harm sellers.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Order Processing & Checkout</strong>
                      </p>
                      <p>
                        Our company facilitates the order and checkout process
                        between buyers and sellers. While we handle the payment
                        and order flow, fulfillment and delivery remain the
                        responsibility of the sellers, unless otherwise agreed
                        upon in writing.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Prohibited Products</strong>
                      </p>
                      <p>
                        Sellers may not list or sell prohibited, illegal,
                        counterfeit, or unsafe goods. Items that violate
                        intellectual property rights, local laws, or ethical
                        standards are strictly forbidden.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Dispute Resolution</strong>
                      </p>
                      <p>
                        In the event of disputes between buyers and sellers, the
                        platform will provide reasonable support to facilitate
                        resolution. However, the platform is not liable for
                        issues arising from product quality, delivery delays, or
                        misrepresentation by sellers.
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Platform Integrity</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>
                          Users must not attempt to disrupt, hack, or misuse the
                          platform in any way.
                        </li>
                        <li>
                          All interactions must comply with local and
                          international laws.
                        </li>
                        <li>
                          We reserve the right to suspend or terminate accounts
                          involved in fraud, abuse, or repeated violations.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <p>
                        <strong>Policy Updates</strong>
                      </p>
                      <p>
                        These policies may be updated periodically to reflect
                        changes in services, regulations, or company practices.
                        Continued use of the platform indicates acceptance of
                        the updated policies.
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
              Scroll through all policies before accepting.
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
