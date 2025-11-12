import { examApi } from "@/lib/api/exam/exam";
import type { CreateExamInput, UpdateExamInput } from "@/schema/examSchema";
import { QUERY_KEY } from "@/utils/constants";
import type { ExamAttemptQuery, ExamQuery } from "@/utils/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useExam = () => {
    const queryClient = useQueryClient();
    const useGetExam = (filters?: ExamQuery) => {
        return useQuery({
            queryKey: [QUERY_KEY.exam(filters)],
            queryFn: () => examApi.getExam(filters),
            staleTime: 5 * 60 * 1000,
        });
    }
    const useGetExamById = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.getExamById(id)],
            queryFn: () => examApi.getExamById(id, { IsShowCorrectAnswer: true }),
            staleTime: 5 * 60 * 1000,
        });
    }

    const useGetExamByStudent = (filters?: ExamQuery) => {
        return useQuery({
            queryKey: [QUERY_KEY.getExamForStudent(filters)],
            queryFn: () => examApi.getExam(filters),
            staleTime: 5 * 60 * 1000,
        });
    }
    const useGetExamIdByStudent = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.getExamForStudentById(id)],
            queryFn: () => examApi.getExamById(id),
            staleTime: 5 * 60 * 1000,
        });
    }
    const usePostExam = useMutation({
        mutationFn: async (data: CreateExamInput) => {
            return await examApi.createExam(data);
        }
    })
    const usePutExam = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateExamInput }) => {
            return await examApi.updateExam(id, data);
        },
        onSuccess: async (_res, variables) => {
            const { id } = variables;
            const freshDetail = await examApi.getExamById(id, { IsShowCorrectAnswer: true });
            queryClient.setQueryData([QUERY_KEY.getExamById(id)], freshDetail);

            const freshData = await examApi.getExam({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false });
            queryClient.setQueryData([QUERY_KEY.exam({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false })], freshData);
        }
    })
    const useDeleteExam = useMutation({
        mutationFn: async (id: number) => {
            return await examApi.deleteExam(id);
        },
        onSuccess: async () => {
            const freshData = await examApi.getExam({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false });
            queryClient.setQueryData([QUERY_KEY.exam({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false })], freshData);
        },
    })
    const useRestoreExam = useMutation({
        mutationFn: async (id: number) => {
            return await examApi.restoreExam(id);
        },
        onSuccess: async () => {
            const freshData = await examApi.getExam({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false });
            queryClient.setQueryData([QUERY_KEY.exam({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false })], freshData);
        },
    })
    const useGetExamAttempts = (filters?: ExamAttemptQuery) => {
        return useQuery({
            queryKey: [QUERY_KEY.examAttempts(filters)],
            queryFn: () => examApi.getExamAttempts(filters),
            staleTime: 5 * 60 * 1000,
        });
    }
    const useGetExamAttemptById = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.examAttemptById(id)],
            queryFn: () => examApi.getExamAttemptById(id),
            staleTime: 5 * 60 * 1000,
        });
    }

    const useStartExam = useMutation({
        mutationFn: async (data: { ExamId: number; UserId:number}) => {
            return await examApi.startExam(data);
        },
    });
    return { useGetExam, useGetExamById, useGetExamAttempts, useGetExamAttemptById, useGetExamIdByStudent,useGetExamByStudent, useStartExam,usePutExam, useDeleteExam, useRestoreExam, usePostExam };
};