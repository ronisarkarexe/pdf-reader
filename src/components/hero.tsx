"use client";
import { motion } from "framer-motion";
import FileUploader from "./file_uploader";

export default function HeroSection() {
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-2/6 lg:items-center">
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

          <motion.p
            className="mt-4 sm:text-xl/relaxed text-sm text-gray-400"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", damping: 18, mass: 0.75, delay: 0.2 }}
          >
            PDF Reader is free open-source application, that help you read pdf
            like book!
          </motion.p>
          <FileUploader />
        </div>
      </div>
    </section>
  );
}
