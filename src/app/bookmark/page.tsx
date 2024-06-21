"use client";
import ViewComponent from "@/components/view/view_component";
import { PdfFile } from "@/model/pdffile";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BookMarkPage = () => {
  const [files, setFiles] = useState<PdfFile[]>([]);
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
    <div className="px-3 mb-10 md:px-10 mt-10 md:mt-5">
      <motion.h6
        className="text-sm text-blue-500 font-bold"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
      >
        <span>List of BookMark:-</span>
      </motion.h6>

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
