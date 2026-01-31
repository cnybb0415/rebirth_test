export type PrevoteCategoryId = "schedule" | "ratio" | "guide";

export type PrevoteCategory = {
  id: PrevoteCategoryId;
  label: string;
  description: string;
};

export const prevoteCategories: PrevoteCategory[] = [
  {
    id: "schedule",
    label: "사전투표 일정",
    description: "",
  },
  {
    id: "ratio",
    label: "음악방송 반영 비율 안내",
    description: "",
  },
  {
    id: "guide",
    label: "사전투표 가이드",
    description: "",
  },
];

export function getPrevoteCategory(id: string | undefined | null) {
  if (!id) return null;
  return prevoteCategories.find((category) => category.id === id) ?? null;
}
