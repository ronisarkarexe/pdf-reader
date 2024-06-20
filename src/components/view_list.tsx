"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PdfFile } from "@/model/pdffile";
import axios from "axios";
import { FileText } from "lucide-react";
import { pdfName, timestamp } from "./utils";

const ViewListFile = (props: { isUpdate: boolean }) => {
  const [files, setFiles] = useState<PdfFile[]>([]);
  useEffect(() => {
    const getPdf = async () => {
      const result = await axios.get("http://localhost:8000/get-files");
      if (result) {
        setFiles(result.data.data);
      }
    };
    getPdf();
  }, [props.isUpdate]);

  console.log(files);

  return (
    <div className="px-10 mb-10">
      <motion.h6
        className="text-sm text-blue-500 font-bold"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
      >
        <span>List of PDF:-</span>
      </motion.h6>

      {files.length > 0 ? (
        files.map((file) => (
          <motion.div
            key={file._id}
            className="text-sm text-blue-500 ml-10 mr-10 mt-3 flex items-center justify-between border border-gray-300 px-6 py-3 rounded-md cursor-pointer"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ x: 10 }}
            transition={{ type: "spring", damping: 18, mass: 0.75 }}
          >
            <div className="flex gap-2">
              {" "}
              <FileText className="w-5 h-5" /> <h4> {pdfName(file.pdf)} </h4>{" "}
            </div>
            <h3>Created At: {timestamp(file.createdAt)}</h3>
          </motion.div>
        ))
      ) : (
        <motion.div
          className="text-sm text-blue-500"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
        ></motion.div>
      )}
    </div>
  );
};

export default ViewListFile;
