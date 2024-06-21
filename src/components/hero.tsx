"use client";
import { motion } from "framer-motion";
import FileUploader from "./file_uploader";
import { ShieldCheck, TriangleAlert } from "lucide-react";

export default function HeroSection(props: {
  setIsUpdate: (value: boolean) => void;
}) {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-1/5 md:lg:h-2/6 lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <motion.h1
            className="text-3xl font-extrabold sm:text-5xl text-blue-500"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 18, mass: 0.75 }}
          >
            Free Unlimited
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              PDF Reader.{" "}
            </strong>
          </motion.h1>

          <motion.span
            className="mt-4 sm:text-xl/relaxed text-gray-400 text-base"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 18, mass: 0.75, delay: 0.2 }}
          >
            PDF Reader is a free, open-source application designed to enhance
            your reading experience with PDF documents!
          </motion.span>
          <FileUploader setIsUpdate={props.setIsUpdate} />

          <div className="flex items-center justify-between flex-wrap">
            <motion.div
              className="flex items-center gap-2 mt-2"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", damping: 18, mass: 0.75 }}
            >
              <TriangleAlert className="h-4 w-4 text-red-600" />{" "}
              <span className="text-xs text-gray-400">
                {" "}
                PDF name should not have space: Test file.pdf
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 mt-2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", damping: 18, mass: 0.75 }}
            >
              <ShieldCheck className="h-4 w-4 text-blue-600" />{" "}
              <span className="text-xs text-gray-400">
                {" "}
                PDF name: Test_file.pdf
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
