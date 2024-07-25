"use client";
import CustomePage from "@/components/pdf/customepdf";
import { useEffect, useRef } from "react";

const PdfViewerPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container && typeof window !== "undefined") {
      import("pspdfkit")
        .then((PSPDFKit) => {
          PSPDFKit?.unload(container);

          let toolbarItems = PSPDFKit.defaultToolbarItems.filter(
            (item) =>
              item.type !== "pager" &&
              item.type !== "select-multiple-annotations" &&
              item.type !== "zoom-out" &&
              item.type != "zoom-in" &&
              item.type !== "sidebar-thumbnails" &&
              item.type !== "sidebar-document-outline" &&
              item.type !== "sidebar-annotations" &&
              item.type !== "sidebar-bookmarks" &&
              item.type !== "sidebar-signatures" &&
              item.type !== "multi-annotations-selection" &&
              item.type !== "image" &&
              item.type !== "stamp"
          );

          PSPDFKit?.defaultToolbarItems.map((item) => console.log(item));

          toolbarItems.splice(toolbarItems.length, 0, {
            type: "layout-config",
          });

          PSPDFKit.load({
            container,
            document: "/document.pdf",
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
            styleSheets: ["./my-pspdfkit.css"],
            layoutMode: PSPDFKit.LayoutMode.DOUBLE,
            toolbarPlacement: PSPDFKit.ToolbarPlacement.BOTTOM,
            toolbarItems: toolbarItems,
            theme: PSPDFKit.Theme.DARK,
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

  return <div>
    <CustomePage/>
  </div>;
};

export default PdfViewerPage;
