// --- File: src/hooks/useAdminExams.ts ---
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  GetAllExamResponseDTO,
  GetExamResponseDTO,
  ExamCreateManualFromMatrixResponseDTO,
  ExamUpdateFromMatrixResponseDTO,
  ExamDeleteResponseDTO,
  ExamRestoreResponseDTO,
  GetAllExamQuery,
  AdminCreateExamInput,
  AdminUpdateExamInput,
  ResponseData,
  PaginationResponse,
} from "@/utils/type";
import { examAdminApi } from "@/lib/api/admin/examApi";
import { toast } from "sonner";

const EXAM_QUERY_KEY = "adminExams";

export const useAdminExams = () => {
  const queryClient = useQueryClient();

  // Query: Lấy danh sách đề thi
  const useGetExams = (filters: GetAllExamQuery) => {
    return useQuery<ResponseData<PaginationResponse<GetAllExamResponseDTO>>, Error>({
      queryKey: [EXAM_QUERY_KEY, filters],
      queryFn: () => examAdminApi.getExams(filters),
      placeholderData: (previousData) => previousData,
    });
  };

  // Query: Lấy 1 đề thi
  const useGetExamById = (id: number, options = { enabled: true }) => {
     return useQuery<ResponseData<GetExamResponseDTO>, Error>({
      queryKey: [EXAM_QUERY_KEY, 'detail', id],
      queryFn: () => examAdminApi.getExamById(id),
      enabled: options.enabled && !!id,
     });
  };

  // Mutation: Tạo đề thi
  const useCreateExam = () => {
    return useMutation<ResponseData<ExamCreateManualFromMatrixResponseDTO>, Error, AdminCreateExamInput>({
      mutationFn: (data) => examAdminApi.createExam(data),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Tạo đề thi thành công!");
          queryClient.invalidateQueries({ queryKey: [EXAM_QUERY_KEY] });
        } else {
          toast.error(res.message || "Tạo đề thi thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Cập nhật đề thi
  const useUpdateExam = () => {
    return useMutation<ResponseData<ExamUpdateFromMatrixResponseDTO>, Error, AdminUpdateExamInput>({
      mutationFn: (data) => examAdminApi.updateExam(data),
       onSuccess: (res, variables) => {
        if (res.isSuccess) {
          toast.success(res.message || "Cập nhật thành công!");
          queryClient.invalidateQueries({ queryKey: [EXAM_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [EXAM_QUERY_KEY, 'detail', variables.examId] });
        } else {
          toast.error(res.message || "Cập nhật thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Xóa đề thi
  const useDeleteExam = () => {
    return useMutation<ResponseData<ExamDeleteResponseDTO>, Error, number>({
      mutationFn: (id) => examAdminApi.deleteExam(id),
       onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xóa đề thi thành công!");
          queryClient.invalidateQueries({ queryKey: [EXAM_QUERY_KEY] });
        } else {
          toast.error(res.message || "Xóa thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };
  
  // Mutation: Khôi phục đề thi
  const useRestoreExam = () => {
    return useMutation<ResponseData<ExamRestoreResponseDTO>, Error, number>({
      mutationFn: (id) => examAdminApi.restoreExam(id),
       onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Khôi phục đề thi thành công!");
          queryClient.invalidateQueries({ queryKey: [EXAM_QUERY_KEY] });
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
    useGetExams, 
    useGetExamById,
    useCreateExam,
    useUpdateExam,
    useDeleteExam,
    useRestoreExam
  };
};