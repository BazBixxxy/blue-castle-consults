import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

export default function TermsAndConditionsPage() {
  const navigate = useNavigate();

  const terms = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using this website, users agree to comply with and be bound by these Terms of Service. Users who do not agree with these terms should discontinue use of the website immediately.",
    },
    {
      title: "User Account Responsibilities",
      content:
        "Users are responsible for maintaining the confidentiality of their account credentials. Any activities occurring under a user’s account are the sole responsibility of the account holder. Users must notify the website administrators immediately of any unauthorized account access.",
    },
    {
      title: "Content Usage and Restrictions",
      content:
        "The website and its original content are protected by intellectual property laws. Users may not reproduce, distribute, modify, create derivative works, or commercially exploit any content without explicit written permission from the website owners.",
    },
    {
      title: "Limitation of Liability",
      content:
        "The website provides content “as is” without any warranties. The website owners shall not be liable for direct, indirect, incidental, consequential, or punitive damages arising from user interactions with the platform.",
    },
    {
      title: "User Conduct Guidelines",
      content: [
        "Not upload harmful or malicious content",
        "Respect the rights of other users",
        "Avoid activities that could disrupt website functionality",
        "Comply with applicable local and international laws",
      ],
    },
    {
      title: "Modifications to Terms",
      content:
        "The website reserves the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.",
    },
    {
      title: "Termination Clause",
      content:
        "The website may terminate or suspend user access without prior notice for violations of these terms or for any other reason deemed appropriate by the administration.",
    },
    {
      title: "Governing Law",
      content:
        "These terms are governed by the laws of the jurisdiction where the website is primarily operated, without regard to conflict of law principles.",
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
          <h1 className="text-xl font-semibold whitespace-nowrap ml-5">
            Terms & Conditions
          </h1>
          <div className="w-20"></div> {/* Spacer to center title */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
          <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-8">
              {terms.map((term, index) => (
                <div key={index}>
                  <CardHeader className="px-0 pb-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {term.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pt-0 pb-2">
                    {renderContent(term.content)}
                  </CardContent>
                  {index < terms.length - 1 && <Separator className="my-4" />}
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
