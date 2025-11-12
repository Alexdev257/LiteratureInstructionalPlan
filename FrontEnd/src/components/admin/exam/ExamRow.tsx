"use client";
import type { GetAllExamResponseDTO, ExamAdminStatus } from "@/utils/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Undo, ShieldAlert, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface ExamRowProps {
  exam: GetAllExamResponseDTO;
  onEdit: (exam: GetAllExamResponseDTO) => void;
  onDelete: (exam: GetAllExamResponseDTO) => void;
  onRestore: (exam: GetAllExamResponseDTO) => void;
}

// Giả định (API DTO không có)
const statusMap: Record<string, { label: ExamAdminStatus, className: string }> = {
  "e1": { label: "Active", className: "bg-green-100 text-green-800 border-green-200" },
  "e2": { label: "Pending", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  "e3": { label: "Active", className: "bg-green-100 text-green-800 border-green-200" },
  "e4": { label: "Rejected", className: "bg-red-100 text-red-800 border-red-200" },
};

// Giả định (API DTO không có)
const difficultyMap: Record<string, { label: string, className: string }> = {
  "e1": { label: "Medium", className: "bg-purple-100 text-purple-800 border-purple-200" },
  "e2": { label: "Hard", className: "bg-pink-100 text-pink-800 border-pink-200" },
  "e3": { label: "Hard", className: "bg-pink-100 text-pink-800 border-pink-200" },
  "e4": { label: "Easy", className: "bg-blue-100 text-blue-800 border-blue-200" },
};

export function ExamRow({ exam, onEdit, onDelete, onRestore }: ExamRowProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch { return dateString; }
  };

  // [LƯU Ý]: 'difficulty' và 'status' không có trong GetAllExamResponseDTO.
  // Tôi đang dùng mock tạm dựa trên ID. API cần cập nhật để trả về các trường này.
  const difficulty = difficultyMap[exam.examId.toString()] ?? { label: "N/A", className: "bg-gray-100" };
  const statusInfo = statusMap[exam.examId.toString()] ?? { label: "Pending", className: "bg-gray-100" };
  const isDeleted = exam.isDeleted;

  return (
    <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center text-sm">
      {/* Đề Thi */}
      <div className="font-medium truncate" title={exam.title ?? ""}>
        {exam.title ?? "N/A"}
      </div>
      {/* Lớp */}
      <div className="text-muted-foreground">{exam.gradeLevel?.name ?? "N/A"}</div>
      {/* Loại */}
      <div className="text-muted-foreground">{exam.examType?.name ?? "N/A"}</div>
      {/* Cấp Độ */}
      <div>
        <Badge variant="outline" className={`text-xs ${difficulty.className}`}>
          {difficulty.label}
        </Badge>
      </div>
      {/* Trạng Thái */}
      <div>
         {isDeleted ? (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              <ShieldAlert className="mr-1 h-3 w-3" /> Đã xóa
            </Badge>
         ) : (
            <Badge variant="outline" className={`text-xs ${statusInfo.className}`}>
              {statusInfo.label}
            </Badge>
         )}
      </div>
      {/* Người Tạo */}
      <div className="text-muted-foreground">{exam.createdBy?.userName ?? "N/A"}</div>
      {/* Ngày Tạo */}
      <div className="text-muted-foreground">{formatDate(exam.createdAt)}</div>
      {/* Hành Động */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(exam)}><Edit className="mr-2 h-4 w-4" /> Sửa</DropdownMenuItem>
            {isDeleted ? (
              <DropdownMenuItem onClick={() => onRestore(exam)} className="text-green-600">
                <Undo className="mr-2 h-4 w-4" /> Khôi phục
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onDelete(exam)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Xóa
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}