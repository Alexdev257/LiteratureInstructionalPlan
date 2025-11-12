import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Answer } from "@/utils/type";

interface QuestionAnswersCardProps {
  answers: Answer[];
}

export default function QuestionAnswersCard({
  answers,
}: QuestionAnswersCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-card-foreground">Các đáp án</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg border transition ${"border-border hover:bg-muted"
                }`}
            >
              <div className="flex items-center justify-center min-w-fit">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${"bg-primary text-primary-foreground"
                    }`}
                >
                  {answer.label}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-card-foreground">{answer.text}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}