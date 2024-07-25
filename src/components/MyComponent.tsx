import React, { useRef, useEffect } from "react";

interface PSPDFKitType {
  load: (config: {
    container: HTMLElement | null;
    document: string;
    baseUrl: string;
  }) => Promise<any>;
  unload: (container: HTMLElement | null) => void;
}

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKitModule: PSPDFKitType | null = null; // Declare PSPDFKitModule in the outer scope

    const loadPSPDFKit = async () => {
      try {
        PSPDFKitModule = await import("pspdfkit");
        console.log(PSPDFKitModule);

        if (
          "load" in PSPDFKitModule &&
          typeof PSPDFKitModule.load === "function"
        ) {
          const instance = await PSPDFKitModule.load({
            container,
            document:
              "http://localhost:8000/files/1718889888391-RONI_CHANDRA_SARKAR_RESUME.pdf",
            baseUrl: `${window.location.origin}/pspdfkit-lib/`,
          });
          console.log("PSPDFKit loaded", instance);
        } else {
          console.error("PSPDFKit.load is not a function");
        }
      } catch (error) {
        console.error("Error loading PSPDFKit:", error);
      }
    };

    loadPSPDFKit();

    return () => {
      if (
        PSPDFKitModule &&
        "unload" in PSPDFKitModule &&
        typeof PSPDFKitModule.unload === "function"
      ) {
        PSPDFKitModule.unload(container);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default MyComponent;
