import { useState } from "react";
import Header from "@/components/Header";
import BookBinder from "@/components/BookBinder";
import DoodleCursor from "@/components/DoodleCursor";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);

  // Map header navigations directly to book spreads
  // Guard: only navigate if logbook has been unlocked via the key
  const handleNavigate = (target: "profile" | "archives" | "contact") => {
    if (sessionStorage.getItem("logbook_unlocked") !== "true") return; // key not used yet
    setIsBookOpen(true);
    if (target === "profile") {
      setCurrentPage(0);
    } else if (target === "archives") {
      setCurrentPage(2);
    } else if (target === "contact") {
      setCurrentPage(5);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-neutral-950 to-[#030202] overflow-x-hidden flex flex-col justify-between py-4">
      <DoodleCursor />
      
      {/* Global Header linked to page transitions */}
      <Header onNavigate={handleNavigate} />
      
      {/* Center binder workspace */}
      <main className="flex-1 flex items-center justify-center relative w-full z-10 my-4">
        <BookBinder
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isBookOpen={isBookOpen}
          setIsBookOpen={setIsBookOpen}
        />
      </main>

      {/* Retro handwritten signature footer */}
      <footer className="text-center font-hand-kalam text-xs text-cream-light/40 py-4 select-none uppercase tracking-wider">
        late night builds & curious ideas · © 2026 Jenish J
      </footer>
    </div>
  );
};

export default Index;
