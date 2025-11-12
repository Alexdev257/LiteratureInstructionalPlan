// --- File: src/hooks/useQuestionAdmin.ts ---
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  GetAllPracticeQuestionResponseDTO,
  GetPracticequestionResponseDTO,
  PracticeQuestionCreateResponseDTO,
  PracticeQuestionUpdateResponseDTO,
  PracticeQuestionDeleteResponseDTO,
  PracticeQuestionRestoreResponseDTO,
  GetAllPracticequestionQuery,
  AdminCreateQuestionInput,
  AdminUpdateQuestionInput,
  ResponseData,
  PaginationResponse,
} from "@/utils/type";
import { questionAdminApi } from "@/lib/api/admin/questionApi";
import { toast } from "sonner";

const QUESTION_QUERY_KEY = "adminQuestions";

export const useQuestionAdmin = () => {
  const queryClient = useQueryClient();

  // Query: Lấy danh sách câu hỏi (Read)
  const useGetQuestions = (filters: GetAllPracticequestionQuery) => {
    return useQuery<ResponseData<PaginationResponse<GetAllPracticeQuestionResponseDTO>>, Error>({
      queryKey: [QUESTION_QUERY_KEY, filters],
      queryFn: () => questionAdminApi.getQuestions(filters),
      placeholderData: (previousData) => previousData,
    });
  };

  // Query: Lấy 1 câu hỏi (Read)
  const useGetQuestionById = (id: number, options = { enabled: true }) => {
     return useQuery<ResponseData<GetPracticequestionResponseDTO>, Error>({
      queryKey: [QUESTION_QUERY_KEY, 'detail', id],
      queryFn: () => questionAdminApi.getQuestionById(id),
      enabled: options.enabled && !!id,
     });
  };

  // Mutation: Tạo câu hỏi (Create)
  const useCreateQuestion = () => {
    return useMutation<ResponseData<PracticeQuestionCreateResponseDTO>, Error, AdminCreateQuestionInput>({
      mutationFn: (data) => questionAdminApi.createQuestion(data),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Tạo câu hỏi thành công!");
          queryClient.invalidateQueries({ queryKey: [QUESTION_QUERY_KEY] });
        } else {
          toast.error(res.message || "Tạo câu hỏi thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Cập nhật câu hỏi (Update)
  const useUpdateQuestion = () => {
    return useMutation<ResponseData<PracticeQuestionUpdateResponseDTO>, Error, AdminUpdateQuestionInput>({
      mutationFn: (data) => questionAdminApi.updateQuestion(data),
       onSuccess: (res, variables) => {
        if (res.isSuccess) {
          toast.success(res.message || "Cập nhật thành công!");
          queryClient.invalidateQueries({ queryKey: [QUESTION_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [QUESTION_QUERY_KEY, 'detail', variables.questionId] });
        } else {
          toast.error(res.message || "Cập nhật thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Xóa câu hỏi (Delete)
  const useDeleteQuestion = () => {
    return useMutation<ResponseData<PracticeQuestionDeleteResponseDTO>, Error, number>({
      mutationFn: (id) => questionAdminApi.deleteQuestion(id),
       onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xóa câu hỏi thành công!");
          queryClient.invalidateQueries({ queryKey: [QUESTION_QUERY_KEY] });
        } else {
          toast.error(res.message || "Xóa thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };
  
  // Mutation: Khôi phục câu hỏi (Restore)
  const useRestoreQuestion = () => {
    return useMutation<ResponseData<PracticeQuestionRestoreResponseDTO>, Error, number>({
      mutationFn: (id) => questionAdminApi.restoreQuestion(id),
       onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Khôi phục câu hỏi thành công!");
          queryClient.invalidateQueries({ queryKey: [QUESTION_QUERY_KEY] });
        } else {
          toast.error(res.message || "Khôi phục thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  return { 
    useGetQuestions, 
    useGetQuestionById,
    useCreateQuestion,
    useUpdateQuestion,
    useDeleteQuestion,
    useRestoreQuestion
  };
};