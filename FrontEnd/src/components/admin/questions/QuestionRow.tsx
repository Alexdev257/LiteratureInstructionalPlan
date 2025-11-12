// --- File: src/components/admin/questions/QuestionRow.tsx ---
"use client";
import type { GetAllPracticeQuestionResponseDTO, QuestionStatus } from "@/utils/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Undo, ShieldAlert, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface QuestionRowProps {
  question: GetAllPracticeQuestionResponseDTO;
  onEdit: (q: GetAllPracticeQuestionResponseDTO) => void;
  onDelete: (q: GetAllPracticeQuestionResponseDTO) => void;
  onRestore: (q: GetAllPracticeQuestionResponseDTO) => void;
}

// Helper style Badge theo difficulty (từ BE) [cite: 8448-8455]
const difficultyMap: Record<string, { label: string; className: string }> = {
  "1": { label: "Dễ", className: "bg-blue-100 text-blue-800 border-blue-200" },
  "2": { label: "Trung bình", className: "bg-purple-100 text-purple-800 border-purple-200" },
  "3": { label: "Khó", className: "bg-pink-100 text-pink-800 border-pink-200" },
  "4": { label: "Rất khó", className: "bg-red-100 text-red-800 border-red-200" },
};

export function QuestionRow({ question, onEdit, onDelete, onRestore }: QuestionRowProps) {

  const truncateText = (text: string | null | undefined, maxLength: number = 80) => {
    if (!text) return "N/A";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch (e) { return dateString; }
  };
  
  // Dùng isDeleted từ API
  const isDeleted = question.isDeleted; 
  const difficulty = difficultyMap[question.difficulty ?? ""] ?? { label: "N/A", className: "bg-gray-100" };

  return (
    // [SỬA]: Cập nhật grid-cols (6 cột)
    <div className="grid grid-cols-[4fr_1fr_1fr_2fr_2fr_auto] gap-4 px-6 py-4 items-center text-sm">
      {/* Câu Hỏi */}
      <div className="font-medium truncate" title={question.content ?? ""}>
        {truncateText(question.content, 80)}
      </div>

      {/* Lớp */}
      <div className="text-muted-foreground">{question.gradeLevel?.name ?? "N/A"}</div>

      {/* Cấp Độ */}
      <div>
        <Badge variant="outline" className={`text-xs ${difficulty.className}`}>
          {difficulty.label}
        </Badge>
      </div>

      {/* [ĐÃ XÓA]: Cột "Trạng Thái" (Pending/Active) đã bị xóa */}

      {/* Người Tạo */}
      <div className="text-muted-foreground">{question.createdBy?.userName ?? "N/A"}</div>

      {/* Ngày Tạo */}
      <div className="text-muted-foreground">{formatDate(question.createdAt)}</div>
      
      {/* Hành Động */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            
            {/* [ĐÃ XÓA]: Nút Sửa (Edit) đã bị xóa */}
            
            {isDeleted ? (
              <DropdownMenuItem onClick={() => onRestore(question)} className="text-green-600">
                <Undo className="mr-2 h-4 w-4" />
                Khôi phục
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onDelete(question)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}