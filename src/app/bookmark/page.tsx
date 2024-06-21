"use client";
import ViewComponent from "@/components/view/view_component";
import { PdfFile } from "@/model/pdffile";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BookMarkPage = () => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getPdf = async () => {
      const result = await axios.get("http://localhost:8000/bookmarks");
      if (result) {
        setFiles(result.data.data);
      }
    };
    getPdf();
  }, []);

  return (
    <div className="px-3 mb-10 md:px-10 mt-5 md:mt-5">
      <motion.h6
        className="text-center text-blue-500 font-bold border-b border-gray-400"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
      >
        <span className="text-center text-2xl">Bookmark List</span>
      </motion.h6>
      <motion.div
        className="text-sm text-blue-500 font-bold "
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: 10 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
      >
        <div className="flex items-center justify-between mt-4">
          <span
            className="flex items-center gap-2 cursor-pointer bg-yellow-500 text-black"
            onClick={() => router.back()}
          >
            <MoveLeft className="h-4 w-4 md:h-5 md:w-5" />
            Back
          </span>
          <span></span>
        </div>
      </motion.div>

      {files.length > 0 ? (
        files.map((file) => (
          <div key={file._id}>
            <ViewComponent file={file} />
          </div>
        ))
      ) : (
        <motion.div
          className="text-sm text-blue-500"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
        >
          No BookMarked PDF available!{" "}
        </motion.div>
      )}
    </div>
  );
};

export default BookMarkPage;
