import { questionAPI } from "@/lib/api/question/question";
import type { QuestionInput } from "@/schema/questionSchema";
import { QUERY_KEY } from "@/utils/constants";
import type { QuestionQuery } from "@/utils/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export const useQuestion = () => {
    const queryClient = useQueryClient();
    const useGetQuestions = (filters: QuestionQuery) => {
        return useQuery({
            queryKey: [QUERY_KEY.question(filters)],
            queryFn: () => questionAPI.getQuestions(filters),
            staleTime: 5 * 60 * 1000,
        });
    }

    const useGetQuestionById = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.questionById(id)],
            queryFn: () => questionAPI.getQuestionById(id, {IsShowAnswer: true, IsShowCorrectAnswer: true }),
            staleTime: 5 * 60 * 1000,
        });
    }

    const usePostQuestion = useMutation({
        mutationFn: async (data: QuestionInput) => {
            return await questionAPI.createQuestion(data);
        },
        onSuccess: async () => {
            const freshData = await questionAPI.getQuestions({
                PageNumber: 1,
                PageSize: 10,
                Search: '',
                IsAdmin: false,
                IsShowAnswer: true,
                IsShowCorrectAnswer: true,
            });
            queryClient.setQueryData([QUERY_KEY.question({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false, IsShowAnswer: true, IsShowCorrectAnswer: true })], freshData);
        }
    })
    const usePutQuestion = useMutation({
        mutationFn: async ({ id, data }: { id: number, data: QuestionInput }) => {
            return await questionAPI.updateQuestion(id, data);
        },
        onSuccess: async (_res, variables) => {
            const { id } = variables;
            const freshList = await questionAPI.getQuestions({
                PageNumber: 1,
                PageSize: 10,
                Search: '',
                IsAdmin: false,
                IsShowAnswer: true,
                IsShowCorrectAnswer: true,
            });
            queryClient.setQueryData([QUERY_KEY.question({ PageNumber: 1, PageSize: 10, Search: '', IsAdmin: false, IsShowAnswer: true, IsShowCorrectAnswer: true })], freshList);

            const freshDetail = await questionAPI.getQuestionById(id, { IsAdmin: false, IsShowAnswer: true, IsShowCorrectAnswer: true });
            queryClient.setQueryData([QUERY_KEY.questionById(id)], freshDetail);
        }
    });
    const useDeleteQuestion = useMutation({
        mutationFn: async (id: number) => {
            return await questionAPI.deleteQuestion(id);
        }
    })
    const useRestoreQuestion = useMutation({
        mutationFn: async (id: number) => {
            return await questionAPI.restoreQuestion(id);
        }
    })

    return { useGetQuestions, useGetQuestionById, usePostQuestion, usePutQuestion, useDeleteQuestion, useRestoreQuestion };
}