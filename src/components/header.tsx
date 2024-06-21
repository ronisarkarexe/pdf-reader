"use client";
import { motion } from "framer-motion";
import { Notebook } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-5 py-3 text-blue-500 border-b border-blue-500 shadow-md">
      <motion.div
        className="flex items-center"
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: -1000 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1>PDF Reader</h1>
      </motion.div>

      <Link href={"/bookmark"}>
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          transition={{ type: "spring", damping: 18, mass: 0.75 }}
          initial={{ opacity: 0, x: -1000 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Notebook />
          <h1 className="hidden md:block">Bookmarks</h1>
        </motion.div>
      </Link>

      <motion.div
        className="flex items-center"
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href="/profile">
          <motion.div
            className="flex items-center justify-cente"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="bg-blue-400 px-6 py-1 rounded-lg text-white">
              GitHub
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};
export default Header;
