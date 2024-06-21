"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PdfFile } from "@/model/pdffile";
import axios from "axios";
import ViewComponent from "./view/view_component";

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

  return (
    <div className="px-3 mb-10 md:px-10">
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
          No PDF list available!{" "}
        </motion.div>
      )}
    </div>
  );
};

export default ViewListFile;
