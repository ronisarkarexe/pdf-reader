"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PdfFile } from "@/model/pdffile";
import { pdfjs, Document, Page } from "react-pdf";
import { Bookmark, BookmarkCheck, MoveLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ViewPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [files, setFiles] = useState<PdfFile | null>(null);
  const [bookmarkUpdate, setBookmarkUpdate] = useState(false);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

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
  }, [id, bookmarkUpdate]);

  const updateBookmark = async (id: string, isBookmark: boolean) => {
    try {
      setBookmarkUpdate(true);
      const response = await axios.patch(
        `http://localhost:8000/bookmark/${id}`,
        { isBookmark }
      );
      console.log("Bookmark updated:", response.data);
      if (response.data) {
        setBookmarkUpdate(false);
      }
      return response.data;
    } catch (error: unknown) {
      console.log(error as unknown);
      throw error;
    }
  };

  if (!files) {
    return (
      <div className="text-center flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-max mx-3 md:mx-10 mt-5">
      <div className="flex items-center justify-between border border-blue-300 shadow-sm rounded-md px-2 md:px-4">
        <motion.div
          className="text-blue-500 flex items-center gap-2 border-blue-400 px-3 md:px-7 py-2 md:py-3 rounded-sm cursor-pointer"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ x: -10 }}
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          onClick={() => router.back()}
        >
          <MoveLeft className="h-5 w-5" /> Back
        </motion.div>

        <div className="ml-5 cursor-pointer text-blue-500">
          {!files?.isBookmark ? (
            <Bookmark
              className="h-5 w-5"
              onClick={() => updateBookmark(id, true)}
            />
          ) : (
            <BookmarkCheck onClick={() => updateBookmark(id, false)} />
          )}
        </div>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <motion.div
        className="mb-4 md:mb-10 flex items-center justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
      >
        <Document
          file={`http://localhost:8000/files/${files.pdf}`}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </motion.div>
    </div>
  );
};

export default ViewPage;
