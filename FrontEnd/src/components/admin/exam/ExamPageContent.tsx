"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BasePagination } from "@/components/layout/base/pagination";
import type { GetAllExamResponseDTO, ExamFilterState, GradeLevel, ExamType } from "@/utils/type";
import { Header } from "./Header";
import { ExamToolbar } from "./ExamToolbar";
import { RenderResults } from "./RenderResults";
import { DeleteExamDialog } from "./DeleteExamDialog";
import { useAdminExams } from "@/hooks/useAdminExams";

type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

interface ExamPageContentProps {
  exams: GetAllExamResponseDTO[];
  gradeLevels: GradeLevel[];
  examTypes: ExamType[];
  isLoading: boolean;
  isError: boolean;
  filters: ExamFilterState;
  setFilters: Dispatch<SetStateAction<ExamFilterState>>;
  paginationData: PaginationData;
}

export default function ExamPageContent({
  exams,
  gradeLevels,
  examTypes,
  isLoading,
  isError,
  filters,
  setFilters,
  paginationData,
}: ExamPageContentProps) {
  
  const [examToDelete, setExamToDelete] = useState<GetAllExamResponseDTO | null>(null);
  const [examToRestore, setExamToRestore] = useState<GetAllExamResponseDTO | null>(null);

  const { useDeleteExam, useRestoreExam } = useAdminExams();
  const deleteMutation = useDeleteExam();
  const restoreMutation = useRestoreExam();

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, PageNumber: page }));
  };

  const onTriggerDelete = (exam: GetAllExamResponseDTO) => setExamToDelete(exam);
  const onTriggerRestore = (exam: GetAllExamResponseDTO) => setExamToRestore(exam);
  const onTriggerEdit = (exam: GetAllExamResponseDTO) => {
    // [TODO: Mở trang edit]
    alert(`Chuyển đến trang Edit Exam: ${exam.examId}`);
  };

  return (
    <>
      <div className="space-y-6">
        <Header />
        <Card>
          <CardHeader>
            <ExamToolbar
              filters={filters}
              setFilters={setFilters}
              gradeLevels={gradeLevels}
              examTypes={examTypes}
            />
          </CardHeader>
          <CardContent>
            <RenderResults
              exams={exams}
              isLoading={isLoading}
              isError={isError}
              onEdit={onTriggerEdit}
              onDelete={onTriggerDelete}
              onRestore={onTriggerRestore}
            />
            {paginationData && paginationData.totalPages > 1 && !isLoading && (
              <div className="mt-4">
                <BasePagination
                  currentPage={paginationData.currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={handlePageChange}
                  totalItems={paginationData.totalItems}
                  itemsPerPage={paginationData.itemsPerPage}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <DeleteExamDialog
        exam={examToDelete}
        open={!!examToDelete}
        onOpenChange={(open) => !open && setExamToDelete(null)}
        onConfirm={() => {
          if (examToDelete) {
            deleteMutation.mutate(examToDelete.examId, {
              onSettled: () => setExamToDelete(null)
            });
          }
        }}
        isPending={deleteMutation.isPending}
      />
      
      <DeleteExamDialog
        exam={examToRestore}
        open={!!examToRestore}
        onOpenChange={(open) => !open && setExamToRestore(null)}
        onConfirm={() => {
          if (examToRestore) {
            restoreMutation.mutate(examToRestore.examId, {
              onSettled: () => setExamToRestore(null)
            });
          }
        }}
        isPending={restoreMutation.isPending}
        isRestore={true}
      />
    </>
  );
}