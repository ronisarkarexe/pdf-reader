"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Heading = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="max-w-3xl space-y-4 pt-40">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your ideas, Documents, & Plans. Welcome to{" "}
        <span className="underline">AI PDF</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          Loading...
        </div>
      )}
      {!isLoading && (
        <Button asChild>
          <Link href="/PdfViewer">
            Upload
            <ArrowDown className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isLoading && (
        <Button>
          Try Now
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
