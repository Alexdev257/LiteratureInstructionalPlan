import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { useQuestionAdmin } from "@/hooks/useQuestionAdmin";
import type { QuestionFilters, AdminQuestion, QuestionStatus } from "@/utils/type";

import { QuestionToolbar } from "./QuestionToolbar";
import { QuestionTable } from "./QuestionTable";

const allMockQuestions: AdminQuestion[] = [
  { id: 'q1', questionText: 'Phân tích giá trị nhân đạo trong tác phẩm "Vợ nhặt"...', grade: 'Lớp 12', lesson: 'Bài 5: Vợ Nhặt', difficulty: 'Hard', status: 'Active', creatorName: 'NgaHT', createdAt: '2025-10-20', updatedAt: '2025-10-25' },
  { id: 'q2', questionText: 'Nêu ý nghĩa hình ảnh "bát cháo hành" trong Chí Phèo.', grade: 'Lớp 11', lesson: 'Bài 3: Chí Phèo', difficulty: 'Medium', status: 'Pending', creatorName: 'AnNV', createdAt: '2025-10-28', updatedAt: '2025-10-28' },
  { id: 'q3', questionText: 'Đọc hiểu đoạn thơ sau trong bài "Tây Tiến"...', grade: 'Lớp 12', lesson: 'Bài 1: Tây Tiến', difficulty: 'Medium', status: 'Active', creatorName: 'NgaHT', createdAt: '2025-09-15', updatedAt: '2025-09-20' },
  { id: 'q4', questionText: 'Trình bày cảm nhận về vẻ đẹp sông Hương qua "Ai đã đặt tên cho dòng sông?"', grade: 'Lớp 12', lesson: 'Bài 7: Ai đã đặt tên...', difficulty: 'Hard', status: 'Rejected', creatorName: 'MinhDQ', createdAt: '2025-10-01', updatedAt: '2025-10-05' },
  { id: 'q5', questionText: 'Xác định biện pháp tu từ trong câu ca dao...', grade: 'Lớp 10', lesson: 'Bài 2: Ca dao', difficulty: 'Easy', status: 'Active', creatorName: 'AnNV', createdAt: '2025-10-10', updatedAt: '2025-10-10' },
];

export default function QuestionManagementPage() {
  const [filters, setFilters] = useState<QuestionFilters>({
    page: 1,
    limit: 10,
    status: "All",
    search: "",
    grade: "All",
    lesson: "All", 
    difficulty: "All",
  });

  const isLoading = false;
  const isError = false;

  // Lọc Mock Data trên Client
  const questionsToDisplay = useMemo(() => {
    let filteredQuestions = allMockQuestions;

    if (filters.status && filters.status !== "All") {
      filteredQuestions = filteredQuestions.filter(q => q.status === filters.status);
    }
    if (filters.grade && filters.grade !== "All") {
       filteredQuestions = filteredQuestions.filter(q => q.grade === filters.grade);
    }
    if (filters.lesson && filters.lesson !== "All") { // Lọc theo lesson
       filteredQuestions = filteredQuestions.filter(q => q.lesson === filters.lesson);
    }
    if (filters.difficulty && filters.difficulty !== "All") {
       filteredQuestions = filteredQuestions.filter(q => q.difficulty === filters.difficulty);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredQuestions = filteredQuestions.filter(q =>
        q.questionText.toLowerCase().includes(searchTerm) ||
        q.creatorName.toLowerCase().includes(searchTerm) ||
        q.lesson.toLowerCase().includes(searchTerm) // Tìm trong tên bài
      );
    }
    return filteredQuestions;
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản Lý Câu Hỏi</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo Câu Hỏi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <QuestionToolbar filters={filters} setFilters={setFilters} />
        </CardHeader>
        <CardContent>
          <QuestionTable questions={questionsToDisplay} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}