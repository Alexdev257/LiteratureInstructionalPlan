// --- File: src/components/admin/questions/RenderResults.tsx ---
"use client";
import type { GetAllPracticeQuestionResponseDTO } from "@/utils/type";
import { QuestionRow } from "./QuestionRow";

type RenderResultsProps = {
  questions: GetAllPracticeQuestionResponseDTO[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (q: GetAllPracticeQuestionResponseDTO) => void;
  onDelete: (q: GetAllPracticeQuestionResponseDTO) => void;
  onRestore: (q: GetAllPracticeQuestionResponseDTO) => void;
};

export function RenderResults({ 
  questions, 
  isLoading, 
  isError,
  onEdit,
  onDelete,
  onRestore
}: RenderResultsProps) {

  // [SỬA]: Xóa "Trạng Thái" và "Bài (Lesson)"
  const headers = [
    "Câu Hỏi",
    "Lớp",
    "Cấp Độ",
    "Người Tạo",
    "Ngày Tạo",
    "Hành Động",
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* [SỬA]: Cập nhật grid-cols thành 6 cột (4fr 1fr 1fr 2fr 2fr auto) */}
      <div className="grid grid-cols-[4fr_1fr_1fr_2fr_2fr_auto] gap-4 px-6 py-4 bg-gray-50 border-b text-xs font-medium text-muted-foreground uppercase items-center">
        <div>{headers[0]}</div>
        <div>{headers[1]}</div>
        <div>{headers[2]}</div>
        <div>{headers[3]}</div>
        <div>{headers[4]}</div>
        <div className="text-right">{headers[5]}</div>
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {isLoading && (
          <div className="p-6 text-center text-muted-foreground">
            Đang tải dữ liệu...
          </div>
        )}
        {isError && !isLoading && (
           <div className="p-6 text-center text-destructive">
             Đã có lỗi xảy ra khi tải danh sách câu hỏi.
           </div>
        )}
        {!isLoading && !isError && questions.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            Không tìm thấy câu hỏi nào phù hợp.
          </div>
        )}
        {!isLoading && !isError &&
          questions.map(q => (
            <QuestionRow 
              key={q.questionId} 
              question={q} 
              onEdit={onEdit}
              onDelete={onDelete}
              onRestore={onRestore}
            />
          ))}
      </div>
    </div>
  );
}