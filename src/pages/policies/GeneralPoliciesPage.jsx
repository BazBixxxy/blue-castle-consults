import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function GeneralPoliciesPage() {
  const navigate = useNavigate();

  const policies = [
    {
      title: "Platform Purpose",
      content: `Our platform enables small and medium enterprises (SMEs) to register, list, and sell their products online. Registered sellers can create accounts, provide accurate product details, and make their products available to buyers across the country.`,
    },
    {
      title: "Seller Responsibilities",
      content: [
        "Provide accurate and complete product details, including descriptions, prices, and images.",
        "Ensure that all listed products comply with local regulations and are safe for sale.",
        "Honor accepted orders and deliver products in a timely manner.",
        "Maintain up-to-date inventory information to prevent overselling or inaccurate listings.",
      ],
    },
    {
      title: "Buyer Responsibilities",
      content: [
        "Provide accurate information when placing orders, including delivery details.",
        "Respect payment terms and complete transactions in good faith.",
        "Refrain from fraudulent activity, misuse of the platform, or attempts to harm sellers.",
      ],
    },
    {
      title: "Order Processing & Checkout",
      content: `Our company facilitates the order and checkout process between buyers and sellers. While we handle the payment and order flow, fulfillment and delivery remain the responsibility of the sellers, unless otherwise agreed upon in writing.`,
    },
    {
      title: "Prohibited Products",
      content: `Sellers may not list or sell prohibited, illegal, counterfeit, or unsafe goods. Items that violate intellectual property rights, local laws, or ethical standards are strictly forbidden.`,
    },
    {
      title: "Dispute Resolution",
      content: `In the event of disputes between buyers and sellers, the platform will provide reasonable support to facilitate resolution. However, the platform is not liable for issues arising from product quality, delivery delays, or misrepresentation by sellers.`,
    },
    {
      title: "Platform Integrity",
      content: [
        "Users must not attempt to disrupt, hack, or misuse the platform in any way.",
        "All interactions must comply with local and international laws.",
        "We reserve the right to suspend or terminate accounts involved in fraud, abuse, or repeated violations.",
      ],
    },
    {
      title: "Policy Updates",
      content: `These policies may be updated periodically to reflect changes in services, regulations, or company practices. Continued use of the platform indicates acceptance of the updated policies.`,
    },
  ];

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-6 space-y-1 mt-2 text-sm text-muted-foreground">
          {content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm text-muted-foreground mt-2">{content}</p>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      {/* Sticky Header with Back Button */}
      <header className="border-b py-4 sticky top-0 z-10 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold whitespace-nowrap">
            General Policies
          </h1>
          <div className="w-20"></div> {/* Spacer to center title */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-8">
              {policies.map((policy, index) => (
                <div key={index}>
                  <CardHeader className="px-0 pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {policy.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pt-0 pb-2">
                    {renderContent(policy.content)}
                  </CardContent>
                  {index < policies.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/80 backdrop-blur-sm p-4 sticky bottom-0">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Button size="sm" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </footer>
    </div>
  );
}
