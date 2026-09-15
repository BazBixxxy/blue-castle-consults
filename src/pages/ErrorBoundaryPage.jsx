import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Home,
  RefreshCw,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ErrorBoundary = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");

  const goToHomepage = () => {
    navigate(isDashboard ? "/dashboard/home" : "/");
  };

  const handleSupport = () => {
    navigate(isDashboard ? "/dashboard/support" : "/contact-sales", {
      state: {
        status: "general",
        message: `An error occurred on page "${pathname}". Please contact the support team to resolve it. [Add any additional information here]`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="bg-accent/50">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-muted-foreground">
              Application Error
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <Alert variant="destructive">
            <AlertTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Unexpected Error
            </AlertTitle>
            <AlertDescription>
              We encountered an issue while processing your request.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h3 className="font-medium">Possible causes:</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Backend service unavailable</li>
              <li>Data format mismatch</li>
              <li>Invalid data received from server</li>
              <li>Network connectivity issues</li>
              <li>Unexpected application state</li>
            </ul>
          </div>

          <div className="hidden rounded-lg border border-blue-100 bg-blue-50 p-4">
            <h4 className="flex items-center gap-2 font-medium text-blue-800">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              Technical Details
            </h4>
            <p className="mt-1 text-sm text-blue-700">
              Error: Failed to fetch required data from server
              <br />
              Status: Connection timeout
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-6 pt-0">
          <div className="grid w-full grid-cols-2 gap-3">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Button onClick={() => window.location.reload()} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <Button onClick={goToHomepage} variant="ghost" className="gap-2">
              <Home className="h-4 w-4" />
              Homepage
            </Button>

            <Button onClick={handleSupport} variant="ghost" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Support
            </Button>
          </div>

          <div className="mt-2 w-full text-center">
            <p className="text-xs text-muted-foreground">
              Error ID:{" "}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
              <br />
              Please include this when contacting support
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorBoundary;
