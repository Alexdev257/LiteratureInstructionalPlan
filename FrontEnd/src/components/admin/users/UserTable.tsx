import type { AdminUser } from "@/utils/type";
import { UserRow } from "./UserRow";

type UserTableProps = {
  users: AdminUser[];
  isLoading: boolean;
};

export function UserTable({ users, isLoading }: UserTableProps) {
  
  const headers = [
    "Người Dùng",
    "Trạng Thái",
    "Bài Kiểm Tra Đã Làm",
    "Điểm TB",
    "Lần Hoạt Động Cuối",
    "Hành Động",
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b">
        <div className="col-span-3 text-xs font-medium text-muted-foreground uppercase">
          {headers[0]}
        </div>
        <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase">
          {headers[1]}
        </div>
        <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase">
          {headers[2]}
        </div>
        <div className="col-span-1 text-xs font-medium text-muted-foreground uppercase">
          {headers[3]}
        </div>
        <div className="col-span-3 text-xs font-medium text-muted-foreground uppercase">
          {headers[4]}
        </div>
        <div className="col-span-1 text-xs font-medium text-muted-foreground uppercase text-right">
          {headers[5]}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {isLoading && (
          <div className="p-6 text-center text-muted-foreground">
            Đang tải dữ liệu...
          </div>
        )}
        {!isLoading && users.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            Không tìm thấy người dùng nào.
          </div>
        )}
        {!isLoading &&
          users.map(user => <UserRow key={user.id} user={user} />)}
      </div>
    </div>
  );
}