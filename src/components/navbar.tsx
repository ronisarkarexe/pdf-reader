"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      className={cn(
        `z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6`,
        "border-b shadow-sm"
      )}
    >
      Logo
      <div className="md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full">
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <>
            <div>
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </div>
            <div>
              <Button size="sm">Get Joshion free</Button>
            </div>
          </>
        )}
        {!isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
