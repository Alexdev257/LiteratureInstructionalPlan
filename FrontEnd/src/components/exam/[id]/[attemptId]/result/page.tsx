"use client";

import { useParams } from "@tanstack/react-router";
import { useExam } from "@/hooks/useExam";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowLeft,
  Home,
  TrendingUp,
  Clock,
  FileText,
} from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export default function ResultPage() {
  const { examId, attemptId } = useParams({ from: "/exam/$examId/$attemptId/result" });
  const router = useRouter();
  const { useGetExamAttemptById, useGetExamById } = useExam();

  // Fetch attempt data to get score and feedback
  const { data: attemptResponse, isLoading: isLoadingAttempt } = useGetExamAttemptById(
    Number(attemptId) || 0
  );
  const attempt = attemptResponse?.data;

  // Fetch exam data for title and total points
  const { data: examResponse, isLoading: isLoadingExam } = useGetExamById(Number(examId));
  const exam = examResponse?.data;

  if (isLoadingAttempt || isLoadingExam) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-muted rounded mb-6"></div>
              <div className="h-24 bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!attempt || !exam) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Không tìm thấy kết quả</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Không thể tải kết quả bài thi. Vui lòng thử lại sau.
              </p>
              <Button onClick={() => router.navigate({ to: "/exam" })}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách đề thi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const score = attempt.score || 0;
  const feedback = attempt.feedback || "";
  const maxScore = 10; // Assuming max score is 10, adjust based on your system
  const percentage = (score / maxScore) * 100;

  // Determine score status and colors
  const getScoreStatus = () => {
    if (percentage >= 80) {
      return {
        label: "Xuất sắc",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        icon: CheckCircle2,
        badgeVariant: "default" as const,
        badgeClass: "bg-green-100 text-green-800 border-green-300",
      };
    } else if (percentage >= 60) {
      return {
        label: "Khá",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        icon: TrendingUp,
        badgeVariant: "default" as const,
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
      };
    } else if (percentage >= 40) {
      return {
        label: "Trung bình",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        icon: MessageSquare,
        badgeVariant: "default" as const,
        badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-300",
      };
    } else {
      return {
        label: "Cần cải thiện",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: XCircle,
        badgeVariant: "default" as const,
        badgeClass: "bg-red-100 text-red-800 border-red-300",
      };
    }
  };

  const status = getScoreStatus();
  const StatusIcon = status.icon;

  // Format completion date
  const completedDate = attempt.completedAt
    ? new Date(attempt.completedAt).toLocaleString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Chưa xác định";

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.navigate({ to: "/exam" })}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
        </div>

        {/* Main Result Card */}
        <Card className={`${status.bgColor} ${status.borderColor} border-2`}>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div
                className={`w-20 h-20 rounded-full ${status.bgColor} ${status.borderColor} border-4 flex items-center justify-center`}
              >
                <StatusIcon className={`w-10 h-10 ${status.color}`} />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Kết quả bài thi</CardTitle>
            <p className="text-muted-foreground">{exam.title}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Trophy className={`w-12 h-12 ${status.color}`} />
                <div>
                  <div className={`text-5xl font-bold ${status.color}`}>
                    {score.toFixed(1)}/{maxScore}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Điểm số</div>
                </div>
              </div>

              <Badge className={status.badgeClass} variant="outline">
                {status.label}
              </Badge>

              {/* Progress Bar */}
              <div className="space-y-2">
                <Progress value={percentage} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Đạt được {percentage.toFixed(1)}% tổng điểm
                </p>
              </div>
            </div>

            {/* Exam Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Hoàn thành lúc</div>
                  <div className="font-semibold text-sm">Now</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Thời gian làm bài</div>
                  <div className="font-semibold text-sm">{exam.durationMinutes} phút</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Card */}
        {feedback && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Nhận xét và đánh giá
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed p-4 bg-muted/30 rounded-lg border">
                  {feedback}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.navigate({ to: "/exam" })}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Xem thêm đề thi
          </Button>
          <Button
            onClick={() => router.navigate({ to: "/" })}
            className="flex-1"
          >
            <Home className="w-4 h-4 mr-2" />
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}
