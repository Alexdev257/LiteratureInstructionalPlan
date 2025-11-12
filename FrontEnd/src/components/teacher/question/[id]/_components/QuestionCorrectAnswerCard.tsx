import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Answer } from "@/utils/type";

interface QuestionCorrectAnswerCardProps {
  correctAnswer: Answer[];
  questionType: string;
}

export default function QuestionCorrectAnswerCard({
  correctAnswer,
  questionType,
}: QuestionCorrectAnswerCardProps) {
  // Nếu là tự luận (type 3), hiển thị đáp án văn bản
  const isEssay = questionType === "3";
  return (
    <Card className="bg-card border-border ">
      <CardHeader className="border-b">
        <CardTitle className="text-green-800">Đáp án chính xác</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isEssay ? (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-card-foreground whitespace-pre-wrap leading-relaxed">
              {correctAnswer[0]?.text}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {correctAnswer.map((ans, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {ans.label}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-card-foreground leading-relaxed">
                    {ans.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}