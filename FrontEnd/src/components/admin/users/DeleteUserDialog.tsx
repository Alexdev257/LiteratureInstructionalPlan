// --- File: src/components/admin/users/DeleteUserDialog.tsx ---
"use client";
import {
  AlertDialog,
  // AlertDialogAction, // <-- Xóa import này
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // [cite: 14022-14026]
import { Button } from "@/components/ui/button";
import type { GetAllUserResponseDTO } from "@/utils/type"; // 
import { Loader2 } from "lucide-react";

interface DeleteUserDialogProps {
  user: GetAllUserResponseDTO | null; // Dùng DTO
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
  isRestore?: boolean;
}

export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
  onConfirm,
  isPending,
  isRestore = false,
}: DeleteUserDialogProps) {

  const title = isRestore ? "Khôi phục Người dùng" : "Xác nhận Xóa (Ban)";
  const description = isRestore 
    ? `Bạn có chắc chắn muốn khôi phục tài khoản "${user?.fullName}"?`
    : `Bạn có chắc chắn muốn xóa (ban) tài khoản "${user?.fullName}"? Hành động này có thể được hoàn tác.`;
  const actionText = isRestore ? "Khôi phục" : "Xóa";
  const actionVariant = isRestore ? "default" : "destructive";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
          {/* Dùng Button thay vì AlertDialogAction */}
          <Button
            variant={actionVariant}
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {actionText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}