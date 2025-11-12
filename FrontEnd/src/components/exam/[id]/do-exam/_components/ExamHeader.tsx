
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ExamData } from "@/utils/type";
import { Save, Eye } from "lucide-react";

interface Props {
  exam: ExamData;
  currentIdx: number;
  total: number;
  progress: number;
  mcMulti: number;
  mcSingle: number;
  essay: number;
}

export const ExamHeader = ({
  exam,
  currentIdx,
  total,
  progress,
  mcMulti,
  mcSingle,
  essay,
}: Props) => {
  const hasMixed = mcMulti > 0 && mcSingle > 0 && essay > 0;
  const hasAnyMC = mcMulti > 0 || mcSingle > 0;

  return (
    <div className="mb-12">
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-lg transition-all duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                Mã đề: {exam.examId} 
              </Badge>
              <h1 className="text-2xl font-bold text-balance group-hover:text-primary transition-colors">{exam.title}</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Câu {currentIdx + 1}/{total} • Còn lại 1:23:45
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{progress}%</div>
              <div className="text-sm text-muted-foreground">Hoàn thành</div>
            </div>
          </div>

          <Progress value={progress} className="mb-4" />

          {/* Thống kê loại câu hỏi */}
          {(hasMixed || hasAnyMC || essay > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
              {mcMulti > 0 && (
                <div className="p-2 bg-primary/10 border border-primary/20 rounded text-center">
                  <div className="font-medium text-primary">Nhiều đáp án</div>
                  <div>{mcMulti} câu</div>
                </div>
              )}
              {mcSingle > 0 && (
                <div className="p-2 bg-secondary/10 border border-secondary/20 rounded text-center">
                  <div className="font-medium text-secondary">Một đáp án</div>
                  <div>{mcSingle} câu</div>
                </div>
              )}
              {essay > 0 && (
                <div className="p-2 bg-green-100/50 border border-green-300/30 rounded text-center">
                  <div className="font-medium text-green-800">Tự luận</div>
                  <div>{essay} câu</div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Lưu bài
            </Button>
            <Button variant="outline" size="lg">
              <Eye className="w-4 h-4 mr-2" />
              Xem trước
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};