import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer/footer";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import BreadcrumbComponent from "../components/breadcrumb-component";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import ProfileComponent from "@/components/profile/profile-component";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading-spinner";
import CurrencyToggle from "@/components/navbar/currency-toggle";
import TitleUpdater from "@/components/title-updater";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TitleUpdater />
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbComponent />
          </div>
          <div className="ml-auto px-4 flex items-center gap-2">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <ModeToggle />
            <div>
              <CurrencyToggle />
            </div>
            <ProfileComponent />
          </div>
        </header>
        <div className="fle flex-1 flex-col gap-4 p-4 pt-0 hidden">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
        <div className="min-h-screen px-2 md:px-4 lg:px-6">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
