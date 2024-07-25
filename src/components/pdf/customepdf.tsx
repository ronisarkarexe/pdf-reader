"use client";
import { useEffect, useRef, useState } from "react";

const CustomePage: React.FC = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container && typeof window !== "undefined") {
      import("pspdfkit")
        .then((PSPDFKit) => {
          PSPDFKit?.unload(container);

          PSPDFKit?.defaultToolbarItems.map((item) => console.log(item));

          const customToolbarItems = [
            {
              type: "sidebar-layers",
              mediaQueries: ["all"],
            },
            {
              type: "pan",
              mediaQueries: ["all"],
            },
            {
              type: "note",
              mediaQueries: ["all"],
            },
            {
              type: "text",
              mediaQueries: ["all"],
            },
            {
              type: "export-pdf",
              mediaQueries: ["all"],
            },
            {
              type: "search",
              mediaQueries: ["all"],
            },
            {
              type: "highlighter",
              mediaQueries: ["all"],
            },
            {
              type: "text-highlighter",
              mediaQueries: ["all"],
            },
            {
              type: "ink-eraser",
              mediaQueries: ["all"],
            },
            {
              type: "layout-config",
              items: [
                {
                  type: "pager",
                },
              ],
            },
          ];

          PSPDFKit.load({
            container,
            document: "/PSPDFKit_LightTheme.pdf",
            baseUrl: `${window.location.protocol}//${window.location.host}/`,
            layoutMode: PSPDFKit.LayoutMode.DOUBLE,
            toolbarPlacement: PSPDFKit.ToolbarPlacement.BOTTOM,
            toolbarItems: customToolbarItems,
            theme: PSPDFKit.Theme.LIGHT,
          })
            .then((instance) => {
              instance.setToolbarItems(customToolbarItems);
              console.info("PSPDFKit loaded", instance);
            })
            .catch((error) => {
              console.error("Error", error);
            });
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }

    return () => {
      if (container) {
        import("pspdfkit")
          .then((PSPDFKit) => {
            PSPDFKit.unload(container);
          })
          .catch((error) => {
            console.error("Error", error);
          });
      }
    };
  }, [isToggle]);

  return (
    <div style={{ backgroundColor: "#F6F8FA", height: "100vh" }}>
      <div className="flex items-end justify-end w-full p-3">
        <input
          type="checkbox"
          className="toggle"
          onClick={() => setIsToggle(!isToggle)}
          defaultChecked
        />
      </div>

      {!isToggle ? (
        <div ref={containerRef} style={{ height: "92vh" }} />
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
};

export default CustomePage;
