"use client";

import { useState, useEffect } from "react";

import { Loader2, AlertCircle, AlertTriangle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BaseHeader } from "@/components/layout/base/header";
import { useExam } from "@/hooks/useExam";
import { useMatrix } from "@/hooks/useMatrix";
import UpdateProgressSteps from "./_components/UpdateProgressSteps";
import UpdateQuestionsStep from "./_components/UpdateQuestionsStep";
import UpdateReviewStep from "./_components/UpdateReviewStep";
import { useParams, useRouter } from "@tanstack/react-router";

export default function UpdateExamPage() {
  const router = useRouter();
  const {examId} = useParams({from: "/teacher/exams/$examId/edit"});

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([]);

  const { useGetExamById } = useExam();
  const { useGetMatrixById } = useMatrix();

  // Fetch exam data
  const { data: examData, isLoading, isError } = useGetExamById(examId);
  const exam = examData?.data;

  // Fetch matrix data
  const {
    data: matrixData,
    isLoading: isLoadingMatrix,
    isError: isMatrixError,
  } = useGetMatrixById(exam?.matrixId || 0);
  const matrix = matrixData?.data;

  // Initialize selected questions from exam
  useEffect(() => {
    if (exam?.questions) {
      setSelectedQuestionIds(exam.questions.map((q) => q.questionId));
    }
  }, [exam]);

  // Check if matrix question count is valid
  const isValidQuestionCount = () => {
    if (!matrix?.details) return true;
    const totalRequired = matrix.details.reduce(
      (sum, detail) => sum + detail.quantity,
      0
    );
    return selectedQuestionIds.length === totalRequired;
  };

  const getRequiredQuestionCount = () => {
    if (!matrix?.details) return 0;
    return matrix.details.reduce((sum, detail) => sum + detail.quantity, 0);
  };

  // Loading state
  if (isLoading || isLoadingMatrix) {
    return (
      <div className="space-y-6 p-6">
        <BaseHeader
          title="Cập nhật đề thi"
          description="Đang tải thông tin đề thi..."
        />
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (isError || !exam || isMatrixError || !matrix) {
    return (
      <div className="space-y-6 p-6">
        <BaseHeader
          title="Cập nhật đề thi"
          description="Không thể tải thông tin đề thi"
        />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-destructive/10 p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Có lỗi xảy ra</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              {isMatrixError
                ? "Không thể tải thông tin ma trận đề. Vui lòng thử lại."
                : "Không thể tải thông tin đề thi. Vui lòng thử lại."}
            </p>
            <Button onClick={() => router.navigate({ to: "/teacher/exams" })}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const requiredCount = getRequiredQuestionCount();
  const isValid = isValidQuestionCount();

  return (
    <div className="space-y-6 p-6">
      <BaseHeader
        title="Cập nhật đề thi"
        description={exam.title}
      />

      {/* Question Count Validation Alert */}
      {!isValid && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Số lượng câu hỏi không hợp lệ</AlertTitle>
          <AlertDescription>
            Ma trận yêu cầu <strong>{requiredCount} câu hỏi</strong>, hiện tại bạn đã
            chọn <strong>{selectedQuestionIds.length} câu</strong>. Vui lòng điều chỉnh
            để tiếp tục.
          </AlertDescription>
        </Alert>
      )}

      {/* Progress Steps */}
      <UpdateProgressSteps currentStep={currentStep} />

      {/* Step Content */}
      {currentStep === 1 && (
        <UpdateQuestionsStep
          exam={exam}
          matrix={matrix}
          selectedQuestionIds={selectedQuestionIds}
          onQuestionsChange={setSelectedQuestionIds}
          onNext={() => {
            if (isValid) {
              setCurrentStep(2);
            }
          }}
          onCancel={() => router.navigate({ to: `/teacher/examss/${examId}` })}
        />
      )}

      {currentStep === 2 && (
        <UpdateReviewStep
          exam={exam}
          matrix={matrix}
          selectedQuestionIds={selectedQuestionIds}
          onBack={() => setCurrentStep(1)}
          onCancel={() => router.navigate({ to: `/teacher/exams/${examId}` })}
        />
      )}
    </div>
  );
}