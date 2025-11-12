
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {  Clock, Save, Target } from "lucide-react";

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
  progress,
}: Props) => {
  const remaining = total - completed;
  const timeUsed = "1:23:45"; // Placeholder for remaining time
  return (
    <Card className="border-primary/10 bg-gradient-to-br from-background to-secondary/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Thống kê tiến độ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
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

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            Thời gian còn lại
          </span>
          <span className="font-semibold">{timeUsed}</span>
        </div>





        <div className="flex gap-3">
          <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Lưu bài
          </Button>
         
        </div>
      </CardContent>
    </Card>
  );
};