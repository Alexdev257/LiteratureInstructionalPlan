import { Calendar, User, Mail, GraduationCap, FileType } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ExamData } from "@/utils/type";

interface ExamMetadataCardProps {
  exam: ExamData;
}

export default function ExamMetadataCard({ exam }: ExamMetadataCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-card-foreground">Thông tin</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Grade Level */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-2">
            <GraduationCap className="h-4 w-4" />
            <span>LỚP HỌC</span>
          </div>
          <Badge variant="secondary" className="text-sm">
            {exam.gradeLevel.name}
          </Badge>
        </div>

        {/* Exam Type */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-2">
            <FileType className="h-4 w-4" />
            <span>LOẠI ĐỀ THI</span>
          </div>
          <Badge variant="secondary" className="text-sm">
            {exam.examType.name}
          </Badge>
        </div>

        {/* Creator */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-2">
            <User className="h-4 w-4" />
            <span>NGƯỜI TẠO</span>
          </div>
          <p className="text-card-foreground font-medium">
            {exam.createdBy.fullName}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Mail className="h-3 w-3" />
            <span>{exam.createdBy.email}</span>
          </div>
        </div>

        {/* Created Date */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-2">
            <Calendar className="h-4 w-4" />
            <span>NGÀY TẠO</span>
          </div>
          <p className="text-card-foreground font-medium">
            {formatDate(exam.createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}