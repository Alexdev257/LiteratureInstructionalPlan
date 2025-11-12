"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  GetAllUserResponseDTO,
  GetAllUserQuery,
  AdminUserCreateInput,
  AdminUserUpdateInput,
  ResponseData,
  PaginationResponse,
  // Sửa các type import sang DTO
  GetUserResponseDTO,
  UserCreateResponseDTO,
  UserUpdateResponseDTO,
  UserDeleteResponseDTO,
  UserRestoreResponseDTO,
} from "@/utils/type";
import { adminApi } from "@/lib/api/admin/adminApi";
import { toast } from "sonner";

const USER_QUERY_KEY = "adminUsers";

export const useAdminUsers = () => {
  const queryClient = useQueryClient();

  // Query: Lấy danh sách người dùng (Read)
  const useGetUsers = (filters: GetAllUserQuery) => {
    return useQuery<ResponseData<PaginationResponse<GetAllUserResponseDTO>>, Error>({
      queryKey: [USER_QUERY_KEY, filters],
      queryFn: () => adminApi.getUsers(filters),
      placeholderData: (previousData) => previousData,
    });
  };

  // Query: Lấy 1 người dùng (Read)
  const useGetUserById = (id: number, options = { enabled: true }) => {
     return useQuery<ResponseData<GetUserResponseDTO>, Error>({ // Sửa: T là ResponseData<DTO>
      queryKey: [USER_QUERY_KEY, 'detail', id],
      queryFn: () => adminApi.getUserById(id),
      enabled: options.enabled && !!id,
     });
  };

  // Mutation: Tạo người dùng (Create)
  const useCreateUser = () => {
    return useMutation<ResponseData<UserCreateResponseDTO>, Error, AdminUserCreateInput>({ // Sửa: T là ResponseData<DTO>
      mutationFn: (data) => adminApi.createUser(data),
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Tạo người dùng thành công!");
          queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
        } else {
          toast.error(res.message || "Tạo người dùng thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Cập nhật người dùng (Update)
  const useUpdateUser = () => {
    return useMutation<ResponseData<UserUpdateResponseDTO>, Error, AdminUserUpdateInput>({ // Sửa: T là ResponseData<DTO>
      mutationFn: (data) => adminApi.updateUser(data),
       onSuccess: (res, variables) => {
        if (res.isSuccess) {
          toast.success(res.message || "Cập nhật thành công!");
          queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY, 'detail', variables.userId] });
        } else {
          toast.error(res.message || "Cập nhật thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };

  // Mutation: Xóa người dùng (Delete)
  const useDeleteUser = () => {
    return useMutation<ResponseData<UserDeleteResponseDTO>, Error, number>({ // Sửa: T là ResponseData<DTO>
      mutationFn: (id) => adminApi.deleteUser(id),
       onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xóa người dùng thành công!");
          queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
        } else {
          toast.error(res.message || "Xóa thất bại.");
        }
      },
      onError: (error) => {
         toast.error(error.message || "Đã có lỗi xảy ra.");
      }
    });
  };
  
  // Mutation: Khôi phục người dùng (Restore)
  const useRestoreUser = () => {
    return useMutation<ResponseData<UserRestoreResponseDTO>, Error, number>({ // Sửa: T là ResponseData<DTO>
      mutationFn: (id) => adminApi.restoreUser(id),
       onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Khôi phục người dùng thành công!");
          queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
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
    useGetUsers, 
    useGetUserById,
    useCreateUser,
    useUpdateUser,
    useDeleteUser,
    useRestoreUser
  };
};