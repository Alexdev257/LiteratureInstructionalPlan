import type { StatCard } from "@/components/layout/base/stats";
import { useQuestion } from "../useQuestion";
import { useMemo } from "react";
import { ListChecks, ListPlus, CircleDot, PenLine } from "lucide-react";



export function useQuestioningStats() {
    const { useGetQuestions } = useQuestion();
    const { data, isLoading } = useGetQuestions({ PageSize: 1000 });

    const stats: StatCard[] = useMemo(() => {
        const questions = data?.data?.items || [];

        const totalQuestions = questions.length;
        const multipleChoiceQuestions = questions.filter(q => q.questionType === '1').length;
        const singleChoiceQuestions = questions.filter(q => q.questionType === '2').length;
        return [
            {
                label: "Tổng số câu hỏi",
                value: totalQuestions,
                icon: ListChecks,
                color: "text-blue-600",
                description: "Tất cả câu hỏi đã tạo",
            },
            {
                label: "Câu hỏi nhiều đáp án",
                value: multipleChoiceQuestions,
                icon: ListPlus,
                color: "text-green-600",
                description: "Câu hỏi nhiều đáp án đã tạo",
            },
            {
                label: "Câu hỏi một đáp án",
                value: singleChoiceQuestions,
                icon: CircleDot,
                color: "text-yellow-600",
                description: "Câu hỏi một đáp án đã tạo",
            },
            {
                label: "Câu hỏi tự luận",
                value: totalQuestions - multipleChoiceQuestions - singleChoiceQuestions,
                icon: PenLine,
                color: "text-red-600",
                description: "Câu hỏi tự luận đã tạo",
            },
        ];
    }, [data])

    return { stats, isLoading }
}