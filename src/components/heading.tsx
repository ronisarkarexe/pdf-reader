"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";
import axios from "axios";

export const Heading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8000/upload-pdf",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsLoading(false);
      }
    }
  };

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
        <Button onClick={handleUploadClick}>
          Upload
          <ArrowDown className="h-4 w-4 ml-2" />
        </Button>
      )}
      {!isLoading && (
        <Button>
          Try Now
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
