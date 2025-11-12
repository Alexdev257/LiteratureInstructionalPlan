"use client";

import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Edit2, Download, Share2, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExamDetailHeaderProps {
  examId: number;
  canModify: boolean;
}

export default function ExamDetailHeader({
  examId,
  canModify,
}: ExamDetailHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.navigate({ to: "/teacher/exams" });
  };

  const handleEdit = () => {
    router.navigate({ to: `/teacher/exams/${examId}/edit` });
  };

  const handlePreview = () => {
    // Navigate to preview/take exam page
    router.navigate({ to: `/teacher/exams/${examId}/preview` });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chi tiết Đề thi</h1>
          <p className="text-muted-foreground mt-1">Xem thông tin chi tiết đề thi</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="icon" title="Xem trước đề thi" onClick={handlePreview}>
          <Eye className="h-4 w-4" />
        </Button>
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