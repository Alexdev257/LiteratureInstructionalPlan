import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { QuestionCard } from "./QuestionCard";
import { QuestionNavigator } from "./QuestionNavigator";
import type { ExamData, Question } from "@/utils/type";
import { ExamStatsSidebar } from "./ExamStatsSidebar";
import { useExam } from "@/hooks/useExam";
import type { SubmitAttemptInput } from "@/schema/examSchema";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

interface Props {
  exam: ExamData;
  attemptId: number;
  // onSuccess?: () => void; ← ĐÃ XÓA
}

type AnswerMap = Record<number, string[]>;
type EssayMap = Record<number, string>;

export const ExamTaking = ({ exam, attemptId }: Props) => {
  const { useSubmitExam: submitExamMutation, useFinalSubmitExam } = useExam();
  const { mutateAsync: submitExam, isPending: isSubmitting } = submitExamMutation;
  const finalSubmitMutation = useFinalSubmitExam(); // Gọi như hàm
  const { mutateAsync: finalSubmitExam, isPending: isFinalSubmitting } = finalSubmitMutation;
  const router = useRouter()
  const [currentIdx, setCurrentIdx] = useState(0);
  const [draftAnswers, setDraftAnswers] = useState<AnswerMap>({});
  const [draftEssayContents, setDraftEssayContents] = useState<EssayMap>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSavingCurrent, setIsSavingCurrent] = useState(false);

  // ===============================
  // 1. Lấy đáp án cũ từ API
  // ===============================
  const baseAnswers = useMemo(() => {
    const map: AnswerMap = {};
    exam.questions.forEach((q, i) => {
      if (!q.studentAnswer?.length || q.questionType === "3") return;
      const labels = q.studentAnswer
        .map(a => a.label)
        .filter((l): l is string => !!l && l.trim() !== "");
      if (labels.length) map[i] = labels;
    });
    return map;
  }, [exam.questions]);

  const baseEssayContents = useMemo(() => {
    const map: EssayMap = {};
    exam.questions.forEach((q, i) => {
      if (q.questionType !== "3" || !q.studentAnswer?.length) return;
      const text = q.studentAnswer.find(a => a.label === "essay")?.text?.trim();
      if (text) map[i] = text;
    });
    return map;
  }, [exam.questions]);

  const answers = { ...baseAnswers, ...draftAnswers };
  const essayContents = { ...baseEssayContents, ...draftEssayContents };

  // ===============================
  // EndTime với localStorage
  // ===============================
  const endTime = useMemo(() => {
    const key = `exam-end-${attemptId}`;
    const saved = localStorage.getItem(key);
    if (saved) return new Date(saved);

    const t = new Date(Date.now() + exam.durationMinutes * 60 * 1000);
    localStorage.setItem(key, t.toISOString());
    return t;
  }, [exam.durationMinutes, attemptId]);

  const remainingSecondsRef = useRef<number>(
    Math.max(0, Math.floor((endTime.getTime() - Date.now()) / 1000))
  );
  const [displaySeconds, setDisplaySeconds] = useState(remainingSecondsRef.current);

  const total = exam.questions.length;
  const currentQ = exam.questions[currentIdx];

  const completedCount =
    Object.values(answers).filter(a => a.length > 0).length +
    Object.values(essayContents).filter(v => v.trim().length > 0).length;
  const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const timeVariant = useMemo(() => (displaySeconds <= 300 ? "danger" : "normal"), [displaySeconds]);
  const timeLabel = useMemo(() => formatTime(displaySeconds), [displaySeconds]);

  const isAnySubmitting = isSubmitting || isFinalSubmitting || hasSubmitted || isSavingCurrent;

  // ===============================
  // Build payload 1 câu
  // ===============================
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
          return { label, text: opt.text ?? "", selected: answerLabels.includes(label) };
        })
        .filter(o => o.selected)
        .map(({ label, text }) => ({ label, text }));

      if (!selected.length) return null;
      return { questionId: question.questionId, answerContent: selected };
    },
    []
  );

  // ===============================
  // Lưu câu hiện tại
  // ===============================
  const saveCurrentQuestion = useCallback(async () => {
    if (hasSubmitted || isAnySubmitting || isSavingCurrent) return;
    setIsSavingCurrent(true);

    const question = exam.questions[currentIdx];
    if (!question) {
      setIsSavingCurrent(false);
      return;
    }

    const entry = buildEntryForQuestion(question, answers[currentIdx], essayContents[currentIdx]);
    if (!entry) {
      setIsSavingCurrent(false);
      return;
    }

    const payload: SubmitAttemptInput = { attemptId, answers: [entry] };
    try {
      await submitExam(payload);
    } catch (error) {
      console.error("Lỗi khi lưu câu hỏi:", error);
      toast.error("Đã xảy ra lỗi khi lưu câu hỏi. Vui lòng thử lại.");
    } finally {
      setIsSavingCurrent(false);
    }
  }, [
    answers,
    attemptId,
    buildEntryForQuestion,
    currentIdx,
    essayContents,
    exam.questions,
    hasSubmitted,
    isAnySubmitting,
    isSavingCurrent,
    submitExam,
  ]);

  // ===============================
  // Nộp bài cuối → await + onSuccess trong hook
  // ===============================
  const handleFinishExam = useCallback(async () => {
    if (hasSubmitted || isAnySubmitting) return;

    setIsSavingCurrent(true);

    try {
      await saveCurrentQuestion().catch(() => { });

      const entries = exam.questions
        .map((q, i) => buildEntryForQuestion(q, answers[i], essayContents[i]))
        .filter(Boolean) as SubmitAttemptInput["answers"];

      const payload: SubmitAttemptInput = { attemptId, answers: entries };

      // onSuccess sẽ tự redirect trong useFinalSubmitExam
      await finalSubmitExam(payload);

      setHasSubmitted(true);
      localStorage.removeItem(`exam-end-${attemptId}`);
      // toast.success("Nộp bài thành công!");
      router.navigate({
        to: "/exam/$examId/$attemptId/result",
        params: { examId: exam.examId.toString(), attemptId: attemptId.toString() }
      });
    } catch (error) {
      console.error("Lỗi nộp bài cuối:", error);
      toast.error("Nộp bài thất bại. Vui lòng thử lại.");
    } finally {
      setIsSavingCurrent(false);
    }
  }, [
    hasSubmitted,
    isAnySubmitting,
    saveCurrentQuestion,
    exam.questions,
    exam.examId,
    answers,
    essayContents,
    attemptId,
    buildEntryForQuestion,
    finalSubmitExam,
    router,
    // onSuccess ← ĐÃ XÓA
  ]);

  // ===============================
  // Countdown → dừng khi nộp
  // ===============================
  useEffect(() => {
    if (hasSubmitted) return;

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
          void handleFinishExam();
          return;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hasSubmitted, handleFinishExam]);

  // ===============================
  // Xử lý chọn đáp án / essay
  // ===============================
  const handleSelect = (selected: string[]) => {
    setDraftAnswers(prev => ({ ...prev, [currentIdx]: selected }));
  };

  const handleEssay = (content: string) => {
    setDraftEssayContents(prev => ({ ...prev, [currentIdx]: content }));
  };

  // ===============================
  // Điều hướng: TỰ ĐỘNG LƯU nếu có đáp án
  // ===============================
  const goTo = useCallback(
    (idx: number) => {
      if (idx === currentIdx) return;

      const hasAnswer =
        (answers[currentIdx]?.length ?? 0) > 0 ||
        (essayContents[currentIdx]?.trim().length ?? 0) > 0;

      if (hasAnswer) {
        void saveCurrentQuestion().finally(() => setCurrentIdx(idx));
      } else {
        setCurrentIdx(idx);
      }
    },
    [currentIdx, answers, essayContents, saveCurrentQuestion]
  );

  const handleNext = useCallback(() => {
    const next = Math.min(total - 1, currentIdx + 1);
    if (next === currentIdx) return;

    const hasAnswer =
      (answers[currentIdx]?.length ?? 0) > 0 ||
      (essayContents[currentIdx]?.trim().length ?? 0) > 0;

    if (hasAnswer) {
      void saveCurrentQuestion().finally(() => setCurrentIdx(next));
    } else {
      setCurrentIdx(next);
    }
  }, [currentIdx, answers, essayContents, saveCurrentQuestion, total]);

  const handlePrev = useCallback(() => {
    const prev = Math.max(0, currentIdx - 1);
    if (prev === currentIdx) return;

    const hasAnswer =
      (answers[currentIdx]?.length ?? 0) > 0 ||
      (essayContents[currentIdx]?.trim().length ?? 0) > 0;

    if (hasAnswer) {
      void saveCurrentQuestion().finally(() => setCurrentIdx(prev));
    } else {
      setCurrentIdx(prev);
    }
  }, [currentIdx, answers, essayContents, saveCurrentQuestion]);

  // ===============================
  // Render
  // ===============================
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8 mt-8">
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
            isSubmitting={isAnySubmitting}
            isSaving={isSavingCurrent}
          />
        </div>

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
            isSubmitting={isAnySubmitting}
          />
        </div>
      </div>
    </div>
  );
};

// ===============================
// Helpers
// ===============================
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