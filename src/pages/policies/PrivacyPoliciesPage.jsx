import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function PrivacyPoliciesPage() {
  const navigate = useNavigate();

  const privacySections = [
    {
      title: "Introduction",
      content:
        "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. By accessing the platform, you consent to the practices described herein.",
    },
    {
      title: "Information We Collect",
      content: [
        "Personal details such as your name, email, phone number, and address when you register or interact with our services.",
        "Usage information such as device type, browser, location data, and pages accessed.",
        "Any content you voluntarily provide, such as profile details or uploaded documents.",
      ],
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information collected to provide, maintain, and improve our services, verify identities, ensure security, personalize user experiences, and comply with legal obligations.",
    },
    {
      title: "Sharing of Information",
      content:
        "We do not sell your personal data. Information may be shared only with trusted service providers, legal authorities (when required), or with your consent, and always in compliance with applicable laws.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. However, no system is 100% secure.",
    },
    {
      title: "Data Retention",
      content:
        "We retain your information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal requirements, and resolve disputes.",
    },
    {
      title: "Your Rights",
      content: [
        "Access and request a copy of your personal data",
        "Request correction or deletion of your data",
        "Withdraw consent where processing is based on it",
        "Object to or restrict certain forms of data processing",
      ],
    },
    {
      title: "Cookies & Tracking",
      content:
        "Our platform may use cookies and similar technologies to enhance your experience, remember preferences, and analyze traffic. You may manage cookie preferences through your browser settings.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy periodically. Any changes will be reflected on this page, and continued use of the platform indicates acceptance of those changes.",
    },
    {
      title: "Contact Us",
      content:
        "If you have questions or concerns about this Privacy Policy or how we handle your data, please contact our support team.",
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
      {/* Sticky Header */}
      <header className="border-b py-4 sticky top-0 z-10 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-xl font-semibold whitespace-nowrap ml-5">
            Privacy Policy
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-8">
              {privacySections.map((section, index) => (
                <div key={index}>
                  <CardHeader className="px-0 pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pt-0 pb-2">
                    {renderContent(section.content)}
                  </CardContent>
                  {index < privacySections.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

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
