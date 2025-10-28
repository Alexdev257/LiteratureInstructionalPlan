import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAdmin } from "@/hooks/useAdmin";
import type { UserFilters, AdminUser } from "@/utils/type";

import { UserToolbar } from "./UserToolbar";
import { UserTable } from "./UserTable";

export default function UserManagementPage() {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    status: "All",
    search: "",
  });

  const { useGetUsers } = useAdmin();
  // Giữ lại usersData và isError để dùng khi kết nối API thật
  // Cảnh báo 'usersData' is declared but its value is never read là bình thường khi đang dùng mock data
  const { data: usersData, isLoading, isError } = useGetUsers(filters);

  const users: AdminUser[] = [
    { id: '1', fullName: 'admin_test', email: 'admin@dictation.com', avatarUrl: '', status: 'Active', postCount: 120, averageScore: 92.5, lastActivity: '3 minutes ago' },
    { id: '2', fullName: 'student_vip', email: 'vip.user@gmail.com', avatarUrl: '', status: 'Active', postCount: 350, averageScore: 88.8, lastActivity: '1 day ago' },
    { id: '3', fullName: 'suspended_user', email: 'suspen@gmail.com', avatarUrl: '', status: 'Suspended', postCount: 5, averageScore: 55.0, lastActivity: '1 month ago' },
    { id: '4', fullName: 'banned_bot', email: 'bot@spam.com', avatarUrl: '', status: 'Banned', postCount: 0, averageScore: 0.0, lastActivity: 'N/A' },
    { id: '5', fullName: 'pro_listener', email: 'pro@listener.net', avatarUrl: '', status: 'Active', postCount: 580, averageScore: 95.1, lastActivity: '2 hours ago' },
  ];

  // --- Khi có API thật, bỏ comment dòng dưới và xóa/comment dòng mock data ở trên ---
  // const users = usersData?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản Lý Người Dùng</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Thêm Admin
        </Button>
      </div>

      {/* Toolbar & Table */}
      <Card>
        <CardHeader>
          <UserToolbar
            filters={filters}
            setFilters={setFilters}
          />
        </CardHeader>
        <CardContent>
          {/* Hiển thị lỗi nếu có */}
          {isError && (
            <div className="text-red-600 p-4 border border-red-200 bg-red-50 rounded-md mb-4">
              Đã có lỗi xảy ra khi tải danh sách người dùng. Vui lòng thử lại.
            </div>
          )}
          {/* Truyền users (từ mock hoặc API) và isLoading xuống UserTable */}
          <UserTable
            users={users} // Hiện tại đang dùng mock data
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}