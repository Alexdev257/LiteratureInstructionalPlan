"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, CheckCircle2, FileText, AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useQuestion } from "@/hooks/useQuestion";
import { useExamStore } from "@/stores/examStore";
import type { QuestionQuery } from "@/utils/type";
import { BaseHeader } from "@/components/layout/base/header";
import { BasePagination } from "@/components/layout/base/pagination";
import SearchFilter from "../../question/_components/SearchFilter";


const DEFAULT_FILTERS: QuestionQuery = {
  PageNumber: 1,
  PageSize: 20,
  Search: "",
  QuestionType: undefined,
  GradeLevelId: undefined,
  Difficulty: undefined,
  IsShowAnswer: true,
  IsShowCorrectAnswer: true,
  IsAdmin: false,
};

export default function SelectQuestionPage() {
  const router = useRouter();
  const { useGetQuestions } = useQuestion();
  const { examData, setQuestionIds, setCurrentStep } = useExamStore();

  const [filters, setFilters] = useState<QuestionQuery>(DEFAULT_FILTERS);
  const [selectedIds, setSelectedIds] = useState<number[]>(examData.questionIds);

  const { data, isLoading, isError } = useGetQuestions(filters);
  const questions = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalItems || 0;

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  const handleToggleQuestion = (questionId: number) => {
    setSelectedIds((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAll = () => {
    const allIds = questions.map((q) => q.questionId);
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    
    if (allSelected) {
      setSelectedIds(selectedIds.filter((id) => !allIds.includes(id)));
    } else {
      setSelectedIds([...new Set([...selectedIds, ...allIds])]);
    }
  };

  const handleNext = () => {
    setQuestionIds(selectedIds);
    router.navigate({ to: "/teacher/exams/review" });
  };

  const handleBack = () => {
    setQuestionIds(selectedIds);
    router.navigate({ to: "/teacher/exams/select-matrix" });
  };

  const handleFiltersChange = (newFilters: Partial<QuestionQuery>) => {
    setFilters({ ...filters, ...newFilters, PageNumber: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, PageNumber: page });
  };

  const getQuestionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      "1": "Nhiều đáp án",
      "2": "Một đáp án",
      "3": "Tự luận",
    };
    return types[type] || "";
  };

  const getQuestionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "1": "bg-blue-100 text-blue-800 border-blue-200",
      "2": "bg-green-100 text-green-800 border-green-200",
      "3": "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getDifficultyLabel = (level: string) => {
    const labels: Record<string, string> = {
      "1": "Dễ",
      "2": "Trung bình",
      "3": "Khó",
      "4": "Rất khó",
    };
    return labels[level] || "";
  };

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      "1": "bg-green-100 text-green-800 border-green-200",
      "2": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "3": "bg-orange-100 text-orange-800 border-orange-200",
      "4": "bg-red-100 text-red-800 border-red-200",
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const currentPageSelected = questions.filter((q) =>
    selectedIds.includes(q.questionId)
  ).length;
  const allCurrentPageSelected =
    questions.length > 0 && currentPageSelected === questions.length;

  return (
    <div className="space-y-6 p-6">
      <BaseHeader
        title="Tạo đề thi mới"
        description="Bước 2: Chọn các câu hỏi cho đề thi"
      />

      {/* Progress Steps */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-muted-foreground">Chọn Ma trận</p>
                <p className="text-xs text-muted-foreground">Hoàn thành</p>
              </div>
            </div>
            <div className="flex-1 h-1 bg-green-500 mx-4 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">
                2
              </div>
              <div>
                <p className="font-semibold text-sm">Chọn câu hỏi</p>
                <p className="text-xs text-muted-foreground">{selectedIds.length} câu đã chọn</p>
              </div>
            </div>
            <div className="flex-1 h-1 bg-muted mx-4 rounded-full" />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-sm text-muted-foreground">Hoàn tất</p>
                <p className="text-xs text-muted-foreground">Xác nhận & tạo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <SearchFilter
            queryParams={filters}
            onParamsChange={handleFiltersChange}
          />
        </CardContent>
      </Card>

      {isLoading && (
        <Card className="border-border/50">
          <CardContent className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">Đang tải câu hỏi...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {isError && (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-destructive/10 rounded-full p-6 mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
            <p className="text-muted-foreground text-center">Không thể tải danh sách câu hỏi</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && questions.length > 0 && (
        <>
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Tìm thấy <span className="font-semibold text-foreground">{totalItems}</span> câu hỏi
              </p>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Đã chọn: {selectedIds.length} câu
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
            >
              <Checkbox
                checked={allCurrentPageSelected}
                className="mr-2"
              />
              {allCurrentPageSelected ? "Bỏ chọn" : "Chọn"} trang này
            </Button>
          </div>

          {/* Questions Accordion */}
          <Accordion type="single" collapsible className="space-y-3">
            {questions.map((question, index) => {
              const isSelected = selectedIds.includes(question.questionId);
              return (
                <Card
                  key={question.questionId}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  <AccordionItem value={`question-${question.questionId}`} className="border-0">
                    <div className="flex items-start gap-4 p-4">
                      <Checkbox
                        id={`question-${question.questionId}`}
                        checked={isSelected}
                        onCheckedChange={() => handleToggleQuestion(question.questionId)}
                        className="mt-2"
                      />
                      <div className="flex-1 min-w-0">
                        <AccordionTrigger className="hover:no-underline py-0">
                          <div className="flex items-start gap-3 w-full text-left pr-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                              {((filters.PageNumber || 1) - 1) * (filters.PageSize || 20) + index + 1}
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <p className="text-card-foreground font-medium line-clamp-2 leading-relaxed">
                                {question.content}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getQuestionTypeColor(question.questionType)}`}
                                >
                                  {getQuestionTypeLabel(question.questionType)}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getDifficultyColor(question.difficulty)}`}
                                >
                                  {getDifficultyLabel(question.difficulty)}
                                </Badge>
                                {question.answer && question.answer.length > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    {question.answer.length} đáp án
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="pb-0 pt-4">
                          <div className="space-y-4 pl-11">
                            {/* Question Type: Multiple/Single Choice */}
                            {question.questionType !== "3" && question.answer && question.answer.length > 0 && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-3">
                                  Các đáp án:
                                </p>
                                <div className="space-y-2">
                                  {question.answer.map((ans, ansIndex) => {
                                    const isCorrect = question.correctAnswer?.some(
                                      (ca) => ca.label === ans.label
                                    );
                                    return (
                                      <div
                                        key={ansIndex}
                                        className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                                          isCorrect
                                            ? "border-green-300 bg-green-50/50"
                                            : "border-border bg-muted/30"
                                        }`}
                                      >
                                        <div
                                          className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 ${
                                            isCorrect
                                              ? "bg-green-500 text-white shadow-sm"
                                              : "bg-muted text-muted-foreground"
                                          }`}
                                        >
                                          {ans.label}
                                        </div>
                                        <p className="flex-1 text-sm text-card-foreground leading-relaxed">
                                          {ans.text}
                                        </p>
                                        {isCorrect && (
                                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Question Type: Essay */}
                            {question.questionType === "3" && question.correctAnswer?.[0] && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-3">
                                  Đáp án tham khảo:
                                </p>
                                <div className="p-4 bg-green-50/50 border border-green-200 rounded-lg">
                                  <p className="text-sm text-card-foreground whitespace-pre-wrap leading-relaxed">
                                    {question.correctAnswer[0].text}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </div>
                    </div>
                  </AccordionItem>
                </Card>
              );
            })}
          </Accordion>

          {totalPages > 1 && (
            <BasePagination
              currentPage={filters.PageNumber || 1}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={filters.PageSize || 20}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {!isLoading && !isError && questions.length === 0 && (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-muted rounded-full p-6 mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy câu hỏi</h3>
            <p className="text-muted-foreground text-center">
              Thử điều chỉnh bộ lọc hoặc tìm kiếm khác
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-border/50">
        <Button variant="outline" onClick={handleBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <Button onClick={handleNext} disabled={selectedIds.length === 0} size="lg">
          Tiếp theo ({selectedIds.length} câu)
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}