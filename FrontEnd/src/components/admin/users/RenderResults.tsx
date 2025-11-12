// --- File: src/components/admin/users/RenderResults.tsx ---
"use client";
import type { GetAllUserResponseDTO } from "@/utils/type"; // 
import { UserRow } from "./UserRow";

type RenderResultsProps = {
  users: GetAllUserResponseDTO[]; // Dùng DTO
  isLoading: boolean;
  isError: boolean;
  onEdit: (user: GetAllUserResponseDTO) => void;
  onDelete: (user: GetAllUserResponseDTO) => void;
  onRestore: (user: GetAllUserResponseDTO) => void;
};

export function RenderResults({ 
  users, 
  isLoading, 
  isError, 
  onEdit, 
  onDelete, 
  onRestore 
}: RenderResultsProps) {
  
  const headers = [
    "Người Dùng",
    "Vai trò",
    "Trạng Thái",
    "Ngày tạo",
    "Hành Động",
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-10 gap-4 px-6 py-4 bg-gray-50 border-b">
        <div className="col-span-3 text-xs font-medium text-muted-foreground uppercase">{headers[0]}</div>
        <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase">{headers[1]}</div>
        <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase">{headers[2]}</div>
        <div className="col-span-2 text-xs font-medium text-muted-foreground uppercase">{headers[3]}</div>
        <div className="col-span-1 text-xs font-medium text-muted-foreground uppercase text-right">{headers[4]}</div>
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {isLoading && (
          <div className="p-6 text-center text-muted-foreground">
            Đang tải dữ liệu...
          </div>
        )}
        {isError && !isLoading && (
           <div className="p-6 text-center text-destructive">
             Đã có lỗi xảy ra khi tải danh sách người dùng.
           </div>
        )}
        {!isLoading && !isError && users.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            Không tìm thấy người dùng nào.
          </div>
        )}
        {!isLoading && !isError &&
          users.map(user => (
            <UserRow 
              key={user.userId} 
              user={user} 
              onEdit={onEdit}
              onDelete={onDelete}
              onRestore={onRestore}
            />
          ))}
      </div>
    </div>
  );
}