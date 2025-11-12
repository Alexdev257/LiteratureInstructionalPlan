
export const QuestionTypeMap = {
  "1": { label: "Nhiều đáp án", color: "bg-blue-500", icon: "CheckSquare" },
  "2": { label: "Một đáp án", color: "bg-indigo-500", icon: "Circle" },
  "3": { label: "Tự luận", color: "bg-green-500", icon: "FileText" },
} as const;

export const DifficultyMap = {
  "1": { label: "Dễ", color: "bg-green-100 text-green-800 border-green-300" },
  "2": { label: "Trung bình", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  "3": { label: "Khó", color: "bg-red-100 text-red-800 border-red-300" },
  "4": { label: "Rất khó", color: "bg-purple-100 text-purple-800 border-purple-300" },
} as const;