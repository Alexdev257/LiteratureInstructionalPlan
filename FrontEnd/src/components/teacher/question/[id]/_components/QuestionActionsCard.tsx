"use client";

import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Copy, Trash2, Loader2 } from "lucide-react";
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

import { useQuestion } from "@/hooks/useQuestion";

interface QuestionActionsCardProps {
  questionId: number;
}

export default function QuestionActionsCard({
  questionId,
}: QuestionActionsCardProps) {
  const router = useRouter();
  const { useDeleteQuestion } = useQuestion();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDuplicate = () => {
    toast.info("Tính năng nhân bản đang phát triển");
  };

  const handleDelete = () => {
    useDeleteQuestion.mutate(questionId, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          toast.success(res.message || "Xóa câu hỏi thành công!");
          router.navigate({ to: "/teacher/question" });
        } else {
          toast.error(res.message || "Xóa câu hỏi thất bại!");
        }
      },
      onError: (error) => {
        toast.error(
          error?.message ||
          error?.message ||
          "Xóa câu hỏi thất bại. Vui lòng thử lại!"
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
            disabled={useDeleteQuestion.isPending}
          >
            {useDeleteQuestion.isPending ? (
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
              Xóa câu hỏi
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa câu hỏi này không? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa câu hỏi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}