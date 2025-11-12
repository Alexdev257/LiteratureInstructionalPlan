import { examApi } from "@/lib/api/exam/exam";
import { QUERY_KEY } from "@/utils/constants";
import type { ExamQuery } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";



export const useExam = () => {
    const useGetExam = (filters: ExamQuery) => {
        return useQuery({
            queryKey: [QUERY_KEY.exam(filters)],
            queryFn: () => examApi.getExam(filters),
            staleTime: 5 * 60 * 1000, 
        });
    }
    const useGetExamById = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.getExamById(id)],
            queryFn: () => examApi.getExamById(id),
            staleTime: 5 * 60 * 1000, 
        });
    }




    return { useGetExam , useGetExamById};
};