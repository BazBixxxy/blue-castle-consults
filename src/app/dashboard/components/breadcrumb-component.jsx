import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BreadcrumbComponent() {
  const { pathname } = useLocation();
  let crumbs = pathname.split("/").filter((crumb) => crumb !== "");

  return (
    <Breadcrumb className="hidden lg:inline-flex">
      <BreadcrumbList>
        {crumbs.map((crumb, i) => {
          if (/^[a-zA-Z0-9]{10,}$/.test(crumb)) return null;
          const href = `/${crumbs.slice(0, i + 1).join("/")}`;
          const isLast = i === crumbs.length - 1;

          return (
            <React.Fragment key={i}>
              <BreadcrumbItem className={isLast ? "" : "hidden md:block"}>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold">
                    {crumb}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{crumb}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
