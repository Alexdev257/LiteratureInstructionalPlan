import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { QuestionNavigator } from "./QuestionNavigator";
import type { ExamAttempt, ExamData, Question } from "@/utils/type";
import { ExamStatsSidebar } from "./ExamStatsSidebar";
import { useExam } from "@/hooks/useExam";
import type { SubmitAttemptInput } from "@/schema/examSchema";

interface Props {
  exam: ExamData;
  attemptId: number;
  attempt: ExamAttempt;
}

type AnswerMap = Record<number, string[]>;
type EssayMap = Record<number, string>;

export const ExamTaking = ({ exam, attemptId, attempt }: Props) => {
  const { useSubmitAttempt: submitAttemptMutation } = useExam();
  const { mutateAsync: submitAttempt, isPending: isSubmitting } = submitAttemptMutation;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [essayContents, setEssayContents] = useState<EssayMap>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Dùng ref để lưu thời gian còn lại (không re-render)
  const remainingSecondsRef = useRef<number>(0);
  const [displaySeconds, setDisplaySeconds] = useState<number>(0);

  // Lấy endTime từ attempt (đã có sẵn)
  const endTime = useMemo(() => new Date(attempt.endTime!), [attempt.endTime]);

  const total = exam.questions.length;
  const currentQ = exam.questions[currentIdx];

  const completedCount =
    Object.values(answers).filter(a => a.length > 0).length +
    Object.values(essayContents).filter(v => v.trim().length > 0).length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  // Cảnh báo: đỏ khi còn ≤ 5 phút (300s)
  const timeVariant = useMemo(() => {
    return displaySeconds <= 300 ? "danger" : "normal";
  }, [displaySeconds]);

  const timeLabel = useMemo(() => formatTime(displaySeconds), [displaySeconds]);

  // Khởi tạo thời gian ban đầu
  useEffect(() => {
    const now = Date.now();
    const end = endTime.getTime();
    const initial = Math.max(0, Math.floor((end - now) / 1000));

    remainingSecondsRef.current = initial;
    setDisplaySeconds(initial);
  }, [endTime]);

  // Đếm ngược chính xác bằng requestAnimationFrame
  useEffect(() => {
    if (hasSubmitted || !attempt.endTime) return;

    let lastUpdate = Date.now();
    let frameId: number;

    const tick = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - lastUpdate) / 1000);
      if (elapsed > 0) {
        lastUpdate = now;
        const next = Math.max(0, remainingSecondsRef.current - elapsed);
        remainingSecondsRef.current = next;
        setDisplaySeconds(next);

        if (next <= 0) {
          void handleSubmitExam();
          return;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hasSubmitted, attempt.endTime]);

  // Xử lý chọn đáp án
  const handleSelect = (selected: string[]) => {
    setAnswers(prev => ({ ...prev, [currentIdx]: selected }));
  };

  const handleEssay = (content: string) => {
    setEssayContents(prev => ({ ...prev, [currentIdx]: content }));
  };

  // Xây dựng payload cho 1 câu
  const buildEntryForQuestion = useCallback(
    (question: Question, answerLabels: string[] = [], essayContent = "") => {
      if (!question) return null;

      if (question.questionType === "3") {
        const trimmed = essayContent.trim();
        if (!trimmed) return null;
        return {
          questionId: question.questionId,
          answerContent: [{ label: "essay", text: trimmed }],
        };
      }

      const options = question.answer ?? [];
      const selected = options
        .map((opt, idx) => {
          const label = normaliseLabel(opt.label, idx);
          return {
            label,
            text: opt.text ?? "",
            selected: answerLabels.includes(label),
          };
        })
        .filter(o => o.selected)
        .map(({ label, text }) => ({ label, text }));

      if (!selected.length) return null;
      return { questionId: question.questionId, answerContent: selected };
    },
    []
  );

  // Lưu câu hiện tại
  const saveCurrentQuestion = useCallback(async () => {
    const question = exam.questions[currentIdx];
    if (!question) return;

    const entry = buildEntryForQuestion(question, answers[currentIdx], essayContents[currentIdx]);
    if (!entry) return;

    const payload: SubmitAttemptInput = { attemptId, answers: [entry] };
    try {
      await submitAttempt(payload);
    } catch {
      // ignore
    }
  }, [answers, attemptId, buildEntryForQuestion, currentIdx, essayContents, exam.questions, submitAttempt]);

  // Nộp bài
  const handleSubmitExam = useCallback(async () => {
    if (hasSubmitted) return;

    const entries = exam.questions
      .map((q, i) => buildEntryForQuestion(q, answers[i], essayContents[i]))
      .filter(Boolean) as SubmitAttemptInput["answers"];

    const payload: SubmitAttemptInput = { attemptId, answers: entries };

    try {
      await submitAttempt(payload);
      setHasSubmitted(true);
    } catch {
      // TODO: toast
    }
  }, [answers, attemptId, buildEntryForQuestion, essayContents, exam.questions, hasSubmitted, submitAttempt]);

  // Điều hướng
  const goTo = useCallback((idx: number) => {
    if (idx === currentIdx) return;
    void saveCurrentQuestion().finally(() => setCurrentIdx(idx));
  }, [currentIdx, saveCurrentQuestion]);

  const handleNext = useCallback(() => {
    const next = Math.min(total - 1, currentIdx + 1);
    if (next === currentIdx) return;
    void saveCurrentQuestion().finally(() => setCurrentIdx(next));
  }, [currentIdx, saveCurrentQuestion, total]);

  const handlePrev = useCallback(() => {
    const prev = Math.max(0, currentIdx - 1);
    if (prev === currentIdx) return;
    void saveCurrentQuestion().finally(() => setCurrentIdx(prev));
  }, [currentIdx, saveCurrentQuestion]);

  const handleFinishExam = useCallback(() => {
    // void handleSubmitExam();
  }, [handleSubmitExam]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
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
            onPrev={handlePrev}
            onNext={handleNext}
            isFirst={currentIdx === 0}
            isLast={currentIdx === total - 1}
            onSubmit={handleFinishExam}
            timeRemainingLabel={timeLabel}
            timeVariant={timeVariant}
            isSubmitting={isSubmitting || hasSubmitted}
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
            progress={progress}
            timeRemainingLabel={timeLabel}
            timeVariant={timeVariant}
            onSubmit={handleFinishExam}
            isSubmitting={isSubmitting || hasSubmitted}
          />
        </div>
      </div>
    </div>
  );
};

// Helpers
function formatTime(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map(v => v.toString().padStart(2, "0")).join(":");
}

function normaliseLabel(label: string | undefined, index: number) {
  return label?.trim() || String.fromCharCode(65 + index);
}