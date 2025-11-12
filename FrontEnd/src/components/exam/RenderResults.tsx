"use client";

import type { ExamQuery, Question } from "@/utils/type";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  GraduationCap,
  Star,
  Target,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "@tanstack/react-router";
import { useExam } from "@/hooks/useExam";
import { BasePagination } from "../layout/base/pagination";

interface Props {
  filters: ExamQuery;
  onFiltersChange: (filters: Partial<ExamQuery>) => void;
}

const RenderResults = ({ filters, onFiltersChange }: Props) => {
  const router = useRouter();
  const { useGetExam } = useExam();
  const { data, isLoading, isError } = useGetExam(filters);

  const exams = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalItems || 0;
  const currentPage = filters.PageNumber || 1;
  const pageSize = filters.PageSize || 10;

  const handlePageChange = (page: number) => {
    onFiltersChange({ PageNumber: page });
  };

  const handleTakeExam = (examId: number) => {
    router.navigate({
      to: "/exam/$id",
      params: { id: examId.toString() },
    });
  };

  const getDifficultyColor = (difficulty?: string) => {
    const d = difficulty?.toString().toLowerCase();
    switch (d) {
      case "1":
      case "easy":
        return "bg-green-100 text-green-800 border-green-300";
      case "2":
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "3":
      case "hard":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getDifficultyText = (difficulty?: string) => {
    const d = difficulty?.toString();
    switch (d) {
      case "1":
        return "Dễ";
      case "2":
        return "Trung bình";
      case "3":
        return "Khó";
      default:
        return "Chưa xác định";
    }
  };
  // Lấy thông tin từ câu hỏi đầu tiên (vì matrix không có trong response)
  const getMatrixInfo = (questions: Question[]) => {
    if (!questions || questions.length === 0) {
      return { difficulty: null, questionType: null };
    }
    const firstQuestion = questions[0];
    return {
      difficulty: firstQuestion.difficulty,
      questionType: firstQuestion.questionType,
    };
  };

  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted/30 rounded mb-4"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || exams.length === 0) {
    return (
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl text-center py-12">
          <p className="text-muted-foreground text-lg">Không tìm thấy đề thi nào.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">
              Kết quả ({exams.length} đề thi)
            </h2>
          </div>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => {
            const { difficulty } = getMatrixInfo(exam.questions);
            const questionCount = exam.questions?.length || 0;

            return (
              <Card
                key={exam.examId}
                className="group hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-secondary/30 overflow-hidden bg-gradient-to-br from-background to-secondary/5"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                    >
                      <GraduationCap className="w-3 h-3 mr-1" />
                      {exam.gradeLevel?.name || "Chưa xác định"}
                    </Badge>
                    <Badge
                      className={`${getDifficultyColor(difficulty ?? undefined)} border`}
                    >
                      <Target className="w-3 h-3 mr-1" />
                      {getDifficultyText(difficulty ?? undefined)}
                    </Badge>
                  </div>

                  <Badge
                    variant="secondary"
                    className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20"
                  >
                    <BookOpen className="w-3 h-3 mr-1" />
                    {exam.examType?.name || "Chưa xác định"}
                  </Badge>

                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1 mt-3">
                    {exam.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {exam.description || "Không có mô tả."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-6 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">{exam.durationMinutes} phút</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-secondary" />
                      <span className="font-medium"> 0 lượt thi</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-accent" />
                      <span className="font-medium">{questionCount} câu hỏi</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                      <span className="font-medium">10/10</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleTakeExam(exam.examId)}
                    className="w-full group-hover:shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90"
                  >
                    Xem đề thi
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <BasePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default RenderResults;