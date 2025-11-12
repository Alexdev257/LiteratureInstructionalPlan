"use client";
import type { GetAllUserResponseDTO } from "@/utils/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, ShieldCheck, ShieldAlert, Undo } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface UserRowProps {
  user: GetAllUserResponseDTO;
  onEdit: (user: GetAllUserResponseDTO) => void;
  onDelete: (user: GetAllUserResponseDTO) => void;
  onRestore: (user: GetAllUserResponseDTO) => void;
}

// Helper lấy màu và tên Role
const getRoleProps = (roleId: number | null | undefined) => {
  switch (roleId) {
    case 1: // Admin
      return { name: "Admin", className: "bg-destructive/10 text-destructive border-destructive/20" };
    case 2: // Teacher
      return { name: "Giáo viên", className: "bg-primary/10 text-primary border-primary/20" };
    case 3: // Student
      return { name: "Học sinh", className: "bg-green-100 text-green-800 border-green-200" };
    default:
      return { name: "Chưa rõ", className: "bg-gray-100 text-gray-800" };
  }
};

export function UserRow({ user, onEdit, onDelete, onRestore }: UserRowProps) {
  
  const roleProps = getRoleProps(user.roleId);
  
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="grid grid-cols-10 gap-4 px-6 py-4 items-center">
      {/* Người Dùng */}
      <div className="col-span-3 flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {user.fullName[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">{user.fullName}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
      </div>

      {/* Vai trò */}
      <div className="col-span-2">
        <Badge variant="outline" className={roleProps.className}>
          {roleProps.name}
        </Badge>
      </div>

      {/* Trạng Thái */}
      <div className="col-span-2">
         {user.isDeleted ? (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              <ShieldAlert className="mr-1 h-3 w-3" />
              Đã xóa (Banned)
            </Badge>
         ) : (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Hoạt động
            </Badge>
         )}
      </div>

      {/* Ngày tạo */}
      <div className="col-span-2 text-sm text-muted-foreground">
        {formatDate(user.createdAt)}
      </div>

      {/* Hành Động */}
      <div className="col-span-1 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* --- ĐÃ XÓA NÚT SỬA (EDIT) ---
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Sửa
            </DropdownMenuItem>
            */}
            
            {user.isDeleted ? (
              <DropdownMenuItem onClick={() => onRestore(user)} className="text-green-600">
                <Undo className="mr-2 h-4 w-4" />
                Khôi phục
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => onDelete(user)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Xóa (Ban)
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}