import { PdfFile } from "@/model/pdffile";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { pdfName, timestamp } from "../utils";

const ViewComponent = (props: { file: PdfFile }) => {
  return (
    <Link href={"/view/" + props.file._id}>
      <motion.div
        key={props.file._id}
        className="text-sm text-blue-500 ml-10 mr-10 mt-3 flex items-center justify-between border border-gray-300 px-6 py-3 rounded-md cursor-pointer"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ x: 10 }}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
      >
        <div className="flex gap-2">
          {" "}
          <FileText className="w-5 h-5" /> <h4> {pdfName(props.file.pdf)} </h4>{" "}
        </div>
        <h3>Created At: {timestamp(props.file.createdAt)}</h3>
      </motion.div>
    </Link>
  );
};

export default ViewComponent;
