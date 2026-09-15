import React, { lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./app/dashboard/layout/layout";

import SignupPage from "./app/auth/pages/signup-page";
import EmailSentPage from "./app/auth/pages/email-sent";
import LoginPage from "./app/auth/pages/login-page";

const HomePage = lazy(() => import("./app/main/home/pages/page"));
const ChatPage = lazy(() => import("./app/main/chat/pages/ChatPage"));

const DashboardHomePage = lazy(() => import("./app/dashboard/home/home-page"));

import NotFound from "./pages/not-found";
import ForgotPasswordPage from "./app/auth/pages/forgot-password-page";
import GeneralPoliciesPage from "./pages/policies/GeneralPoliciesPage";
import TermsAndConditionsPage from "./pages/policies/TermsAndConditionsPage";
import PrivacyPoliciesPage from "./pages/policies/PrivacyPoliciesPage";
import ErrorBoundary from "./pages/ErrorBoundaryPage";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./context/auth-context";
const ContactPage = lazy(() => import("./app/main/contact/pages/ContactPage"));

const App = () => {
  const { authUser } = useAuthContext();
  // console.log(authUser);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* auth routes */}
        <Route
          path="/signup"
          errorElement={<ErrorBoundary />}
          element={authUser ? <Navigate to={"/"} /> : <SignupPage />}
        />
        <Route
          path="/login"
          errorElement={<ErrorBoundary />}
          element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
        />
        <Route
          path="/forgot-password"
          errorElement={<ErrorBoundary />}
          element={authUser ? <Navigate to={"/"} /> : <ForgotPasswordPage />}
        />
        <Route
          path="/email-sent"
          errorElement={<ErrorBoundary />}
          element={authUser ? <Navigate to={"/"} /> : <EmailSentPage />}
        />
        <Route
          path="/general-policies"
          errorElement={<ErrorBoundary />}
          element={<GeneralPoliciesPage />}
        />
        <Route
          path="/terms-and-conditions"
          errorElement={<ErrorBoundary />}
          element={<TermsAndConditionsPage />}
        />
        <Route
          path="/privacy-policies"
          errorElement={<ErrorBoundary />}
          element={<PrivacyPoliciesPage />}
        />

        {/* main app/platform */}
        <Route
          path="/"
          errorElement={<ErrorBoundary />}
          element={<MainLayout />}
        >
          <Route index element={<HomePage />} />
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
          />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* dashboard routes */}
        <Route
          path="/dashboard"
          errorElement={<ErrorBoundary />}
          element={authUser ? <DashboardLayout /> : <Navigate to={"/login"} />}
        >
          <Route path="home" element={<DashboardHomePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
