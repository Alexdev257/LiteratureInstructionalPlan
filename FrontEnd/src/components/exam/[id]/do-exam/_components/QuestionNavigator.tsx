// src/components/exam/QuestionNavigator.tsx

import { FileText, } from "lucide-react";
import { QuestionTypeMap } from "@/utils/enums";
import type { ExamData } from "@/utils/type";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  questions: ExamData["questions"];
  currentIdx: number;
  answers: Record<number, string[]>;
  essayContents: Record<number, string>;
  onJump: (idx: number) => void;
}

export const QuestionNavigator = ({
  questions,
  currentIdx,
  answers,
  essayContents,
  onJump,
}: Props) => {
  return (
    <Card className="border-primary/10 bg-gradient-to-br from-background to-secondary/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Danh sách câu hỏi
        </CardTitle>
      </CardHeader>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-6 gap-2">
          {questions.map((q, i) => {
            const typeInfo = QuestionTypeMap[q.questionType];
            const hasAnswer = answers[i]?.length > 0;
            const hasEssay = essayContents[i]?.trim().length > 0;
            const done = hasAnswer || hasEssay;

            return (
              <button
                key={i}
                onClick={() => onJump(i)}
                className={`
                  relative w-9 h-9 rounded-lg text-xs font-medium transition-all
                  ${i === currentIdx
                    ? "bg-primary text-white shadow-md hover:bg-primary/90"
                    : done
                    ? "bg-green-100 border border-green-300 text-green-800 hover:bg-green-200"
                    : "bg-muted hover:bg-primary/10 text-muted-foreground border border-primary/10"
                  }
                `}
              >
                {i + 1}
                <div
                  className={`
                    absolute -top-1 -right-1 w-3 h-3 rounded-full
                    ${typeInfo.color}
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground border-t border-primary/10 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-primary rounded-full" />
            Nhiều đáp án
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-secondary rounded-full" />
            Một đáp án
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            Tự luận
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
            Đã làm
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-primary rounded" />
            Hiện tại
          </div>
        </div>
      </div>
    </Card>
  );
};