export const RARITY_TYPE = {
  RARE: "Редкое",
  EPIC: "Эпическое",
  LEGENDARY: "Легендарное",
  MYTHIC: "Мифическое",
} as const;

export type RarityType = (typeof RARITY_TYPE)[keyof typeof RARITY_TYPE];
export const RARITY_TYPE_ENUM = Object.freeze({
  RARE: "Редкое",
  EPIC: "Эпическое",
  LEGENDARY: "Легендарное",
  MYTHIC: "Мифическое",
} as const) as {
  RARE: "Редкое";
  EPIC: "Эпическое";
  LEGENDARY: "Легендарное";
  MYTHIC: "Мифическое";
};

export const RARITY_COLOR: { readonly [K in RarityType]: string } = {
  [RARITY_TYPE.RARE]: "#4169E1",
  [RARITY_TYPE.EPIC]: "#9932CC",
  [RARITY_TYPE.LEGENDARY]: "#FFFF00",
  [RARITY_TYPE.MYTHIC]: "#8B0000",
} as const;

export const RARITY_CHANCES: { readonly [K in RarityType]: number } = {
  [RARITY_TYPE.RARE]: 0.5, // 50%
  [RARITY_TYPE.EPIC]: 0.3, // 30%
  [RARITY_TYPE.LEGENDARY]: 0.15, // 15%
  [RARITY_TYPE.MYTHIC]: 0.05, // 5%
} as const;

export interface CaseItem {
  img: string;
  alt: string;
  name: string;
  rarity: RarityType;
}

export const CASE_ITEMS: CaseItem[] = [
  {
    alt: "besplodie",
    img: "besplodie.jpg",
    name: "Бесплодие",
    rarity: RARITY_TYPE.RARE,
  },
  {
    alt: "amputasia",
    img: "ампутация.webp",
    name: "Ампутация",
    rarity: RARITY_TYPE.RARE,
  },
  {
    alt: "zavisimost",
    img: "зависимость.webp",
    name: "Зависимость",
    rarity: RARITY_TYPE.RARE,
  },
  {
    alt: "die",
    img: "мучительная-смерть.webp",
    name: "Мучительная смерть",
    rarity: RARITY_TYPE.RARE,
  },
  {
    alt: "starenie",
    img: "преждевременное-старение.webp",
    name: "Преждевременное старение",
    rarity: RARITY_TYPE.EPIC,
  },
  {
    alt: "oslojneniya",
    img: "осложнения.webp",
    name: "Осложнения",
    rarity: RARITY_TYPE.EPIC,
  },
  {
    alt: "rakgorla",
    img: "ракгорла.webp",
    name: "Рак горла",
    rarity: RARITY_TYPE.LEGENDARY,
  },
  {
    alt: "mertvi",
    img: "мертворождение.webp",
    name: "Мертворождение",
    rarity: RARITY_TYPE.MYTHIC,
  },
  {
    alt: "impotensia",
    img: "impotensia.webp",
    name: "Импотенция",
    rarity: RARITY_TYPE.MYTHIC,
  },
];
