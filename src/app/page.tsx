import { Footer } from "@/components/footer";
import HeaderPage from "@/components/header";
import { Heading } from "@/components/heading";
import { Heroes } from "@/components/heroes";
import HomeComponent from "@/components/home_component";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <div
        className="flex flex-col items-center justify-center
    md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 dark:bg-[#1F1F1F]"
      >
        <Heading />
        {/* <FileUpload/> */}
        <Heroes />
      </div>
      <Footer />
    </div>
  );
}
