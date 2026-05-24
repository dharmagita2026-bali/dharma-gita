export interface PrestigeRank {
  title: string;
  currentTierProgress: number;
  tierTarget: number;
  color: string;
}

export function calculatePrestige(totalExp: number): PrestigeRank {
  if (totalExp < 500) {
    return {
      title: "Pemain Pemula",
      currentTierProgress: totalExp,
      tierTarget: 500,
      color: "text-[#8D6E63]"
    };
  } else if (totalExp < 1500) {
    return {
      title: "Kesatria Kidung",
      currentTierProgress: totalExp - 500,
      tierTarget: 1000,
      color: "text-[#D4A017]"
    };
  } else {
    return {
      title: "Master Sekar Suci",
      currentTierProgress: 100, 
      tierTarget: 100,
      color: "text-[#2E7D32] font-black tracking-widest italic animate-pulse"
    };
  }
}