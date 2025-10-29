import { useState, useMemo } from "react"; // Thêm useMemo
import { Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// Bỏ import useAdmin vì không gọi API nữa
// import { useAdmin } from "@/hooks/useAdmin";
import type { UserFilters, AdminUser } from "@/utils/type";

import { UserToolbar } from "./UserToolbar";
import { UserTable } from "./UserTable";
// Bỏ import toast vì không xử lý lỗi API
// import { toast } from "sonner";

// --- Dữ liệu Mock gốc ---
const allMockUsers: AdminUser[] = [
  { id: '1', fullName: 'admin_test', email: 'admin@dictation.com', avatarUrl: '', status: 'Active', postCount: 120, averageScore: 92.5, lastActivity: '3 minutes ago' },
  { id: '2', fullName: 'student_vip', email: 'vip.user@gmail.com', avatarUrl: '', status: 'Active', postCount: 350, averageScore: 88.8, lastActivity: '1 day ago' },
  { id: '3', fullName: 'banned_user', email: 'ban@gmail.com', avatarUrl: '', status: 'Banned', postCount: 5, averageScore: 55.0, lastActivity: '1 month ago' }, // Giữ lại suspended trong mock data
  { id: '4', fullName: 'banned_bot', email: 'bot@spam.com', avatarUrl: '', status: 'Banned', postCount: 0, averageScore: 0.0, lastActivity: 'N/A' },
  { id: '5', fullName: 'pro_listener', email: 'pro@listener.net', avatarUrl: '', status: 'Active', postCount: 580, averageScore: 95.1, lastActivity: '2 hours ago' },
];
// -----------------------------

export default function UserManagementPage() {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1, // Pagination chưa xử lý
    limit: 10, // Pagination chưa xử lý
    status: "All", // Mặc định là "All"
    search: "",
  });

  // --- Bỏ phần gọi API ---
  // const { useGetUsers } = useAdmin();
  // const { data: usersData, isLoading, isError, error } = useGetUsers(filters);
  const isLoading = false; // Luôn là false khi dùng mock data
  const isError = false;   // Luôn là false khi dùng mock data
  // ----------------------

  // --- Lọc Mock Data trên Client bằng useMemo ---
  const usersToDisplay = useMemo(() => {
    let filteredUsers = allMockUsers;

    // Lọc theo status (nếu không phải "All")
    if (filters.status && filters.status !== "All") {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    // Lọc theo search (kiểm tra cả tên và email)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }

    // TODO: Thêm logic pagination ở đây nếu cần (dựa trên filters.page và filters.limit)

    return filteredUsers;
  }, [filters]); // Chỉ tính toán lại khi filters thay đổi
  // ----------------------------------------------

  // Bỏ phần xử lý lỗi API useEffect

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản Lý Người Dùng</h1>
        <div className="flex gap-1">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Thêm Giáo Viên
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm Admin
          </Button>
        </div>
      </div>

      {/* Toolbar & Table */}
      <Card>
        <CardHeader>
          {/* UserToolbar cập nhật state 'filters' */}
          <UserToolbar
            filters={filters}
            setFilters={setFilters}
          />
        </CardHeader>
        <CardContent>
          {/* Không cần kiểm tra isError nữa */}
          <UserTable
            users={usersToDisplay} // Truyền dữ liệu mock đã lọc
            isLoading={isLoading} // Luôn là false
          />
          {/* Thêm Pagination ở đây nếu cần */}
        </CardContent>
      </Card>
    </div>
  );
}