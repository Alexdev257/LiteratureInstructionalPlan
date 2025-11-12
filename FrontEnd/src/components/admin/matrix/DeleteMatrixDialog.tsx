// --- File: src/components/admin/matrix/DeleteMatrixDialog.tsx ---
"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { ExamMatrixGetAllResponseDTO } from "@/utils/type";
import { Loader2 } from "lucide-react";

interface DeleteMatrixDialogProps {
  matrix: ExamMatrixGetAllResponseDTO | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
  isRestore?: boolean;
}

export function DeleteMatrixDialog({
  matrix,
  open,
  onOpenChange,
  onConfirm,
  isPending,
  isRestore = false,
}: DeleteMatrixDialogProps) {

  const title = isRestore ? "Khôi phục Ma trận" : "Xác nhận Xóa";
  const description = `Bạn có chắc chắn muốn ${isRestore ? 'khôi phục' : 'xóa'} ma trận: "${matrix?.title}"?`;
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