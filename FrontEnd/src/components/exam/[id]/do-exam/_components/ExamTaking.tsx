


import { useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { QuestionNavigator } from "./QuestionNavigator";

import type { ExamData } from "@/utils/type";
import { ExamStatsSidebar } from "./ExamStatsSidebar";

interface Props {
  exam: ExamData;
}

export const ExamTaking = ({ exam }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [essayContents, setEssayContents] = useState<Record<number, string>>({});

  const total = exam.questions.length;
  const currentQ = exam.questions[currentIdx];

  
  const countType = (type: "1" | "2" | "3") =>
    exam.questions.filter(q => q.questionType === type).length;

  const mcMulti = countType("1");
  const mcSingle = countType("2");
  const essay = countType("3");

 
  const completedCount = Object.values(answers).filter(a => a.length > 0).length +
    Object.values(essayContents).filter(v => v.trim().length > 0).length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Handlers
  const goTo = (idx: number) => setCurrentIdx(idx);

  const handleSelect = (selected: string[]) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: selected }));
  };

  const handleEssay = (content: string) => {
    setEssayContents(prev => ({ ...prev, [currentIdx]: content }));
  };

  return (
    <div className="container mx-auto px-4 py-8  min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <QuestionCard
            question={currentQ}
            index={currentIdx}
            selectedAnswers={answers[currentIdx] || []}
            essayContent={essayContents[currentIdx] || ""}
            onSelect={handleSelect}
            onUpdateEssay={handleEssay}
            onPrev={() => goTo(Math.max(0, currentIdx - 1))}
            onNext={() => goTo(Math.min(total - 1, currentIdx + 1))}
            isFirst={currentIdx === 0}
            isLast={currentIdx === total - 1}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuestionNavigator
            questions={exam.questions}
            currentIdx={currentIdx}
            answers={answers}
            essayContents={essayContents}
            onJump={goTo}
          />
          <ExamStatsSidebar
            total={total}
            completed={completedCount}
            mcMulti={mcMulti}
            mcSingle={mcSingle}
            essay={essay}
            progress={progress}
          />
        </div>
      </div>
    </div>
  );
};