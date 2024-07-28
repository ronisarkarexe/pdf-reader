"use client";

import { PdfFile } from "@/model/pdffile";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const FileDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [file, setFiles] = useState<PdfFile | null>(null);
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLight, setIsLight] = useState<boolean>(true);

  useEffect(() => {
    const getPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pdf/${id}`);
        if (response.status === 200) {
          setFiles(response?.data?.file);
        } else {
          console.error("Error: Invalid response data");
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };
    getPdf();
  }, [id]);

  useEffect(() => {
    const loadPSPDFKit = async () => {
      const container = containerRef.current;
      if (container && typeof window !== "undefined") {
        try {
          const PSPDFKit = await import("pspdfkit");

          PSPDFKit?.unload(container);

          const customToolbarItems = [
            { type: "sidebar-layers", mediaQueries: ["all"] },
            { type: "pan", mediaQueries: ["all"] },
            { type: "note", mediaQueries: ["all"] },
            { type: "text", mediaQueries: ["all"] },
            { type: "export-pdf", mediaQueries: ["all"] },
            { type: "search", mediaQueries: ["all"] },
            { type: "highlighter", mediaQueries: ["all"] },
            { type: "text-highlighter", mediaQueries: ["all"] },
            { type: "ink-eraser", mediaQueries: ["all"] },
            {
              type: "layout-config",
              items: [{ type: "pager" }],
            },
          ];

          if (file && file.pdf) {
            await PSPDFKit.load({
              container,
              document: `http://localhost:8000/files/${file.pdf}`,
              baseUrl: `${window.location.protocol}//${window.location.host}/`,
              layoutMode: PSPDFKit.LayoutMode.DOUBLE,
              toolbarPlacement: PSPDFKit.ToolbarPlacement.BOTTOM,
              toolbarItems: customToolbarItems,
              theme: isLight ? PSPDFKit.Theme.LIGHT : PSPDFKit.Theme.DARK, 
            });
          } else {
            console.error("File not found or invalid URL");
          }
        } catch (error) {
          console.error("Error loading PSPDFKit:", error);
        }
      }
    };

    loadPSPDFKit();

    return () => {
      const unloadPSPDFKit = async () => {
        if (containerRef.current) {
          try {
            const PSPDFKit = await import("pspdfkit");
            PSPDFKit.unload(containerRef.current);
          } catch (error) {
            console.error("Error unloading PSPDFKit:", error);
          }
        }
      };

      unloadPSPDFKit();
    };
  }, [isToggle, file, isLight]);

  const handleThemeChange = () => {
    setIsLight(!isLight);
  };

  return (
    <div
      style={{
        backgroundColor: !isLight ? "#4D525D" : "#F6F8FA",
        height: "100vh",
      }}
    >
      <div className="flex items-center justify-between w-full p-1">
        <div>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={handleThemeChange}
              checked={!isLight} 
            />
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            className="toggle"
            onClick={() => setIsToggle(!isToggle)}
            defaultChecked
          />
        </div>
      </div>

      {!isToggle ? (
        <div ref={containerRef} style={{ height: "90vh" }} />
      ) : (
        <div>Hello</div>
      )}
    </div>
  );
};

export default FileDetails;
