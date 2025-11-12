// src/components/exam/ExamStatsSidebar.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Target } from "lucide-react";

interface Props {
  total: number;
  completed: number;
  mcMulti: number;
  mcSingle: number;
  essay: number;
  progress: number;
}

export const ExamStatsSidebar = ({
  total,
  completed,
  mcMulti,
  mcSingle,
  essay,
  progress,
}: Props) => {
  const remaining = total - completed;
  const avgTimePerQuestion = "2.8"; // Giả lập – sẽ lấy từ backend sau
  const timeUsed = "38:21"; // Giả lập

  return (
    <Card className="border-primary/10 bg-gradient-to-br from-background to-secondary/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Thống kê tiến độ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tổng quan */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">{completed}</div>
            <div className="text-xs text-muted-foreground">Đã hoàn thành</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg border border-primary/10">
            <div className="text-2xl font-bold">{remaining}</div>
            <div className="text-xs text-muted-foreground">Chưa làm</div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Thời gian */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            Thời gian đã dùng
          </span>
          <span className="font-semibold">{timeUsed}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tốc độ trung bình</span>
          <span className="font-semibold">{avgTimePerQuestion} phút/câu</span>
        </div>

        {/* Phân bổ loại câu hỏi */}
        {(mcMulti > 0 || mcSingle > 0 || essay > 0) && (
          <>
            <div className="border-t border-primary/10 pt-4">
              <h4 className="text-sm font-medium mb-3">Phân bổ câu hỏi</h4>
              <div className="space-y-2 text-xs">
                {mcMulti > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-muted-foreground">Nhiều đáp án</span>
                    </div>
                    <span className="font-medium">{mcMulti} câu</span>
                  </div>
                )}
                {mcSingle > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-full" />
                      <span className="text-muted-foreground">Một đáp án</span>
                    </div>
                    <span className="font-medium">{mcSingle} câu</span>
                  </div>
                )}
                {essay > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-muted-foreground">Tự luận</span>
                    </div>
                    <span className="font-medium">{essay} câu</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Gợi ý */}
        <div className="mt-4 p-3 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <CheckCircle2 className="w-3 h-3 inline mr-1 text-primary" />
            <strong>Gợi ý:</strong> Ưu tiên làm các câu trắc nghiệm trước, sau đó tập trung vào tự luận.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};