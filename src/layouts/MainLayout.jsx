import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingSpinner from "@/components/loading-spinner";
import TitleUpdater from "@/components/title-updater";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MainLayout = () => {
  const pathname = useLocation().pathname;

  return (
    <>
      <TitleUpdater />
      <Navbar />
      <div
        className={cn(
          "max-w-screen-xl mx-auto min-h-screen",
          pathname === "/" ? "" : "pt-16"
        )}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ScrollToTop />
          <Outlet />
        </Suspense>
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default MainLayout;
