"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Star,
  Target,
  Trophy,
  Play,
  FileText,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import type { ExamData, MatrixDetail } from "@/utils/type";
import { useMatrix } from "@/hooks/useMatrix";
import { useExam } from "@/hooks/useExam";
import { useSessionStore } from "@/stores/sessionStore";
import { toast } from "sonner";


type Props = {
  exam: ExamData;
};

// Enum mapping
const DifficultyEnum = {
  "1": { text: "Dễ", color: "bg-green-100 text-green-800 border-green-300" },
  "2": { text: "Trung bình", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  "3": { text: "Khó", color: "bg-red-100 text-red-800 border-red-300" },
  "4": { text: "Rất khó", color: "bg-purple-100 text-purple-800 border-purple-300" },
} as const;

const QuestionTypeEnum = {
  "1": "Nhiều đáp án",
  "2": "Một đáp án",
  "3": "Tự luận",
} as const;

export const ExamDetail = ({ exam }: Props) => {
  const router = useRouter();
  const { useGetMatrixById } = useMatrix();
  const { useStartExam } = useExam();
  const {user} = useSessionStore();
  const { data: matrixData } = useGetMatrixById(exam.matrixId);

  if (!exam) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Không tìm thấy đề thi</h2>
            <p className="text-muted-foreground mb-6">
              Đề thi bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link to="/exam">
              <Button>Quay lại danh sách đề thi</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  } 
  const handleStartExam = async () => {
    if (!user?.UserId) {
      toast.error("Bạn chưa đăng nhập!");
      return router.navigate({ to: `/auth/login` });

    }
    useStartExam.mutate({
       ExamId: exam.examId,
       UserId: Number(user?.UserId) ,
    }, {
      onSuccess: (data) => {
        router.navigate({ to: `/exam/${exam.examId}/${data.data.attemptId}` });
      },
      onError: (error) => {
        toast.error(error.message || "Bắt đầu làm bài thất bại!");
      }
    });
  }

  // === Dữ liệu từ Matrix ===
  const matrix = matrixData?.data;
  const totalQuestions = matrix?.totalQuestions || 0;
  const totalPoint = matrix?.totalPoint || 0;

  // Tính độ khó & loại câu hỏi từ details
  const difficultyCounts = { "1": 0, "2": 0, "3": 0, "4": 0 };
  const questionTypeCounts = { "1": 0, "2": 0, "3": 0 };

  matrix?.details?.forEach((detail: MatrixDetail) => {
    difficultyCounts[detail.difficulty] = (difficultyCounts[detail.difficulty] || 0) + detail.quantity;
    questionTypeCounts[detail.questionType] = (questionTypeCounts[detail.questionType] || 0) + detail.quantity;
  });

  // Độ khó phổ biến nhất
  const dominantDifficulty = Object.entries(difficultyCounts).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0] as keyof typeof DifficultyEnum;
  const difficultyInfo = DifficultyEnum[dominantDifficulty] || DifficultyEnum["1"];

  // Danh sách loại câu hỏi dưới dạng Badge
  const questionTypeBadges = Object.entries(questionTypeCounts)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, count]) => count > 0)
    .map(([type, count]) => {
      const text = QuestionTypeEnum[type as keyof typeof QuestionTypeEnum];
      return (
        <Badge key={type} variant="secondary" className="text-xs">
          {text} ({count})
        </Badge>
      );
    });

  const createdDate = new Date(exam.createdAt).toLocaleDateString("vi-VN");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Exam Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary">
                Lớp {exam.gradeLevel?.name || "Chưa xác định"}
              </Badge>
              <Badge className={difficultyInfo.color} variant="outline">
                <Target className="w-3 h-3 mr-1" />
                {difficultyInfo.text}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
            <p className="text-muted-foreground text-lg">{exam.description}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="lg" onClick={() => router.navigate({ to: `/exam` })} className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </Button>
            <Button onClick={handleStartExam} size="lg" className="flex items-center gap-2 cursor-pointer">
              <Play className="w-5 h-5" />
              Bắt đầu bài thi
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Exam Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Thông tin đề thi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">{exam.durationMinutes} phút</div>
                    <div className="text-sm text-muted-foreground">Thời gian làm bài</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Target className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold">{totalQuestions} câu</div>
                    <div className="text-sm text-muted-foreground">Số lượng câu hỏi</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-semibold">0</div>
                    <div className="text-sm text-muted-foreground">Lượt thi</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-semibold">10/10</div>
                    <div className="text-sm text-muted-foreground">Điểm trung bình</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 ">
                <h4 className="font-semibold mb-3">Mô tả chi tiết</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {(exam.description ? `${exam.description}.` : "Không có mô tả.")} Đề thi gồm{" "}
                  <strong>{totalQuestions} câu</strong> với tổng điểm <strong>{totalPoint}</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Hướng dẫn làm bài</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Chuẩn bị</h4>
                    <p className="text-muted-foreground">
                      Đảm bảo kết nối internet ổn định và môi trường yên tĩnh.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Thời gian</h4>
                    <p className="text-muted-foreground">
                      Bạn có <strong>{exam.durationMinutes} phút</strong> để hoàn thành{" "}
                      <strong>{totalQuestions} câu hỏi</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Lưu bài</h4>
                    <p className="text-muted-foreground">
                      Hệ thống tự động lưu đáp án. Bạn có thể tạm dừng và tiếp tục.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Thống kê nhanh (UI ĐẸP HƠN) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thống kê nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Điểm trung bình */}
              <div className="text-center p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                <div className="text-3xl font-bold text-primary mb-1">
                  10/10
                </div>
                <div className="text-sm text-muted-foreground">Điểm trung bình</div>
              </div>

              {/* Thông tin dạng Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Độ khó:</span>
                  <Badge className={difficultyInfo.color} variant="outline">
                    {difficultyInfo.text}
                  </Badge>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-muted-foreground">Loại câu hỏi:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {questionTypeBadges.length > 0 ? (
                      questionTypeBadges
                    ) : (
                      <Badge variant="secondary" className="text-xs">Trắc nghiệm</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tổng điểm:</span>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                    {totalPoint}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cập nhật:</span>
                  <Badge variant="outline" className="text-xs">
                    {createdDate}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Start Exam CTA */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Trophy className="w-12 h-12 text-primary mx-auto" />
                <h4 className="font-semibold">Sẵn sàng làm bài?</h4>
                <p className="text-sm text-muted-foreground">
                  Hãy chuẩn bị tinh thần và bắt đầu thử thách!
                </p>
                <Button onClick={handleStartExam} className="w-full cursor-pointer">
                  Bắt đầu ngay
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};