"use client";
import { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";

const PdfViewerPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== "undefined") {
      import("pspdfkit").then((PSPDFKit) => {
        if (PSPDFKit) {
          PSPDFKit?.unload(container);
        }

        PSPDFKit?.load({
          container,
          document: "/document.pdf",
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
          toolbarPlacement: PSPDFKit?.ToolbarPlacement?.BOTTOM,
        }).then((instance) => {
          instance.addEventListener("textSelection.change", (textSelection) => {
            if (textSelection) {
              textSelection.getText().then((text) => {
                const data = {
                  selectedText: text,
                };
                console.log(data);
              });
            } else {
              console.log("no text is selected");
            }
          });
        });
      });
    }
  }, []);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
};

export default PdfViewerPage;
