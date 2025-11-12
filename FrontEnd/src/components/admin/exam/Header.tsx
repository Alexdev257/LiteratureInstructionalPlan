"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";

export function Header() {
  const router = useRouter();
  
  const handleCreateExam = () => {
    // API tạo Exam yêu cầu MatrixId và QuestionIds,
    // không thể tạo bằng dialog đơn giản.
    // Tạm thời điều hướng đến trang tạo Matrix (nơi bắt đầu flow).
    // Hoặc bạn có thể tạo một trang/wizard riêng cho "Tạo Đề Thi".
    router.navigate({ to: '/teacher/matrix/create' }); 
  
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Quản Lý Đề Thi</h1>
      {/* <Button onClick={handleCreateExam}>
        <Plus className="mr-2 h-4 w-4" />
        Tạo Đề Thi (Từ Ma Trận)
      </Button> */}
    </div>
  );
}