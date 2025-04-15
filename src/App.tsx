import { useState } from "react";
import Background from "./components/background";
import CaseCard from "./components/CaseCard";
import CaseOpening from "./components/CaseOpening";
import { CASE_ITEMS } from "./config/case.config";

export default function App() {
  const [isOpening, setIsOpening] = useState(false);
  return (
    <main className="flex flex-col items-center h-screen">
      <Background />
      <header className="w-full h-30 py-3 px-5">
        <h1 className="text-white text-2xl font-semibold text-shadow-sm text-shadow-black select-none">
          Предметы, которые могут быть в этом кейсе:
        </h1>
        <div className="w-full h-[1px] bg-zinc-600 mt-4" />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 px-10">
        {CASE_ITEMS.map((item) => (
          <CaseCard
            key={item.alt}
            alt={item.alt}
            img={item.img}
            name={item.name}
            rarity={item.rarity}
          />
        ))}
      </div>
      <div className="w-full flex flex-row items-center justify-end mt-auto p-10">
        <p className="text-xl select-none">
          У вас <span className="text-blue-500 font-bold">∞</span> ключей!
        </p>
        <div className="h-full w-[1px] bg-zinc-900 mx-3" />
        <button
          onClick={() => setIsOpening(true)}
          className="rounded-2xl border border-solid border-amber-300 px-8 py-5 text-4xl cursor-pointer hover:bg-amber-300/10 hover:border-amber-300/50 transition-all duration-200 ease-in-out text-white bg-amber-300/5 transform hover:scale-105"
        >
          ОТКРЫТЬ КЕЙС
        </button>
      </div>
      {isOpening && <CaseOpening onClose={() => setIsOpening(false)} />}
    </main>
  );
}
