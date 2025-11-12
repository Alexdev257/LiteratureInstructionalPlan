"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  GetAllTemplateQuery,
  TemplateGetDTO,
  TemplateCreateResponseDTO,
  TemplateDeleteResponseDTO,
  TemplateRestoreResponseDTO,
  ResponseData,
  PaginationResponse,
} from "@/utils/type";
import type { TemplateInput } from "@/schema/templateSchema"; // Import từ schema
import { templateAdminApi } from "@/lib/api/admin/templateApi"; // Import API mới
import { toast } from "sonner";

const TEMPLATE_QUERY_KEY = "adminTemplates"; // Key riêng

export const useAdminTemplate = () => {
  const queryClient = useQueryClient();

  // Query: Lấy danh sách
  const useGetTemplates = (filters: GetAllTemplateQuery) => {
    return useQuery<ResponseData<PaginationResponse<TemplateGetDTO>>, Error>({
      queryKey: [TEMPLATE_QUERY_KEY, filters],
      queryFn: () => templateAdminApi.getTemplates(filters),
      placeholderData: (previousData) => previousData,
    });
  };

  // Query: Lấy 1
  const useGetTemplateById = (id: number, options = { enabled: true }) => {
    return useQuery<ResponseData<TemplateGetDTO>, Error>({
      queryKey: [TEMPLATE_QUERY_KEY, 'detail', id],
      queryFn: () => templateAdminApi.getTemplateById(id),
      enabled: options.enabled && !!id,
    });
  };

  // Mutation: Tạo
  const useCreateTemplate = () => {
    return useMutation<ResponseData<TemplateCreateResponseDTO>, Error, TemplateInput>({
      mutationFn: (data: TemplateInput) => templateAdminApi.createTemplate(data),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Tạo giáo án thành công!");
          queryClient.invalidateQueries({ queryKey: [TEMPLATE_QUERY_KEY] });
        } else {
          toast.error(res.message || "Tạo giáo án thất bại.");
        }
      },
      onError: (error) => {
        toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Xóa
  const useDeleteTemplate = () => {
    return useMutation<ResponseData<TemplateDeleteResponseDTO>, Error, number>({
      mutationFn: (id: number) => templateAdminApi.deleteTemplate(id),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xóa giáo án thành công!");
          queryClient.invalidateQueries({ queryKey: [TEMPLATE_QUERY_KEY] });
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
  const useRestoreTemplate = () => {
    return useMutation<ResponseData<TemplateRestoreResponseDTO>, Error, number>({
      mutationFn: (id: number) => templateAdminApi.restoreTemplate(id), // API giả định
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Khôi phục thành công!");
          queryClient.invalidateQueries({ queryKey: [TEMPLATE_QUERY_KEY] });
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
    useGetTemplates,
    useGetTemplateById,
    useCreateTemplate,
    useDeleteTemplate,
    useRestoreTemplate
  };
};