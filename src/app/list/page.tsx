"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PdfFile } from "@/model/pdffile";
import Link from "next/link";

const PDFList = () => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {files.map((file) => (
        <div
          key={file._id}
          className="p-4 flex flex-col items-center border rounded-md shadow-md"
        >
          <a
            href={`http://localhost:8000/files/${file.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center"
          >
            <h3 className="text-lg font-semibold">{file.pdf}</h3>
            <p className="text-sm text-gray-500">
              {new Date(file.createdAt).toLocaleDateString()}
            </p>
            <Link href={`/list/${file._id}`}>
              <button className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View PDF
              </button>
            </Link>
          </a>
        </div>
      ))}
    </div>
  );
};

export default PDFList;
