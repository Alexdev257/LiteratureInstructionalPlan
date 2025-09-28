import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Target,
  Trophy,
  Play,
  FileText,
  ArrowRight
} from "lucide-react";
import { mockExamData } from "@/utils/mockAPi";
import { Link } from "@tanstack/react-router";

type Props = {
  examId: string;
};
export const ExamDetail = ({ examId }: Props) => {
  const exam = mockExamData.find(e => e.examId === Number(examId));

  if (!exam) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Không tìm thấy đề thi</h2>
            <p className="text-muted-foreground mb-6">Đề thi bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link to="/exam">
              <Button>Quay lại danh sách đề thi</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock attempt ID để demo
  const attemptId = Math.random().toString(36).substr(2, 9);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Exam Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/exam" className="hover:text-foreground">Tất cả đề thi</Link>
          <span>/</span>
          <span>Chi tiết đề thi</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary">
                Lớp {exam.gradeLevel?.gradeName || exam.gradeLevelId}
              </Badge>
              <Badge variant={exam.examTypeId === 1 ? "default" : "secondary"}>
                {exam.examTypeId === 1 ? "Trắc nghiệm" : "Tự luận"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
            <p className="text-muted-foreground text-lg">{exam.description}</p>
          </div>

          <div className="flex gap-3">
            <Link to="/exam/$examId/$attemptId/" params={{ examId, attemptId }}>
              <Button size="lg" className="flex items-center gap-2 cursor-pointer">
                <Play className="w-5 h-5" />
                Bắt đầu làm bài
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Xem đề mẫu
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
                    <div className="font-semibold">{exam.totalQuestions || 50} câu</div>
                    <div className="text-sm text-muted-foreground">Số lượng câu hỏi</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-semibold">{exam.attempts || 0}</div>
                    <div className="text-sm text-muted-foreground">Lượt thi</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-semibold">{exam.averageScore}/10</div>
                    <div className="text-sm text-muted-foreground">Điểm trung bình</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Mô tả chi tiết</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {exam.description} Đề thi này được thiết kế để kiểm tra kiến thức toàn diện của học sinh về {exam.examType?.typeName || 'Văn học'},
                  bao gồm các kỹ năng đọc hiểu, phân tích và vận dụng kiến thức vào thực tế.
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
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Chuẩn bị</h4>
                    <p className="text-muted-foreground">Đảm bảo kết nối internet ổn định và môi trường yên tĩnh để tập trung làm bài.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Thời gian</h4>
                    <p className="text-muted-foreground">Bạn có {exam.durationMinutes} phút để hoàn thành {exam.totalQuestions || 50} câu hỏi. Hệ thống sẽ tự động nộp bài khi hết thời gian.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Lưu bài</h4>
                    <p className="text-muted-foreground">Hệ thống tự động lưu đáp án của bạn. Bạn có thể tạm dừng và tiếp tục làm bài sau.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thống kê nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">{exam.averageScore}</div>
                <div className="text-sm text-muted-foreground">Điểm trung bình</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Độ khó:</span>
                  <Badge variant="secondary">Trung bình</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chủ đề:</span>
                  <span className="font-medium">{exam.examType?.typeName || 'Văn học'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cập nhật:</span>
                  <span className="font-medium">1 tuần trước</span>
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
                  Hãy chuẩn bị tinh thần và bắt đầu thử thách kiến thức của bạn!
                </p>
                <Link to="/exam/$examId/$attemptId/" params={{ examId, attemptId }}>
                  <Button className="w-full cursor-pointer">
                    Bắt đầu ngay
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Related Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Đề thi liên quan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockExamData.slice(0, 3).filter(e => e.examId !== exam.examId).map((relatedExam) => (
                <Link
                  key={relatedExam.examId}
                  to="/exam/$examId"
                  params={{ examId: relatedExam.examId.toString() }}
                  className="block p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="font-medium text-sm mb-1">{relatedExam.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Lớp {relatedExam.gradeLevel?.gradeName || relatedExam.gradeLevelId} • {relatedExam.durationMinutes} phút
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};