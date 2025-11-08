import { examTypeApi } from "@/lib/api/examType/examType";
import { QUERY_KEY } from "@/utils/constants";
import type { ExamTypeQuery } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";




export const useExamType = () => {
    const useGetExamTypes = (filters: ExamTypeQuery) => {
        return useQuery({
            queryKey: [QUERY_KEY.examType(filters)],
            queryFn: () => examTypeApi.getExamTypes(filters),
            staleTime: 5 * 60 * 1000, 
        });
    }
    const useGetExamTypeById = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.examTypeById(id)],
            queryFn: () => examTypeApi.getExamTypeById(id),
            staleTime: 5 * 60 * 1000, 
        });
    }




    return { useGetExamTypes , useGetExamTypeById};
};


