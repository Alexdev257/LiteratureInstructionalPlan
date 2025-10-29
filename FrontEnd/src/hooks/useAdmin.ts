import { useMutation, useQuery } from "@tanstack/react-query";
import type { AdminUser, CreateAdminInput, ResponseData, ResponseNull, UserFilters } from "@/utils/type";
import { adminApi } from "@/lib/api/admin/admin";

export const useAdmin = () => {
  // Query: Lấy danh sách người dùng
  const useGetUsers = (filters: UserFilters) => {
    return useQuery<ResponseData<AdminUser[]>, Error>({
      queryKey: ["admin", "users", filters],
      queryFn: () => adminApi.getUsers(filters),
      // Giữ lại data cũ khi fetch data mới (paging, filter)
      placeholderData: (previousData) => previousData,
    });
  };

  // Mutation: Tạo Admin/Giáo viên
  const useCreateAdmin = () => {
    return useMutation<ResponseData<ResponseNull>, Error, CreateAdminInput>({
      mutationFn: (data: CreateAdminInput) => adminApi.createAdmin(data),
    });
  };

  return { useGetUsers, useCreateAdmin };
};