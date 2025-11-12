import type { AdminUser } from "@/utils/type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, AlertOctagon, Ban } from "lucide-react";

// Helper để style Badge theo status
// const getStatusBadgeVariant = (
//   status: AdminUser["status"]
// ): "default" | "secondary" | "destructive" => {
//   switch (status) {
//     case "Active":
//       return "default"; // Màu xanh (cần custom)
//     case "Suspended":
//       return "secondary"; // Màu vàng (cần custom)
//     case "Banned":
//       return "destructive"; // Màu đỏ
//     default:
//       return "default";
//   }
// };

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-yellow-600";
  return "text-destructive";
};

export function UserRow({ user }: { user: AdminUser }) {
  
  const statusStyles = {
    Active: "bg-green-100 text-green-800 border-green-200",
    Suspended: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Banned: "bg-destructive/10 text-destructive border-destructive/20",
  };
  
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
      {/* Người Dùng */}
      <div className="col-span-3 flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback className="bg-primary/10 text-primary font-medium">
            {user.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">{user.fullName}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
      </div>

      {/* Trạng Thái */}
      <div className="col-span-2">
        <Badge
          variant="outline"
          className={statusStyles[user.status]}
        >
          {user.status}
        </Badge>
      </div>

      {/* Bài Báo HC */}
      <div className="col-span-2 text-sm font-medium">
        {user.postCount}
      </div>

      {/* Điểm TB */}
      <div className={`col-span-1 text-sm font-semibold ${getScoreColor(user.averageScore)}`}>
        {user.averageScore.toFixed(1)}%
      </div>

      {/* Hoạt Động Cuối */}
      <div className="col-span-3 text-sm text-muted-foreground">
        {user.lastActivity}
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
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Sửa
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertOctagon className="mr-2 h-4 w-4" />
              Tạm ngưng
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Ban className="mr-2 h-4 w-4" />
              Cấm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}