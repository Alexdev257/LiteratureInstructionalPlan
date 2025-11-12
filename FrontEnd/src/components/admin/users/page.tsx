// --- File: src/components/admin/users/page.tsx ---
"use client";
import { useState } from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import type { GetAllUserQuery } from "@/utils/type"; // [cite: 12520-12560]
import UserPageContent from "./UserPageContent";

export default function UserManagementPage() {
  const [filters, setFilters] = useState<GetAllUserQuery>({
    PageNumber: 1,
    PageSize: 10,
    IsAdmin: true, // Luôn lấy tất cả (admin view)
    RoleId: undefined,
    Email: undefined,
  });

  // --- 1. Fetch Data ---
  const { useGetUsers } = useAdminUsers();
  const { data: usersResponse, isLoading, isError } = useGetUsers(filters);
  // ---------------------
  
  // Lấy dữ liệu và thông tin pagination từ API
  const users = usersResponse?.data?.items ?? [];
  const pagination = {
    currentPage: usersResponse?.data?.pageNumber ?? 1,
    totalPages: usersResponse?.data?.totalPages ?? 1,
    totalItems: usersResponse?.data?.totalItems ?? 0,
    itemsPerPage: usersResponse?.data?.pageSize ?? 10,
  };

  return (
    // --- 2. Truyền props xuống component layout ---
    <UserPageContent
      users={users}
      isLoading={isLoading}
      isError={isError}
      filters={filters}
      setFilters={setFilters}
      paginationData={pagination}
    />
  );
}