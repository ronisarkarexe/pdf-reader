"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PdfFile } from "@/model/pdffile";
import { pdfjs } from "react-pdf";
import { Editor } from "reactjs-editor";
import * as cheerio from "cheerio";
import { Bookmark, BookmarkCheck, MoveLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ViewPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();

  const [file, setFiles] = useState<PdfFile | null>(null);
  const [fileLink, setFileLink] = useState<string>("");
  const [context, setContext] = useState("");
  const [contextTitle, setContextTitle] = useState("");
  const [bookmarkUpdate, setBookmarkUpdate] = useState(false);

  useEffect(() => {
    const getPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pdf/${id}`);
        if (response.status === 200) {
          const { title, paragraphs } = parseHtmlContent(response?.data?.data);
          setFiles(response?.data?.file);
          setContextTitle(title);
          setContext(paragraphs);
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

  const parseHtmlContent = (html: string) => {
    const $ = cheerio.load(html);
    const title = $("title").text();
    const paragraphs = $("body p")
      .map((_, elem) => `<p>${$(elem).html()}</p>`)
      .get()
      .join("");
    return { title, paragraphs };
  };

  if (!contextTitle || !context) {
    return (
      <div className="text-center flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-max mx-10 mt-5">
      <div className="flex items-center justify-between">
        <motion.div
          className="text-blue-500 flex items-center gap-2 border-blue-400 px-7 py-3 rounded-sm cursor-pointer"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ x: -10 }}
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          onClick={() => router.back()}
        >
          <MoveLeft className="h-5 w-5" /> Back
        </motion.div>

        <div className="ml-5 cursor-pointer text-blue-500">
          {!file?.isBookmark ? (
            <Bookmark
              className="h-5 w-5"
              onClick={() => updateBookmark(id, true)}
            />
          ) : (
            <BookmarkCheck onClick={() => updateBookmark(id, false)} />
          )}
        </div>
      </div>

      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
      >
        <Editor
          htmlContent={`
        <main className="p-5 bg-gray-300 rounded-md mt-5">
    <aside>
    <h1 className="text-center mt-5 mb-1">${contextTitle} </h1>
    <h6 className="text-center text-sm mb-3"> By ${contextTitle} </h6>
    <div>${context}</div>
    </aside>
        </main>
      `}
        />
      </motion.div>
    </div>
  );
};

export default ViewPage;
