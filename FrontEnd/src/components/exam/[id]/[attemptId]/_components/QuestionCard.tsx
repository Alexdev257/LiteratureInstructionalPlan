// src/components/exam/QuestionCard.tsx
import { Clock, CheckSquare, Circle, FileText } from "lucide-react";
import { QuestionTypeMap, DifficultyMap } from "@/utils/enums";
import type { Question } from "@/utils/type";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  question: Question;
  index: number;
  selectedAnswers: string[];
  essayContent: string;
  onSelect: (answers: string[]) => void;
  onUpdateEssay: (content: string) => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmit: () => void;
  timeRemainingLabel: string;
  timeVariant: "normal" | "warning" | "danger";
  isSubmitting: boolean;
  isSaving: boolean; // Thêm prop
}

export const QuestionCard = ({
  question,
  index,
  selectedAnswers = [],
  essayContent = "",
  onSelect,
  onUpdateEssay,
  onPrev,
  onNext,
  isFirst,
  isLast,
  onSubmit,
  timeRemainingLabel,
  timeVariant,
  isSubmitting,
  isSaving, // Nhận prop
}: Props) => {
  const typeInfo = QuestionTypeMap[question.questionType];
  const diffInfo = DifficultyMap[question.difficulty];
  const isMultiple = question.questionType === "1";
  const isSingle = question.questionType === "2";
  const isEssay = question.questionType === "3";

  const wordCount = essayContent.trim().split(/\s+/).filter(Boolean).length;

  const Icon = {
    CheckSquare,
    Circle,
    FileText,
  }[typeInfo.icon];

  const handleToggle = (value: string) => {
    if (isMultiple) {
      const newAnswers = selectedAnswers.includes(value)
        ? selectedAnswers.filter(a => a !== value)
        : [...selectedAnswers, value];
      onSelect(newAnswers);
    } else if (isSingle) {
      onSelect([value]);
    }
  };

  const renderOption = (opt: { label: string; text: string }, i: number) => {
    const letter = normaliseLabel(opt.label, i);
    const displayText = opt.text || opt.label || `Tùy chọn ${i + 1}`;
    const value = letter;
    const isChecked = selectedAnswers.includes(value);

    return (
      <label
        key={i}
        className={`
          flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all
          ${isChecked
            ? "bg-primary/10 border-primary/30 shadow-sm hover:bg-primary/15"
            : "border-primary/10 hover:bg-muted/30 hover:border-primary/20"
          }
        `}
      >
        {isMultiple ? (
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => handleToggle(value)}
            disabled={isSaving || isSubmitting}
          />
        ) : (
          <input
            type="radio"
            name={`q-${question.questionId}`}
            value={value}
            checked={isChecked}
            onChange={() => handleToggle(value)}
            className="w-4 h-4 text-primary"
            disabled={isSaving || isSubmitting}
          />
        )}
        <span className={isChecked ? "font-medium" : ""}>
          {letter}. {displayText}
        </span>
      </label>
    );
  };

  const timeClass =
    timeVariant === "danger"
      ? "text-red-600"
      : timeVariant === "warning"
        ? "text-yellow-500"
        : "text-muted-foreground";

  // Nút điều hướng bị disable khi đang lưu hoặc nộp
  const isNavigationDisabled = isSaving || isSubmitting;

  return (
    <div className="p-6 border border-primary/10 rounded-xl bg-gradient-to-br from-background to-secondary/5 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/20">
            Câu {index + 1}
          </Badge>
          <Badge className={`${typeInfo.color} text-primary-foreground`}>
            <Icon className="w-3 h-3 mr-1" />
            {typeInfo.label}
          </Badge>
          <Badge className={diffInfo.color} variant="outline">
            {diffInfo.label}
          </Badge>
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${timeClass}`}>
          <Clock className="w-4 h-4 text-primary" />
          {timeRemainingLabel}
        </div>
      </div>

      <div className="p-5 bg-muted/30 rounded-lg mb-6 border border-primary/10">
        <p className="text-lg leading-relaxed font-medium">{question.content}</p>
      </div>

      {(isMultiple || isSingle) && question.answer?.length > 0 && (
        <div className="space-y-3">
          {question.answer.map((opt, i) => renderOption(opt, i))}
        </div>
      )}

      {isEssay && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>
              Số từ: <strong>{wordCount}</strong>
            </span>
            <span>
              Gợi ý: <strong>200–300 từ</strong>
            </span>
          </div>
          <Textarea
            placeholder="Viết câu trả lời của bạn tại đây..."
            className="min-h-[320px] resize-none text-base leading-relaxed"
            value={essayContent}
            onChange={(e) => onUpdateEssay(e.target.value)}
            disabled={isSaving || isSubmitting}
          />
        </div>
      )}

      {/* Hiển thị trạng thái lưu */}
      {isSaving && (
        <div className="flex items-center justify-center py-2 text-sm text-muted-foreground">
          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full mr-2" />
          Đang lưu câu trả lời...
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t border-primary/10 mt-6">
        <Button
          variant="outline"
          disabled={isFirst || isNavigationDisabled}
          onClick={onPrev}
          className="border-primary/20"
        >
          Câu trước
        </Button>

        <div className="flex gap-2">
          {isLast ? (
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={onSubmit}
              disabled={isSubmitting || isSaving}
            >
              {isSubmitting ? "Đang nộp..." : "Nộp bài"}
            </Button>
          ) : (
            <Button
              onClick={onNext}
              className="bg-primary hover:bg-primary/90"
              disabled={isNavigationDisabled}
            >
              {isSaving ? "Đang lưu..." : "Câu tiếp theo"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

function normaliseLabel(label: string | undefined, index: number) {
  if (label && label.trim().length > 0) {
    return label.trim();
  }
  return String.fromCharCode(65 + index);
}