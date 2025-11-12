import type { AdminQuestion } from "@/utils/type";
import { QuestionRow } from "./QuestionRow";

type QuestionTableProps = {
  questions: AdminQuestion[];
  isLoading: boolean;
};

export function QuestionTable({ questions, isLoading }: QuestionTableProps) {

  const headers = [
    "Câu Hỏi",
    "Lớp",
    "Bài",
    "Cấp Độ",
    "Trạng Thái",
    "Người Tạo",
    "Ngày Tạo",
    "Ngày Sửa",
    "Hành Động",
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[3fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-gray-50 border-b text-xs font-medium text-muted-foreground uppercase items-center">
        <div >{headers[0]}</div>
        <div >{headers[1]}</div>
        <div >{headers[2]}</div>
        <div >{headers[3]}</div>
        <div >{headers[4]}</div>
        <div >{headers[5]}</div>
        <div >{headers[6]}</div>
        <div >{headers[7]}</div>
        <div className="text-right">{headers[8]}</div>
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {isLoading && (
          <div className="p-6 text-center text-muted-foreground">
            Đang tải dữ liệu...
          </div>
        )}
        {!isLoading && questions.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            Không tìm thấy câu hỏi nào phù hợp.
          </div>
        )}
        {!isLoading &&
          questions.map(q => <QuestionRow key={q.id} question={q} />)}
      </div>
    </div>
  );
}