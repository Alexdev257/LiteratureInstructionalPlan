"use client";

import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Copy, Trash2, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useExam } from "@/hooks/useExam";

interface ExamActionsCardProps {
  examId: number;
}

export default function ExamActionsCard({ examId }: ExamActionsCardProps) {
  const router = useRouter();
  const { useDeleteExam } = useExam();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handlePreview = () => {
    router.navigate({ to: `/teacher/exam/${examId}/preview` });
  };

  const handleDuplicate = () => {
    toast.info("Tính năng nhân bản đang phát triển");
  };

  const handleDelete = () => {
    useDeleteExam.mutate(examId, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xóa đề thi thành công!");
          router.navigate({ to: "/teacher/exam" });
        } else {
          toast.error(res.message || "Xóa đề thi thất bại!");
        }
      },
      onError: (error) => {
        toast.error(
          error?.message ||
          error?.message ||
          "Xóa đề thi thất bại. Vui lòng thử lại!"
        );
      },
    });
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="bg-card border-border">
        <CardContent className="pt-6 space-y-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={handlePreview}
          >
            <Eye className="h-4 w-4 mr-2" />
            Xem trước đề thi
          </Button>
          <Button
            className="w-full bg-transparent"
            variant="outline"
            onClick={handleDuplicate}
          >
            <Copy className="h-4 w-4 mr-2" />
            Nhân bản
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={useDeleteExam.isPending}
          >
            {useDeleteExam.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Xóa đề thi
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa đề thi này không? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa đề thi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}