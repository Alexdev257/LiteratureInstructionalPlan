

import { useParams, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useExam } from "@/hooks/useExam";
import { useSessionStore } from "@/stores/sessionStore";
import ExamDetailHeader from "./_components/ExamDetailHeader";
import ExamInfoCard from "./_components/ExamInfoCard";
import ExamMetadataCard from "./_components/ExamMetadataCard";
import ExamQuestionsCard from "./_components/ExamQuestionsCard";
import ExamActionsCard from "./_components/ExamActionsCard";



export default function DetailExamPage() {
  const router = useRouter();
  const params = useParams({ from: "/teacher/exams/$examId" });
  const examId = Number(params.examId);

  const { user } = useSessionStore();
  const { useGetExamById } = useExam();

  const { data, isLoading, isError, error } = useGetExamById(examId);
  const exam = data?.data;

  // Permission check
  const canModify = !!(exam && Number(user?.UserId) === exam.createdBy.userId);

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
  if (isError || !exam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-destructive/10 rounded-full p-6 mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          {error?.message || "Không thể tải dữ liệu đề thi"}
        </p>
        <Button
          onClick={() => router.navigate({ to: "/teacher/exams" })}
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
      <ExamDetailHeader examId={exam.examId} canModify={canModify} />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Exam info and questions */}
        <div className="lg:col-span-2 space-y-6">
          <ExamInfoCard exam={exam} />
          <ExamQuestionsCard questions={exam.questions} />
        </div>

        {/* Right column - Metadata and actions */}
        <div className="space-y-6">
          <ExamMetadataCard exam={exam} />
          {canModify && <ExamActionsCard examId={exam.examId} />}
        </div>
      </div>
    </div>
  );
}
