import { BasePagination } from "@/components/layout/base/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMatrix } from "@/hooks/useMatrix";
import { useGradeLevel } from "@/hooks/useGradeLevel";
import type { Matrix, MatrixQuery } from "@/utils/type";
import { useRouter } from "@tanstack/react-router";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  AlertCircle,
  FileText,
  Clock,
  MoreVertical,
  RotateCcw,
  Loader2
} from "lucide-react";
import { useSessionStore } from "@/stores/sessionStore";
import { useState } from "react";
import { toast } from "sonner";

interface MatrixListSectionProps {
  filters: MatrixQuery;
  onFiltersChange: (filters: Partial<MatrixQuery>) => void;
}

export default function MatrixListSection({ filters, onFiltersChange }: MatrixListSectionProps) {
  const router = useRouter();
  const { useGetMatrices, useDeleteMatrix, useRestoreMatrix } = useMatrix();
  const { useGetGradeLevels } = useGradeLevel();
  const { data: gradeLevelsData } = useGetGradeLevels({ PageSize: 100, PageNumber: 1 });
  const { data, isLoading, isError, error, refetch } = useGetMatrices(filters);
  const { user } = useSessionStore();



  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedMatrixId, setSelectedMatrixId] = useState<number | null>(null);
  const [selectedMatrixTitle, setSelectedMatrixTitle] = useState<string>("");

  const handleCreateNew = () => {
    router.navigate({ to: "/teacher/matrix/create" });
  };

  const handlePageChange = (page: number) => {
    onFiltersChange({ PageNumber: page });
  };

  const handleView = (matrixId: number) => {
    router.navigate({ to: `/teacher/matrix/${matrixId}` });
  };

  const handleEdit = (matrixId: number) => {
    router.navigate({ to: `/teacher/matrix/${matrixId}/edit` });
  };

  // Open delete dialog
  const openDeleteDialog = (matrixId: number, title: string) => {
    setSelectedMatrixId(matrixId);
    setSelectedMatrixTitle(title);
    setDeleteDialogOpen(true);
  };

  // Open restore dialog
  const openRestoreDialog = (matrixId: number, title: string) => {
    setSelectedMatrixId(matrixId);
    setSelectedMatrixTitle(title);
    setRestoreDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!selectedMatrixId) return;

    useDeleteMatrix.mutate(selectedMatrixId, {
      onSuccess: () => {
        toast.success("Đã xóa ma trận thành công", {
          description: `Ma trận "${selectedMatrixTitle}" đã được chuyển vào thùng rác`,
        });
        refetch();
        setDeleteDialogOpen(false);
        setSelectedMatrixId(null);
      },
      onError: (error) => {
        toast.error("Xóa ma trận thất bại", {
          description: error?.message || "Vui lòng thử lại sau",
        });
      },
    });
  };

  // Confirm restore
  const handleConfirmRestore = () => {
    if (!selectedMatrixId) return;

    useRestoreMatrix.mutate(selectedMatrixId, {
      onSuccess: () => {
        toast.success("Đã khôi phục ma trận thành công", {
          description: `Ma trận "${selectedMatrixTitle}" đã được khôi phục`,
        });
        refetch();
        setRestoreDialogOpen(false);
        setSelectedMatrixId(null);
      },
      onError: (error) => {
        toast.error("Khôi phục ma trận thất bại", {
          description: error?.message || "Vui lòng thử lại sau",
        });
      },
    });
  };

  const matrices = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalItems || 0;
  const currentPage = filters.PageNumber || 1;
  const pageSize = filters.PageSize || 10;
  const gradeLevels = gradeLevelsData?.data?.items || [];

  // Status configuration
  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        label: 'Hoạt động',
        className: 'bg-green-100 text-green-800 border-green-200'
      },
      draft: {
        label: 'Bản nháp',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      },
      archived: {
        label: 'Lưu trữ',
        className: 'bg-red-100 text-red-800 border-red-200'
      },
    };
    return configs[status as keyof typeof configs] || configs.draft;
  };

  // Get grade level name
  const getGradeLevelName = (gradeLevelId: number) => {
    const gradeLevel = gradeLevels.find(g => g.gradeLevelId === gradeLevelId);
    return gradeLevel?.name || `Khối ${gradeLevelId}`;
  };

  // Check if user can edit/delete
  const canModify = (matrix: Matrix) => {
    return user?.UserId === matrix.createdByUserId.toString();
  };

  // Check if matrix is archived
  const isArchived = (matrix: Matrix) => {
    return matrix.status === 'archived';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Danh sách ma trận</h2>
          <p className="text-muted-foreground mt-1">
            {totalItems > 0
              ? `Hiển thị ${((currentPage - 1) * pageSize) + 1} - ${Math.min(currentPage * pageSize, totalItems)} trong tổng số ${totalItems} ma trận`
              : 'Chưa có ma trận nào'
            }
          </p>
        </div>
        <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Tạo Ma Trận Mới
        </Button>
      </div>

      {/* Error State */}
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi tải dữ liệu</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Empty State */}
      {!isLoading && !isError && matrices.length === 0 && (
        <Card className="border-dashed bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Chưa có ma trận nào
            </h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {filters.search || filters.GradeLevelId || filters.status
                ? 'Không tìm thấy ma trận phù hợp với bộ lọc. Thử thay đổi điều kiện tìm kiếm.'
                : 'Bắt đầu tạo ma trận đầu tiên của bạn để quản lý đề thi một cách hiệu quả.'
              }
            </p>
            <Button onClick={handleCreateNew} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Tạo ma trận đầu tiên
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Matrices Grid - 2 columns */}
      {!isLoading && !isError && matrices.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {matrices.map((matrix) => {
              const statusConfig = getStatusConfig(matrix.status);
              const hasModifyPermission = canModify(matrix);
              const archived = isArchived(matrix);

              return (
                <Card
                  key={matrix.matrixId}
                  className={`bg-card border-border hover:border-primary/50 transition-colors ${archived ? 'opacity-60' : ''
                    }`}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {/* Header with Icon and Title */}
                      <div className="flex items-start gap-3">
                        <FileText className={`h-5 w-5 mt-1 flex-shrink-0 ${archived ? 'text-muted-foreground' : 'text-primary'
                          }`} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-1">
                            {matrix.title}
                          </h3>
                          {matrix.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {matrix.description}
                            </p>
                          )}
                        </div>
                        {/* Action Menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-border hover:bg-accent h-8 w-8 p-0 flex-shrink-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            {/* View - Always available */}
                            <DropdownMenuItem
                              onClick={() => handleView(matrix.matrixId)}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>

                            {hasModifyPermission && !archived && (
                              <>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => handleEdit(matrix.matrixId)}
                                  className="cursor-pointer"
                                >
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onClick={() => openDeleteDialog(matrix.matrixId, matrix.title)}
                                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Xóa
                                </DropdownMenuItem>
                              </>
                            )}

                            {/* Restore option for archived matrices */}
                            {hasModifyPermission && archived && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => openRestoreDialog(matrix.matrixId, matrix.title)}
                                  className="cursor-pointer text-green-600 focus:text-green-600 focus:bg-green-50"
                                >
                                  <RotateCcw className="h-4 w-4 mr-2" />
                                  Khôi phục
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {getGradeLevelName(matrix.gradeLevelId)}
                        </Badge>
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                        <Badge variant="secondary">
                          {matrix.totalQuestions} câu hỏi
                        </Badge>
                        <Badge variant="secondary">
                          {matrix.totalPoint} điểm
                        </Badge>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(matrix.createdAt).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Notes */}
                      {matrix.notes && (
                        <p className="text-xs text-muted-foreground italic line-clamp-1">
                          Ghi chú: {matrix.notes}
                        </p>
                      )}

                      {/* Archived Notice */}
                      {archived && (
                        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                          <p className="text-xs text-red-700">
                            Ma trận này đã được lưu trữ. Bấm khôi phục để sử dụng lại.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pt-4">
              <BasePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Xác nhận xóa ma trận
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Bạn có chắc chắn muốn xóa ma trận <span className="font-semibold text-foreground">"{selectedMatrixTitle}"</span> không?
              </p>
              <p className="text-sm text-muted-foreground">
                Ma trận sẽ được chuyển vào thùng rác và có thể khôi phục lại sau.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={useDeleteMatrix.isPending}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={useDeleteMatrix.isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {useDeleteMatrix.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang xóa...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa ma trận
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-green-600" />
              Xác nhận khôi phục ma trận
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Bạn có chắc chắn muốn khôi phục ma trận <span className="font-semibold text-foreground">"{selectedMatrixTitle}"</span> không?
              </p>
              <p className="text-sm text-muted-foreground">
                Ma trận sẽ được chuyển về trạng thái "Bản nháp" và có thể chỉnh sửa lại.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={useRestoreMatrix.isPending}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRestore}
              disabled={useRestoreMatrix.isPending}
              className="bg-green-600 hover:bg-green-700 focus:ring-green-600"
            >
              {useRestoreMatrix.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang khôi phục...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Khôi phục
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
