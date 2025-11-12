"use client";
import type { GetAllExamResponseDTO } from "@/utils/type";
import { ExamRow } from "./ExamRow";

type RenderResultsProps = {
  exams: GetAllExamResponseDTO[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (exam: GetAllExamResponseDTO) => void;
  onDelete: (exam: GetAllExamResponseDTO) => void;
  onRestore: (exam: GetAllExamResponseDTO) => void;
};

export function RenderResults({ 
  exams, 
  isLoading, 
  isError,
  onEdit,
  onDelete,
  onRestore
}: RenderResultsProps) {
  const headers = ["Đề Thi", "Lớp", "Loại", "Cấp Độ", "Trạng Thái", "Người Tạo", "Ngày Tạo", "Hành Động"];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-gray-50 border-b text-xs font-medium text-muted-foreground uppercase items-center">
        <div>{headers[0]}</div>
        <div>{headers[1]}</div>
        <div>{headers[2]}</div>
        <div>{headers[3]}</div>
        <div>{headers[4]}</div>
        <div>{headers[5]}</div>
        <div>{headers[6]}</div>
        <div className="text-right">{headers[7]}</div>
      </div>
      {/* Body */}
      <div className="divide-y">
        {isLoading && <div className="p-6 text-center text-muted-foreground">Đang tải...</div>}
        {isError && !isLoading && <div className="p-6 text-center text-destructive">Lỗi tải dữ liệu.</div>}
        {!isLoading && !isError && exams.length === 0 && <div className="p-6 text-center text-muted-foreground">Không tìm thấy đề thi.</div>}
        {!isLoading && !isError && exams.map(e => (
          <ExamRow 
            key={e.examId} 
            exam={e} 
            onEdit={onEdit}
            onDelete={onDelete}
            onRestore={onRestore}
          />
        ))}
      </div>
    </div>
  );
}