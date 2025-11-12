import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Question } from "@/utils/type";

interface QuestionContentCardProps {
  question: Question;
}

export default function QuestionContentCard({ question }: QuestionContentCardProps) {
  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      "1": "bg-green-100 text-green-800 border-green-200",
      "2": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "3": "bg-orange-100 text-orange-800 border-orange-200",
      "4": "bg-red-100 text-red-800 border-red-200",
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getDifficultyLabel = (level: string) => {
    const labels: Record<string, string> = {
      "1": "Dễ",
      "2": "Trung bình",
      "3": "Khó",
      "4": "Rất khó",
    };
    return labels[level] || "Không xác định";
  };

  const getQuestionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      "1": "Nhiều đáp án đúng",
      "2": "Một đáp án đúng",
      "3": "Tự luận",
    };
    return types[type] || "Không xác định";
  };

  const getQuestionTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      "1": "bg-blue-100 text-blue-800 border-blue-200",
      "2": "bg-green-100 text-green-800 border-green-200",
      "3": "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-card-foreground">
              Mã số câu hỏi : #{question.questionId}
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className={getDifficultyColor(question.difficulty)}
            >
              {getDifficultyLabel(question.difficulty)}
            </Badge>
            <Badge
              variant="outline"
              className={getQuestionTypeBadgeColor(question.questionType)}
            >
              {getQuestionTypeLabel(question.questionType)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-lg text-card-foreground leading-relaxed whitespace-pre-wrap">
          <span className="font-semibold text-primary">Câu hỏi:</span>{" "}
          {question.content}
        </p>
      </CardContent>

    </Card>
  );
}