import Link from "next/link";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/custom/icons";
import { MainNav } from "@/components/custom/main-nav";
import { MobileNav } from "@/components/custom/mobile-nav";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { buttonVariants } from "../ui/button";
import { UserNav } from "./user-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <UserNav />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
