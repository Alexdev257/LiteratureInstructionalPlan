"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BasePagination } from "@/components/layout/base/pagination";
import type { GetAllPracticeQuestionResponseDTO, GetAllPracticequestionQuery, GradeLevel } from "@/utils/type";
import { Header } from "./Header";
import { QuestionToolbar } from "./QuestionToolbar";
import { RenderResults } from "./RenderResults";
import { CreateQuestionDialog } from "./CreateQuestionDialog";
import { DeleteQuestionDialog } from "./DeleteQuestionDialog";
import { useQuestionAdmin } from "@/hooks/useQuestionAdmin";
// [TODO: Tạo component EditQuestionDialog]
// import { EditQuestionDialog } from "./EditQuestionDialog"; 

type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

interface QuestionPageContentProps {
  questions: GetAllPracticeQuestionResponseDTO[];
  gradeLevels: GradeLevel[];
  isLoading: boolean;
  isError: boolean;
  filters: GetAllPracticequestionQuery;
  setFilters: Dispatch<SetStateAction<GetAllPracticequestionQuery>>;
  paginationData: PaginationData;
}

export default function QuestionPageContent({
  questions,
  gradeLevels,
  isLoading,
  isError,
  filters,
  setFilters,
  paginationData,
}: QuestionPageContentProps) {
  
  // State quản lý Dialog
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<GetAllPracticeQuestionResponseDTO | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<GetAllPracticeQuestionResponseDTO | null>(null);
  const [questionToRestore, setQuestionToRestore] = useState<GetAllPracticeQuestionResponseDTO | null>(null);

  // Mutations
  const { useDeleteQuestion, useRestoreQuestion } = useQuestionAdmin();
  const deleteMutation = useDeleteQuestion();
  const restoreMutation = useRestoreQuestion();

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, PageNumber: page }));
  };

  // Handlers
  const onTriggerDelete = (q: GetAllPracticeQuestionResponseDTO) => setQuestionToDelete(q);
  const onTriggerRestore = (q: GetAllPracticeQuestionResponseDTO) => setQuestionToRestore(q);
  const onTriggerEdit = (q: GetAllPracticeQuestionResponseDTO) => {
    setQuestionToEdit(q);
    // [TODO: Mở dialog/trang edit]
    // alert(`Mở form edit cho: ${q.content}`);
  };

  return (
    <>
      <div className="space-y-6">
        <Header onCreateQuestion={() => setIsCreateOpen(true)} />

        <Card>
          <CardHeader>
            <QuestionToolbar
              filters={filters}
              setFilters={setFilters}
              gradeLevels={gradeLevels}
            />
          </CardHeader>
          <CardContent>
            <RenderResults
              questions={questions}
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

      {/* --- Dialogs (Modals) --- */}
      <CreateQuestionDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        gradeLevels={gradeLevels}
      />
      
      {/* [TODO: Tạo và gọi EditQuestionDialog]
      <EditQuestionDialog
        question={questionToEdit}
        open={!!questionToEdit}
        onOpenChange={(open) => !open && setQuestionToEdit(null)}
        gradeLevels={gradeLevels}
      />
      */}
      
      <DeleteQuestionDialog
        question={questionToDelete}
        open={!!questionToDelete}
        onOpenChange={(open) => !open && setQuestionToDelete(null)}
        onConfirm={() => {
          if (questionToDelete) {
            deleteMutation.mutate(questionToDelete.questionId, {
              onSettled: () => setQuestionToDelete(null)
            });
          }
        }}
        isPending={deleteMutation.isPending}
      />
      
      <DeleteQuestionDialog
        question={questionToRestore}
        open={!!questionToRestore}
        onOpenChange={(open) => !open && setQuestionToRestore(null)}
        onConfirm={() => {
          if (questionToRestore) {
            restoreMutation.mutate(questionToRestore.questionId, {
              onSettled: () => setQuestionToRestore(null)
            });
          }
        }}
        isPending={restoreMutation.isPending}
        isRestore={true}
      />
    </>
  );
}