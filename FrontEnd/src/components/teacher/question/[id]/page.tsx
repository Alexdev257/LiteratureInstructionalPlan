"use client";

import { useRouter, useParams } from "@tanstack/react-router";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuestion } from "@/hooks/useQuestion";
import { useSessionStore } from "@/stores/sessionStore";
import QuestionDetailHeader from "./_components/QuestionDetailHeader";
import QuestionContentCard from "./_components/QuestionContentCard";
import QuestionAnswersCard from "./_components/QuestionAnswersCard";
import QuestionCorrectAnswerCard from "./_components/QuestionCorrectAnswerCard";
import QuestionInfoCard from "./_components/QuestionInfoCard";
import QuestionActionsCard from "./_components/QuestionActionsCard";



export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams({ from: "/teacher/questions/$questionId" });
  const questionId = Number(params.questionId);

  const { user } = useSessionStore();
  const { useGetQuestionById } = useQuestion();

  const { data, isLoading, isError, error } = useGetQuestionById(questionId);
  const question = data?.data;

  // Permission check
  const canModify = !!(question && Number(user?.UserId) === question.createdBy.userId);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
      </div>
    );
  }

  // Error State
  if (isError || !question) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-destructive/10 rounded-full p-6 mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          {error?.message || "Không thể tải dữ liệu câu hỏi"}
        </p>
        <Button
          onClick={() => router.navigate({ to: "/teacher/questions" })}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <QuestionDetailHeader
        questionId={question.questionId}
        canModify={canModify}
      />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Question content */}
        <div className="lg:col-span-2 space-y-6">
          <QuestionContentCard question={question} />

          {question.answer && question.answer.length > 0 && (
            <QuestionAnswersCard
              answers={question.answer}
            />
          )}

          {question.correctAnswer && (
            <QuestionCorrectAnswerCard
              correctAnswer={question.correctAnswer}
              questionType={question.questionType}
            />
          )}
        </div>

        {/* Right column - Metadata and actions */}
        <div className="space-y-6">
          <QuestionInfoCard question={question} />
          
          {canModify && (
            <QuestionActionsCard questionId={question.questionId} />
          )}
        </div>
      </div>
    </div>
  );
}