import * as React from "react";
import { Bot, Frame, Map, PieChart, Settings2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { ShoppingBag } from "lucide-react";
import { StoreIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import ContactUs from "./contact-us";

// This is sample data.
const data = {
  teams: [
    {
      name: "Store Dashboard",
      logo: StoreIcon,
      plan: "Enterprise",
    },
  ],
  navMain: [
    // {
    //   title: "Home",
    //   url: "/dashboard/home",
    //   icon: LayoutDashboard,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Home",
    //       url: "/dashboard/home",
    //     },
    //   ],
    // },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: Bot,
      items: [
        {
          title: "Overview",
          url: "/dashboard/products",
        },
        {
          title: "Add Product",
          url: "/dashboard/products/add",
        },
      ],
    },
    {
      title: "Orders",
      url: "/dashboard/orders",
      icon: ShoppingBag,
      items: [
        {
          title: "Overview",
          url: "/dashboard/orders",
        },
      ],
    },
  ],
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: Frame,
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <AlertExit />
        <ContactUs />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// alert exit
function AlertExit() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    return;
  };
  const { open } = useSidebar();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={open ? "" : "icon"}
          className="m-2 mb-0"
          variant={theme === "light" ? "outline" : ""}
        >
          <span className={open ? "" : "sr-only"}>Exit Dashboard</span>
          <LogOutIcon className={open ? "hidde ml-auto size-4" : "size-5"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Exit Dashboard</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
