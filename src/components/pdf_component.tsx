"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PdfFile } from "@/model/pdffile";

const PdfComponent = () => {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState<PdfFile[]>([]);

  useEffect(() => {
    const getPdf = async () => {
      const result = await axios.get("http://localhost:8000/get-files");
      if (result) {
        setFiles(result.data.data);
      }
    };
    getPdf();
  }, []);

  const submitPdf = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:8000/upload-pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div>
      <form onSubmit={submitPdf}>
        <h3>Upload pdf.</h3>
        <input
          type="file"
          placeholder="Title"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PdfComponent;
