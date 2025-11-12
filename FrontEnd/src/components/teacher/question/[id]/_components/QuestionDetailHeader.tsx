"use client";

import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Edit2, Download, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuestionDetailHeaderProps {
  questionId: number;
  canModify: boolean;
}

export default function QuestionDetailHeader({
  questionId,
  canModify,
}: QuestionDetailHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.navigate({ to: "/teacher/questions" });
  };

  const handleEdit = () => {
    router.navigate({ to: `/teacher/questions/${questionId}/edit` });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chi tiết Câu hỏi</h1>
          <p className="text-muted-foreground mt-1">Xem thông tin chi tiết câu hỏi</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="icon" title="Tải xuống">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" title="Chia sẻ">
          <Share2 className="h-4 w-4" />
        </Button>
        {canModify && (
          <Button variant="outline" size="icon" onClick={handleEdit} title="Chỉnh sửa">
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}