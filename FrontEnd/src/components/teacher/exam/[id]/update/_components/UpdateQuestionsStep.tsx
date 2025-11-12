/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { ArrowRight, AlertCircle, CheckCircle2, Info, Loader2, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { BasePagination } from "@/components/layout/base/pagination";
import { useQuestion } from "@/hooks/useQuestion";
import SearchFilter from "@/components/teacher/question/_components/SearchFilter";
import type { ExamData, Matrix, Question, QuestionQuery } from "@/utils/type";

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

interface UpdateQuestionsStepProps {
  exam: ExamData;
  matrix: Matrix;
  selectedQuestionIds: number[];
  onQuestionsChange: (ids: number[]) => void;
  onNext: () => void;
  onCancel: () => void;
}

export default function UpdateQuestionsStep({
  exam,
  matrix,
  selectedQuestionIds,
  onQuestionsChange,
  onNext,
  onCancel,
}: UpdateQuestionsStepProps) {
  const { useGetQuestions } = useQuestion();
  const [filters, setFilters] = useState<QuestionQuery>({
    ...DEFAULT_FILTERS,
    GradeLevelId: exam.gradeLevel.gradeLevelId, // Filter by exam's grade level
  });

  // Fetch questions with filters
  const { data: questionsData, isLoading: isLoadingQuestions, isError: isQuestionsError } = useGetQuestions(filters);
  const allQuestions = questionsData?.data?.items || [];
  const totalPages = questionsData?.data?.totalPages || 1;
  const totalItems = questionsData?.data?.totalItems || 0;

  // Combine selected questions from exam with all questions
  const allAvailableQuestions = useMemo(() => {
    const questionsMap = new Map<number, Question>();
    
    // Add all fetched questions
    allQuestions.forEach((q) => {
      questionsMap.set(q.questionId, q);
    });
    
    // Add exam questions that might not be in fetched results
    exam.questions.forEach((q) => {
      if (!questionsMap.has(q.questionId)) {
        questionsMap.set(q.questionId, q);
      }
    });
    
    return Array.from(questionsMap.values());
  }, [allQuestions, exam.questions]);

  const handleToggleQuestion = (questionId: number) => {
    onQuestionsChange(
      selectedQuestionIds.includes(questionId)
        ? selectedQuestionIds.filter((id) => id !== questionId)
        : [...selectedQuestionIds, questionId]
    );
  };

  const handleSelectAll = () => {
    const allIds = allQuestions.map((q) => q.questionId);
    const allSelected = allIds.every((id) => selectedQuestionIds.includes(id));
    
    if (allSelected) {
      onQuestionsChange(selectedQuestionIds.filter((id) => !allIds.includes(id)));
    } else {
      onQuestionsChange([...new Set([...selectedQuestionIds, ...allIds])]);
    }
  };

  const handleFiltersChange = (newFilters: Partial<QuestionQuery>) => {
    setFilters({ ...filters, ...newFilters, PageNumber: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, PageNumber: page });
  };

  // Helper functions (defined before useMemo)
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

  // Calculate required question count
  const requiredCount = matrix.details.reduce(
    (sum, detail) => sum + detail.quantity,
    0
  );

  // Validate matrix requirements
  const matrixValidation = useMemo(() => {
    const validation: {
      isValid: boolean;
      errors: string[];
      details: Array<{
        detail: typeof matrix.details[0];
        selected: number;
        required: number;
        isValid: boolean;
      }>;
    } = {
      isValid: true,
      errors: [],
      details: [],
    };

    matrix.details.forEach((detail) => {
      const selectedForDetail = selectedQuestionIds.filter((id) => {
        const question = allAvailableQuestions.find((q) => q.questionId === id);
        return (
          question &&
          question.questionType === detail.questionType &&
          question.difficulty === detail.difficulty
        );
      }).length;

      const isValid = selectedForDetail === detail.quantity;
      validation.details.push({
        detail,
        selected: selectedForDetail,
        required: detail.quantity,
        isValid,
      });

      if (!isValid) {
        validation.isValid = false;
        if (selectedForDetail < detail.quantity) {
          validation.errors.push(
            `Thiếu ${detail.quantity - selectedForDetail} câu hỏi cho ${detail.lessonName} (${getQuestionTypeLabel(detail.questionType)}, ${getDifficultyLabel(detail.difficulty)})`
          );
        } else {
          validation.errors.push(
            `Thừa ${selectedForDetail - detail.quantity} câu hỏi cho ${detail.lessonName} (${getQuestionTypeLabel(detail.questionType)}, ${getDifficultyLabel(detail.difficulty)})`
          );
        }
      }
    });

    const totalSelected = selectedQuestionIds.length;
    if (totalSelected !== requiredCount) {
      validation.isValid = false;
      if (totalSelected < requiredCount) {
        validation.errors.push(`Tổng số câu hỏi thiếu ${requiredCount - totalSelected} câu`);
      } else {
        validation.errors.push(`Tổng số câu hỏi thừa ${totalSelected - requiredCount} câu`);
      }
    }

    return validation;
  }, [selectedQuestionIds, matrix.details, allAvailableQuestions, requiredCount]);

  const isValidCount = matrixValidation.isValid;
  const progress = Math.min((selectedQuestionIds.length / requiredCount) * 100, 100);

  const currentPageSelected = allQuestions.filter((q) =>
    selectedQuestionIds.includes(q.questionId)
  ).length;
  const allCurrentPageSelected =
    allQuestions.length > 0 && currentPageSelected === allQuestions.length;

  return (
    <div className="space-y-6">
      {/* Matrix Requirements */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">
                  Ma trận: {matrix.title}
                </h4>
                <p className="text-xs text-blue-800 mb-3">
                  Yêu cầu: <strong>{requiredCount} câu hỏi</strong>
                </p>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-blue-800">
                      Đã chọn: {selectedQuestionIds.length}/{requiredCount}
                    </span>
                    <span
                      className={
                        isValidCount ? "text-green-600 font-medium" : "text-blue-800"
                      }
                    >
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={progress} className={isValidCount ? "[&>div]:bg-green-500" : ""} />
                </div>

                {/* Matrix details with validation */}
                {matrix.details && matrix.details.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {matrixValidation.details.map((item, index) => (
                      <div
                        key={index}
                        className={`text-xs rounded px-2 py-1.5 ${
                          item.isValid
                            ? "bg-green-50/50 border border-green-200"
                            : "bg-red-50/50 border border-red-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${
                            item.isValid ? "text-green-900" : "text-red-900"
                          }`}>
                            {item.detail.lessonName} - {getQuestionTypeLabel(item.detail.questionType)} ({getDifficultyLabel(item.detail.difficulty)})
                          </span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              item.isValid 
                                ? "border-green-300 text-green-700" 
                                : "border-red-300 text-red-700"
                            }`}
                          >
                            {item.selected}/{item.required} câu
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Alert */}
      {!isValidCount && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Yêu cầu ma trận chưa đáp ứng</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {matrixValidation.errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <SearchFilter
            queryParams={filters}
            onParamsChange={handleFiltersChange}
          />
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoadingQuestions && (
        <Card className="border-border/50">
          <CardContent className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">Đang tải câu hỏi...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {isQuestionsError && (
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

      {/* Questions List */}
      {!isLoadingQuestions && !isQuestionsError && allQuestions.length > 0 && (
        <>
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Tìm thấy <span className="font-semibold text-foreground">{totalItems}</span> câu hỏi
              </p>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Đã chọn: {selectedQuestionIds.length} câu
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
            {allQuestions.map((question, index) => {
              const isSelected = selectedQuestionIds.includes(question.questionId);
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

          {/* Pagination */}
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

      {/* Empty State */}
      {!isLoadingQuestions && !isQuestionsError && allQuestions.length === 0 && (
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

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-border/50">
        <Button variant="outline" onClick={onCancel} size="lg">
          Hủy bỏ
        </Button>
        <Button onClick={onNext} disabled={!isValidCount} size="lg">
          {isValidCount ? (
            <>
              Tiếp theo ({selectedQuestionIds.length} câu)
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            `Cần ${requiredCount} câu hỏi để tiếp tục`
          )}
        </Button>
      </div>
    </div>
  );
}