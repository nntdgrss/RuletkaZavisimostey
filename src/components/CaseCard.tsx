import { memo } from "react";
import { RARITY_COLOR, type RarityType } from "../config/case.config";

interface Props {
  img: string;
  alt: string;
  name: string;
  rarity: RarityType;
}

function CaseCard({ img, alt, name, rarity }: Props) {
  return (
    <div>
      <img
        src={img}
        alt={alt}
        style={{
          borderLeft: `7px solid ${RARITY_COLOR[rarity]}`,
          filter: "drop-shadow(0 0 0 transparent)",
          transition: "all 0.3s ease",
        }}
        className="transform hover:scale-110"
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = `drop-shadow(0 0 30px ${RARITY_COLOR[rarity]})`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "drop-shadow(0 0 0 transparent)";
        }}
      />
      <h1 className="text-xl mt-2 text-shadow-sm text-shadow-black">{name}</h1>
      <p
        style={{
          color: `${RARITY_COLOR[rarity]}`,
        }}
        className="font-bold text-shadow-sm text-shadow-black/10 "
      >
        {rarity}
      </p>
    </div>
  );
}

export default memo(CaseCard);
