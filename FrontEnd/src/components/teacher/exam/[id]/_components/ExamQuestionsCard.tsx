import { CheckCircle2, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Question } from "@/utils/type";


interface ExamQuestionsCardProps {
  questions: Question[];
}

export default function ExamQuestionsCard({ questions }: ExamQuestionsCardProps) {
  console.log(questions);
  const getQuestionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      "1": "Nhiều đáp án",
      "2": "Một đáp án",
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

  const getDifficultyLabel = (level: string) => {
    const labels: Record<string, string> = {
      "1": "Dễ",
      "2": "Trung bình",
      "3": "Khó",
      "4": "Rất khó",
    };
    return labels[level] || "Không xác định";
  };

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      "1": "bg-green-100 text-green-800 border-green-200",
      "2": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "3": "bg-orange-100 text-orange-800 border-orange-200",
      "4": "bg-red-100 text-red-800 border-red-200",
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (questions.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="bg-muted rounded-full p-4 mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Chưa có câu hỏi</h3>
          <p className="text-muted-foreground text-center">
            Đề thi này chưa có câu hỏi nào
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Danh sách câu hỏi ({questions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="space-y-3">
          {questions.map((question, index) => (
            <AccordionItem
              key={question.questionId}
              value={`question-${question.questionId}`}
              className="border border-border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 hover:no-underline">
                <div className="flex items-start gap-3 w-full">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-card-foreground line-clamp-2">
                      {question.content}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className={getQuestionTypeBadgeColor(question.questionType)}
                      >
                        {getQuestionTypeLabel(question.questionType)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getDifficultyColor(question.difficulty)}
                      >
                        {getDifficultyLabel(question.difficulty)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="space-y-4">
                  {/* Question Content */}
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      NỘI DUNG CÂU HỎI:
                    </p>
                    <p className="text-card-foreground whitespace-pre-wrap leading-relaxed">
                      {question.content}
                    </p>
                  </div>

                  {/* Answers - Multiple Choice */}
                  {question.questionType !== "3" && question.answer && question.answer.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        CÁC ĐÁP ÁN:
                      </p>
                      <div className="space-y-2">
                        {question.answer.map((ans, ansIndex) => {
                          const isCorrect = question.correctAnswer?.some(
                            (ca) => ca.label === ans.label
                          );
                          return (
                            <div
                              key={ansIndex}
                              className={`flex items-start gap-3 p-3 rounded-lg border ${
                                isCorrect
                                  ? "border-green-200 bg-green-50/50"
                                  : "border-border bg-muted/30"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                                  isCorrect
                                    ? "bg-green-500 text-white"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {ans.label}
                              </div>
                              <div className="flex-1">
                                <p className="text-card-foreground">{ans.text}</p>
                              </div>
                              {isCorrect && (
                                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Essay Answer */}
                  {question.questionType === "3" && question.correctAnswer?.[0] && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        ĐÁP ÁN THAM KHẢO:
                      </p>
                      <div className="p-4 bg-green-50/50 border border-green-200 rounded-lg">
                        <p className="text-card-foreground whitespace-pre-wrap leading-relaxed">
                          {question.correctAnswer[0].text}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}