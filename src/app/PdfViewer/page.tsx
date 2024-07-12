"use client";
import { useEffect, useRef } from "react";

const PdfViewerPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== "undefined") {
      import("pspdfkit")
        .then((PSPDFKit) => {
          PSPDFKit?.unload(container);

          let toolbarItems = PSPDFKit.defaultToolbarItems;
          let pagerIndex = toolbarItems.findIndex(
            (item) => item.type === "pager"
          );
          toolbarItems.splice(pagerIndex + 1, 0, { type: "layout-config" });

          PSPDFKit.load({
            container,
            document: "/document.pdf",
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
            styleSheets: ["./my-pspdfkit.css"],
            layoutMode: PSPDFKit.LayoutMode.DOUBLE,
            toolbarItems: toolbarItems,
          })
            .then((instance) => {
              instance.addEventListener(
                "textSelection.change",
                (textSelection) => {
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
                }
              );
            })
            .catch((error) => {
              console.error("Error loading PSPDFKit:", error);
            });
        })
        .catch((error) => {
          console.error("Error importing PSPDFKit:", error);
        });
    }

    return () => {
      if (container) {
        import("pspdfkit")
          .then((PSPDFKit) => {
            PSPDFKit.unload(container);
          })
          .catch((error) => {
            console.error("Error unloading PSPDFKit:", error);
          });
      }
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
};

export default PdfViewerPage;
