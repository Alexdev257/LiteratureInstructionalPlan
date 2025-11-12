"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  GetAllMatrixQuery,
  ExamMatrixGetAllResponseDTO,
  GetExamMatrixResponseDTO,
  ExamMatrixCreateResponseDTO,
  ExamMatrixUpdateResponseDTO,
  ExamMatrixDeleteResponseDTO,
  ExamMatrixRestoreResponseDTO,
  ResponseData,
  PaginationResponse,
} from "@/utils/type";
// SỬA LỖI IMPORT:
import type { MatrixInput } from "@/schema/matrixSchema"; // Import từ file schema
import { matrixAdminApi } from "@/lib/api/admin/matrixApi"; 
import { toast } from "sonner";

const MATRIX_QUERY_KEY = "adminMatrices";

export const useAdminMatrix = () => {
  const queryClient = useQueryClient();

  // Query: Lấy danh sách
  const useGetMatrices = (filters: GetAllMatrixQuery) => {
    return useQuery<ResponseData<PaginationResponse<ExamMatrixGetAllResponseDTO>>, Error>({
      queryKey: [MATRIX_QUERY_KEY, filters],
      queryFn: () => matrixAdminApi.getMatrices(filters),
      placeholderData: (previousData) => previousData,
    });
  };

  // Query: Lấy 1
  const useGetMatrixById = (id: number, options = { enabled: true }) => {
    return useQuery<ResponseData<GetExamMatrixResponseDTO>, Error>({
      queryKey: [MATRIX_QUERY_KEY, 'detail', id],
      queryFn: () => matrixAdminApi.getMatrixById(id),
      enabled: options.enabled && !!id,
    });
  };

  // Mutation: Tạo
  const useCreateMatrix = () => {
    return useMutation<ResponseData<ExamMatrixCreateResponseDTO>, Error, MatrixInput>({
      mutationFn: (data: MatrixInput) => matrixAdminApi.createMatrix(data),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Tạo ma trận thành công!");
          queryClient.invalidateQueries({ queryKey: [MATRIX_QUERY_KEY] });
        } else {
          toast.error(res.message || "Tạo ma trận thất bại.");
        }
      },
      onError: (error) => {
        toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };
  
  // Mutation: Cập nhật
  const useUpdateMatrix = () => {
    return useMutation<ResponseData<ExamMatrixUpdateResponseDTO>, Error, { id: number, data: MatrixInput }>({
      mutationFn: ({ id, data }) => matrixAdminApi.updateMatrix(id, data),
      onSuccess: (res, variables) => {
        if (res.isSuccess) {
          toast.success(res.message || "Cập nhật thành công!");
          queryClient.invalidateQueries({ queryKey: [MATRIX_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [MATRIX_QUERY_KEY, 'detail', variables.id] });
        } else {
          toast.error(res.message || "Cập nhật thất bại.");
        }
      },
      onError: (error) => {
        toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Xóa
  const useDeleteMatrix = () => {
    return useMutation<ResponseData<ExamMatrixDeleteResponseDTO>, Error, number>({
      mutationFn: (id: number) => matrixAdminApi.deleteMatrix(id),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xóa ma trận thành công!");
          queryClient.invalidateQueries({ queryKey: [MATRIX_QUERY_KEY] });
        } else {
          toast.error(res.message || "Xóa thất bại.");
        }
      },
      onError: (error) => {
        toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Khôi phục
  const useRestoreMatrix = () => {
    return useMutation<ResponseData<ExamMatrixRestoreResponseDTO>, Error, number>({
      mutationFn: (id: number) => matrixAdminApi.restoreMatrix(id),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Khôi phục ma trận thành công!");
          queryClient.invalidateQueries({ queryKey: [MATRIX_QUERY_KEY] });
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
    useGetMatrices, 
    useGetMatrixById, 
    useCreateMatrix,
    useUpdateMatrix,
    useDeleteMatrix,
    useRestoreMatrix
  };
};