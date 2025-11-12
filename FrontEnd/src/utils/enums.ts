// src/utils/enums.ts
export const QuestionTypeMap = {
  "1": { 
    label: "Nhiều đáp án", 
    color: "bg-primary", 
    light: "bg-primary/10 border-primary/20 text-primary",
    icon: "CheckSquare"
  },
  "2": { 
    label: "Một đáp án", 
    color: "bg-secondary", 
    light: "bg-secondary/10 border-secondary/20 text-secondary",
    icon: "Circle"
  },
  "3": { 
    label: "Tự luận", 
    color: "bg-accent", 
    light: "bg-accent/10 border-accent/20 text-accent",
    icon: "FileText"
  },
} as const;

export const DifficultyMap = {
  "1": { label: "Dễ", color: "bg-green-100 text-green-800 border-green-300" },
  "2": { label: "Trung bình", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  "3": { label: "Khó", color: "bg-orange-100 text-orange-800 border-orange-300" },
  "4": { label: "Rất khó", color: "bg-red-100 text-red-800 border-red-300" },
} as const;