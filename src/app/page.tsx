import { Footer } from "@/components/footer";
import { Heading } from "@/components/heading";
import { Heroes } from "@/components/heroes";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <div
        className="flex flex-col items-center justify-center
    md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 dark:bg-[#1F1F1F]"
      >
        <Navbar />
        <Heading />
        {/* <FileUpload/> */}
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
