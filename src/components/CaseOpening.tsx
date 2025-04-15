import { useCallback, useEffect, useState } from "react";
import {
  CASE_ITEMS,
  RARITY_CHANCES,
  RARITY_COLOR,
  type CaseItem,
  type RarityType,
} from "../config/case.config";
import Background from "./background";
import { sounds } from "./sounds";

interface Props {
  onClose: () => void;
}

// Функция для генерации случайного предмета с учетом шансов
function getRandomItem(): CaseItem {
  const rand = Math.random();
  let sum = 0;
  let selectedRarity: RarityType | null = null;

  // Определяем выпавшую редкость на основе шансов
  for (const [rarity, chance] of Object.entries(RARITY_CHANCES)) {
    sum += chance;
    if (rand <= sum && !selectedRarity) {
      selectedRarity = rarity as RarityType;
    }
  }

  // Фильтруем предметы выпавшей редкости
  const possibleItems = CASE_ITEMS.filter(
    (item) => item.rarity === selectedRarity
  );
  // Выбираем случайный предмет из отфильтрованных
  return possibleItems[Math.floor(Math.random() * possibleItems.length)];
}

// Генерируем случайный массив предметов для прокрутки
function generateSpinItems(): CaseItem[] {
  const items: CaseItem[] = [];
  const totalItems = 50; // Больше предметов для более плавной анимации

  // Добавляем предметы разной редкости с разными вероятностями
  for (let i = 0; i < totalItems; i++) {
    const rand = Math.random();
    let rarity: RarityType;

    if (rand < 0.5) rarity = "Редкое";
    else if (rand < 0.8) rarity = "Эпическое";
    else if (rand < 0.95) rarity = "Легендарное";
    else rarity = "Мифическое";

    const possibleItems = CASE_ITEMS.filter((item) => item.rarity === rarity);
    items.push(possibleItems[Math.floor(Math.random() * possibleItems.length)]);
  }
  return items;
}

export default function CaseOpening({ onClose }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [spinItems, setSpinItems] = useState<CaseItem[]>([]);
  const [winningItem, setWinningItem] = useState<CaseItem | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const SPIN_DURATION = 6800; // 6.8 секунд для прокрутки

  const startSpin = useCallback(() => {
    if (isSoundEnabled) {
      sounds.playSpinning();
    }
    const items = generateSpinItems();
    const winner = getRandomItem();
    const centerIndex = Math.floor(items.length / 2);

    items[centerIndex] = winner;
    setSpinItems(items);
    setWinningItem(winner);
    setSpinning(true);

    // Останавливаем звук прокрутки за 1.2 секунды до конца
    setTimeout(() => {
      if (isSoundEnabled) {
        sounds.stopSpinning();
      }
    }, SPIN_DURATION - 1200);

    // За 0.8 секунды до конца начинаем замедление
    setTimeout(() => {
      if (isSoundEnabled) {
        sounds.playWin();
      }
    }, SPIN_DURATION - 800);

    // Через 6.8 секунд останавливаем анимацию
    setTimeout(() => {
      setSpinning(false);
      const winningElement = document.querySelector(
        `[data-index="${centerIndex}"]`
      );
      if (winningElement) {
        winningElement.classList.add("animate-glow");
      }
    }, SPIN_DURATION);

    // Показываем результат через секунду после остановки
    setTimeout(() => {
      setShowResult(true);
    }, SPIN_DURATION);
  }, [isSoundEnabled]);

  useEffect(() => {
    startSpin();
  }, [startSpin]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute top-5 right-5 z-50">
        <button
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          className="bg-zinc-800/50 p-3 rounded-full hover:bg-zinc-700/50 transition-colors"
        >
          {isSoundEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
              <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
            </svg>
          )}
        </button>
      </div>
      <Background />
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {showResult ? (
          <div className="bg-black/80 p-8 rounded-lg flex flex-col items-center">
            <img
              src={winningItem?.img}
              alt={winningItem?.alt}
              className="w-64 h-64 object-contain mb-4"
              style={{
                borderLeft: `7px solid ${
                  RARITY_COLOR[winningItem?.rarity || "Редкое"]
                }`,
              }}
            />
            <h2 className="text-3xl text-white mb-2">{winningItem?.name}</h2>
            <p
              className="text-xl mb-4"
              style={{ color: RARITY_COLOR[winningItem?.rarity || "Редкое"] }}
            >
              {winningItem?.rarity}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-solid border-amber-300 text-white rounded hover:bg-amber-50/10 transition-colors"
            >
              Забрать приз
            </button>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden h-64">
            {/* Затемнение по краям */}
            <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-black to-transparent z-20" />
            <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-black to-transparent z-20" />

            {/* Индикатор выбора (лупа) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-48 border-4 border-yellow-400 rounded-full z-50 pointer-events-none shadow-[0_0_15px_rgba(255,255,0,0.5)]" />

            {/* Контейнер с предметами */}
            <div
              className="flex items-center absolute left-1/2 h-full"
              style={{
                transform: `translateX(${
                  spinning
                    ? -(Math.floor(spinItems.length / 2) * 200 + 100)
                    : 800
                }px)`,
                transition: spinning
                  ? "transform 6.8s cubic-bezier(0.22, 0.61, 0.36, 1)"
                  : "transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
              }}
            >
              {spinItems.map((item, index) => (
                <div
                  key={index}
                  data-index={index}
                  className="w-48 h-48 flex-shrink-0 mx-1 bg-black/50 flex items-center justify-center relative group"
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className={`w-40 h-40 object-contain transition-transform duration-300 ${
                      index === Math.floor(spinItems.length / 2) && !spinning
                        ? "scale-110"
                        : ""
                    }`}
                    style={{
                      borderLeft: `7px solid ${RARITY_COLOR[item.rarity]}`,
                    }}
                  />
                  <div
                    className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                      index === Math.floor(spinItems.length / 2) && !spinning
                        ? "opacity-100 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
