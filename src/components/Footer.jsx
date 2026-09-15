// src/components/Footer.jsx
import { business } from "@/lib/business";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt={business.name} className="h-7 w-auto" />
          <span className="font-semibold text-foreground">{business.name}</span>
        </div>
        <p className="text-sm text-muted-foreground">{business.address}</p>
        <p className="text-xs text-muted-foreground">
          © {year} {business.name}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Designed and Built By Kwagala Trevor Bazanye from OdinDevs Enterprises
          Uganda Ltd.
        </p>
      </div>
    </footer>
  );
}
