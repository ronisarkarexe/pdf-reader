"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CloudUpload } from "lucide-react";
import axios from "axios";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const submitPdf = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:8000/upload-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setIsUploading(false);
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await submitPdf(selectedFile);
    }
  };

  const handleDivClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      await submitPdf(selectedFile);
    }
  };

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <motion.div
        className="text-sm sm:text-sm text-blue-500 w-84 h-58 bg-gray-50 py-8 mt-5 text-center border-dashed border-2 border-blue-500 cursor-pointer rounded-lg"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        onClick={handleDivClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div>
            <div className="flex items-center justify-center">
              <CloudUpload />
            </div>
            <h6>Uploading...</h6>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center">
              <CloudUpload />
            </div>
            <h6>Click, Or Drop your file here!</h6>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FileUploader;
