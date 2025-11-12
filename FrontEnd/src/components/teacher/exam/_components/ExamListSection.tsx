"use client";

import { useState } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  Loader2,
  HelpCircle,
  AlertCircle,
  FileText,
  Clock,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { BasePagination } from "@/components/layout/base/pagination";
import { toast } from "sonner";
import { useSessionStore } from "@/stores/sessionStore";
import { useRouter } from "@tanstack/react-router";

import type { ExamQuery, ExamData } from "@/utils/type";
import { useExam } from "@/hooks/useExam";

interface ExamListSectionProps {
  filters: ExamQuery;
  onFiltersChange: (filters: Partial<ExamQuery>) => void;
}

export default function ExamListSection({
  filters,
  onFiltersChange,
}: ExamListSectionProps) {
  const router = useRouter();
  const { user } = useSessionStore();
  const { useGetExam, useDeleteExam } = useExam();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [selectedExamTitle, setSelectedExamTitle] = useState("");

  const { data, isLoading, isError, error, refetch } = useGetExam(filters);

  const exams = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalItems || 0;
  const currentPage = filters.PageNumber || 1;
  const pageSize = filters.PageSize || 10;

  const handlePageChange = (page: number) => {
    onFiltersChange({ PageNumber: page });
  };

  const handleView = (examId: number) => {
    router.navigate({ to: `/teacher/exams/${examId}` });
  };

  const handleEdit = (examId: number) => {
    router.navigate({ to: `/teacher/exams/${examId}/edit` });
  };

  const handleCreateNew = () => {
    router.navigate({ to: "/teacher/exams/select-matrix" });
  };

  const openDeleteDialog = (examId: number, title: string) => {
    setSelectedExamId(examId);
    setSelectedExamTitle(title);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedExamId !== null) {
      useDeleteExam.mutate(selectedExamId, {
        onSuccess: (res) => {
          if (res.isSuccess) {
            toast.success("Đã xóa đề thi", {
              description: `Đề thi "${selectedExamTitle}" đã được xóa thành công`,
            });
            setDeleteDialogOpen(false);
            refetch();
          } else {
            toast.error(res.message || "Xóa thất bại!");
          }
        },
        onError: (error) => {
          toast.error(error?.message || "Lỗi hệ thống!");
        },
      });
    }
  };

  const canModify = (exam: ExamData) => {
    return Number(user?.UserId) === exam.createdBy.userId;
  };

  const getExamTypeBadgeColor = (typeName: string) => {
    const colors: Record<string, string> = {
      "Trắc nghiệm": "bg-blue-100 text-blue-800 border-blue-200",
      "Tự luận": "bg-purple-100 text-purple-800 border-purple-200",
      "Kết hợp": "bg-emerald-100 text-emerald-800 border-emerald-200",
    };
    return colors[typeName] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-destructive/10 rounded-full p-6 mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          {error?.message || "Không thể tải danh sách đề thi"}
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Quản lý Đề thi</h2>
            <p className="text-muted-foreground mt-1">
              Hiển thị {(currentPage - 1) * pageSize + 1} -{" "}
              {Math.min(currentPage * pageSize, totalItems)} trong tổng số{" "}
              {totalItems} đề thi
            </p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo Đề Thi Mới
          </Button>
        </div>

        {/* Empty State */}
        {!isLoading && !isError && exams.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-muted rounded-full p-6 mb-4">
              <HelpCircle className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy đề thi</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Thử thay đổi bộ lọc hoặc tạo đề thi mới
            </p>
            <Button onClick={handleCreateNew} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Tạo đề thi đầu tiên
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">STT</TableHead>
                <TableHead className="w-64">Tên đề thi</TableHead>
                <TableHead className="w-32">Loại đề</TableHead>
                <TableHead className="w-24">Lớp</TableHead>
                <TableHead className="w-24 text-center">Câu hỏi</TableHead>
                <TableHead className="w-24 text-center">Thời gian</TableHead>
                <TableHead className="min-w-[150px]">Người tạo</TableHead>
                <TableHead className="w-32">Ngày tạo</TableHead>
                <TableHead className="w-24 text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam, index) => {
                const hasPermission = canModify(exam);
                const rowIndex = (currentPage - 1) * pageSize + index + 1;
                const isLongTitle = exam.title.length > 40;

                return (
                  <TableRow
                    key={exam.examId}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {/* STT */}
                    <TableCell className="text-center font-medium">
                      {rowIndex}
                    </TableCell>

                    {/* Tên đề thi */}
                    <TableCell className="py-3 !whitespace-normal">
                      <div className="group relative w-64">
                        <div
                          className="font-medium text-foreground leading-relaxed"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word'
                          } as React.CSSProperties}
                          title={exam.title}
                        >
                          {exam.title || "Không có tiêu đề"}
                        </div>

                        {/* Nút Xem thêm */}
                        {isLongTitle && (
                          <button
                            onClick={() => toast.info(exam.title)}
                            className="
                              absolute right-0 top-1/2 -translate-y-1/2 
                              opacity-0 group-hover:opacity-100 
                              transition-opacity duration-200
                              text-primary hover:text-primary/80
                              text-xs font-semibold 
                              underline underline-offset-2
                              bg-background/90 backdrop-blur-sm
                              px-2 py-0.5 rounded
                              shadow-sm
                            "
                          >
                            Xem thêm
                          </button>
                        )}
                      </div>
                    </TableCell>

                    {/* Loại đề */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getExamTypeBadgeColor(exam.examType.name)}
                      >
                        {exam.examType.name}
                      </Badge>
                    </TableCell>

                    {/* Lớp */}
                    <TableCell>
                      <Badge variant="secondary">
                        Lớp {exam.gradeLevel.name}
                      </Badge>
                    </TableCell>

                    {/* Số câu hỏi */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{exam.questions?.length || 0}</span>
                      </div>
                    </TableCell>

                    {/* Thời gian */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{exam.durationMinutes} phút</span>
                      </div>
                    </TableCell>

                    {/* Người tạo */}
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium text-foreground">
                          {exam.createdBy.fullName || "N/A"}
                        </p>
                        
                      </div>
                    </TableCell>

                    {/* Ngày tạo */}
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(exam.createdAt)}
                      </span>
                    </TableCell>

                    {/* Hành động */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(exam.examId)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </DropdownMenuItem>

                          {hasPermission && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEdit(exam.examId)}>
                                <Edit2 className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(exam.examId, exam.title)}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Xóa
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <BasePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={pageSize}
            onPageChange={handlePageChange}
          />
        )}

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                Xóa đề thi
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p className="mb-2">
                  Bạn có chắc chắn muốn xóa đề thi này không?
                </p>
                <p className="text-sm font-medium text-foreground line-clamp-2 bg-muted p-2 rounded">
                  "{selectedExamTitle}"
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hành động này không thể hoàn tác.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600">
                Xóa đề thi
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}