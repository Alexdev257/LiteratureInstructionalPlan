import { Clock, FileText, BookOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ExamData } from "@/utils/type";

interface ExamInfoCardProps {
  exam: ExamData;
}

export default function ExamInfoCard({ exam }: ExamInfoCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl text-card-foreground mb-2">
              {exam.title}
            </CardTitle>
            <CardDescription className="text-base">
              ID: #{exam.examId}
            </CardDescription>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {exam.examType.name}
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              {exam.gradeLevel.name}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Description */}
        {exam.description && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              MÔ TẢ
            </h4>
            <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">
              {exam.description}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                SỐ CÂU HỎI
              </p>
              <p className="text-2xl font-bold text-card-foreground">
                {exam.questions?.length || 0}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                THỜI GIAN
              </p>
              <p className="text-2xl font-bold text-card-foreground">
                {exam.durationMinutes} phút
              </p>
            </div>
          </div>
        </div>

        {/* Matrix Link */}
        {exam.matrixId && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <BookOpen className="h-4 w-4 text-amber-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">
                Tạo từ Ma trận đề
              </p>
              <p className="text-xs text-amber-700">
                ID: #{exam.matrixId}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}