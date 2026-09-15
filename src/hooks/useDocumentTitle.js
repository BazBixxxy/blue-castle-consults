import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_TITLE = "My App";

export function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    let pageTitle = "";

    switch (location.pathname) {
      case "/":
        pageTitle = "Home";
        break;
      case "/signup":
        pageTitle = "Signup";
        break;
      case "/forgot-password":
        pageTitle = "Forgot Password";
        break;
      case "/email-sent":
        pageTitle = "Email Sent";
        break;

      // Dashboard
      case "/dashboard":
        pageTitle = "Dashboard";
        break;

      default:
        pageTitle = "Not Found";
    }

    document.title = `${pageTitle} | ${BASE_TITLE}`;
  }, [location.pathname]);
}
