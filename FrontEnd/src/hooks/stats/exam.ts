

import type { StatCard } from "@/components/layout/base/stats";

import { useMemo } from "react";
import { useExam } from "../useExam";
import { FileText } from "lucide-react";




export function useExamStats() {

    const { useGetExam, useGetExamAttempts } = useExam()
    const { data: examData, isLoading } = useGetExam();
    const { data: examAttemptData } = useGetExamAttempts();
    const stats: StatCard[] = useMemo(() => {
         return [
            {
                label: "Tổng số đề thi",
                value: examData?.data?.totalItems || 0,
                description: "Tất cả đề thi đã tạo",
                color: "text-blue-600",
                icon: FileText,
            },{
                label: "Tổng số lần làm bài",
                value: examAttemptData?.data?.totalItems || 0,
                description: "Tất cả lần làm bài thi",
                color: "text-green-600",
                icon: FileText,
            },
            {
                label: "Đề thi hoạt động",
                value:  5,
                description: "Đề thi đang hoạt động",
                color: "text-purple-600",
                icon: FileText,
            },
            {
                label: "Đề thi đã xóa",
                value:  2,
                description: "Đề thi đã bị xóa",
                color: "text-red-600",
                icon: FileText,
            }
         ]


    }, [examData, examAttemptData])

    return { stats, isLoading }
}