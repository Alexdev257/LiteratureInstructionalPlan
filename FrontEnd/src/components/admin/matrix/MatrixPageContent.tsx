// --- File: src/components/admin/matrix/MatrixPageContent.tsx ---
"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BasePagination } from "@/components/layout/base/pagination";
import { BaseHeader } from "@/components/layout/base/header";
import { StatsSection } from "./StatsSection";
import type { ExamMatrixGetAllResponseDTO, GetAllMatrixQuery, GradeLevel } from "@/utils/type";
import { useAdminMatrix } from "@/hooks/useAdminMatrix"; // Dùng hook MỚI
import { DeleteMatrixDialog } from "./DeleteMatrixDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MatrixToolbar } from "./MatrixToolbar";
import { RenderResults } from "./RenderResults";

type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

interface MatrixListSectionProps {
  stats: {
    totalMatrices: number;
    activeMatrices: number;
    draftMatrices: number;
    totalQuestions: number;
  };
  matrices: ExamMatrixGetAllResponseDTO[];
  gradeLevels: GradeLevel[];
  pagination: PaginationData;
  filters: GetAllMatrixQuery;
  setFilters: Dispatch<SetStateAction<GetAllMatrixQuery>>;
  isLoading: boolean;
  isError: boolean;
}

export default function MatrixPageContent({
  stats,
  matrices,
  gradeLevels,
  pagination,
  filters,
  setFilters,
  isLoading,
  isError,
}: MatrixListSectionProps) {
  const navigate = useNavigate();
  
  const [matrixToDelete, setMatrixToDelete] = useState<ExamMatrixGetAllResponseDTO | null>(null);
  const [matrixToRestore, setMatrixToRestore] = useState<ExamMatrixGetAllResponseDTO | null>(null);

  // --- Lấy hooks Mutations ---
  const { useDeleteMatrix, useRestoreMatrix } = useAdminMatrix(); // Dùng hook MỚI
  const deleteMutation = useDeleteMatrix();
  const restoreMutation = useRestoreMatrix();

  const handlePageChange = (page: number) => {
    setFilters((prev: GetAllMatrixQuery) => ({ ...prev, PageNumber: page }));
  };

  // Handlers
  const handleView = (id: number) => console.log('View matrix:', id);
  const handleEdit = (id: number) => console.log('Edit matrix:', id);
  const handleCopy = (id: number) => console.log('Copy matrix:', id);
  const handleDelete = (matrix: ExamMatrixGetAllResponseDTO) => setMatrixToDelete(matrix);
  const handleRestore = (matrix: ExamMatrixGetAllResponseDTO) => setMatrixToRestore(matrix);
  const handleCreateNew = () => {
    // [TODO: Cần tạo route /dashboard/matrix/create]
    // Tạm thời dùng route của teacher vì nó gọi hook 'useMatrix'
    navigate({ to: '/teacher/matrices/create' });
  };

  return (
    <>
      <div className="space-y-6">
        <BaseHeader
          title="Quản lý Ma trận Đề thi"
          description="Quản lý tất cả ma trận đề thi trên hệ thống"
          // action={
          //   <Button className="gap-2" onClick={handleCreateNew}>
          //     <Plus className="w-4 h-4" />
          //     Tạo Ma Trận Mới
          //   </Button>
          // }
        />

        <StatsSection {...stats} />

        <Card>
          <CardHeader>
            <MatrixToolbar
              filters={filters}
              setFilters={setFilters}
              gradeLevels={gradeLevels}
            />
          </CardHeader>
          <CardContent className="space-y-4">
            {isError ? (
              <div className="text-center py-8 text-destructive">
                Đã có lỗi xảy ra khi tải ma trận.
              </div>
            ) : isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Đang tải ma trận...
              </div>
            ) : (
              <RenderResults
                matrices={matrices}
                onView={handleView}
                onEdit={handleEdit}
                onCopy={handleCopy}
                onDelete={handleDelete}
                onRestore={handleRestore}
              />
            )}
            {pagination.totalPages > 1 && !isLoading && !isError && (
              <BasePagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.totalItems}
                itemsPerPage={pagination.itemsPerPage}
              />
            )}
          </CardContent>
        </Card>
      </div>

      <DeleteMatrixDialog
        matrix={matrixToDelete}
        open={!!matrixToDelete}
        onOpenChange={(open) => !open && setMatrixToDelete(null)}
        onConfirm={() => {
          if (matrixToDelete) {
            deleteMutation.mutate(matrixToDelete.matrixId, { 
              onSettled: () => setMatrixToDelete(null)
            });
          }
        }}
        isPending={deleteMutation.isPending}
      />
      
      <DeleteMatrixDialog
        matrix={matrixToRestore}
        open={!!matrixToRestore}
        onOpenChange={(open) => !open && setMatrixToRestore(null)}
        onConfirm={() => {
          if (matrixToRestore) {
            restoreMutation.mutate(matrixToRestore.matrixId, { 
              onSettled: () => setMatrixToRestore(null)
            });
          }
        }}
        isPending={restoreMutation.isPending}
        isRestore={true}
      />
    </>
  );
}