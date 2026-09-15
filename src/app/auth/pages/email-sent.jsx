import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EmailSentPage = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-lg px-2 md:px-4 flex items-center justify-center h-screen">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Email Sent</CardTitle>
          <CardDescription>
            We’ve sent you an email please follow the instructions therein.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Please check your inbox or spam(maybe), follow the instructions and
            proceed.
          </p>
          <div className="text-sm">
            <span>Didn’t receive the email? </span>
            <Button
              variant="link"
              onClick={() => navigate(-1)}
              className="px-1"
            >
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default EmailSentPage;
