import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Question } from "@/utils/type";

interface QuestionInfoCardProps {
  question: Question;
}

export default function QuestionInfoCard({ question }: QuestionInfoCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-card-foreground">Thông tin</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <p className="text-xs text-muted-foreground font-medium">LỚP HỌC</p>
          <Badge variant="secondary" className="mt-1">
            {question.gradeLevel.name}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">NGƯỜI TẠO</p>
          <p className="text-card-foreground font-medium mt-1">
            {question.createdBy.fullName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {question.createdBy.email}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">NGÀY TẠO</p>
          <p className="text-card-foreground font-medium mt-1">
            {new Date(question.createdAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}