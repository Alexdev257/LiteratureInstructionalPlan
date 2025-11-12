"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BasePagination } from "@/components/layout/base/pagination";
import { BaseHeader } from "@/components/layout/base/header";
import type { TemplateGetDTO, TemplateFilterState, GradeLevel } from "@/utils/type";
import { Header } from "./Header";
import { TemplateToolbar } from "./TemplateToolbar";
import { RenderResults } from "./RenderResults";
import { DeleteTemplateDialog } from "./DeleteTemplateDialog";
import { useAdminTemplate } from "@/hooks/useAdminTemplate"; 
import { CreateTemplateDialog } from "@/components/teacher/template/_components/CreateTemplateDialog"; 
// [SỬA LỖI]: Thêm 2 import dưới đây
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

interface TemplatePageContentProps {
  stats: {
    totalTemplates: number;
    totalPurchases: number;
    activeTemplates: number;
  };
  templates: TemplateGetDTO[];
  gradeLevels: GradeLevel[];
  isLoading: boolean;
  isError: boolean;
  filters: TemplateFilterState;
  setFilters: Dispatch<SetStateAction<TemplateFilterState>>;
  paginationData: PaginationData;
}

export default function TemplatePageContent({
  stats,
  templates,
  gradeLevels,
  isLoading,
  isError,
  filters,
  setFilters,
  paginationData,
}: TemplatePageContentProps) {
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<TemplateGetDTO | null>(null);
  const [templateToRestore, setTemplateToRestore] = useState<TemplateGetDTO | null>(null);

  const { useDeleteTemplate, useRestoreTemplate } = useAdminTemplate();
  const deleteMutation = useDeleteTemplate();
  const restoreMutation = useRestoreTemplate();

  const handlePageChange = (page: number) => {
    setFilters((prev: TemplateFilterState) => ({ ...prev, PageNumber: page }));
  };

  // Handlers
  const onTriggerDelete = (template: TemplateGetDTO) => setTemplateToDelete(template);
  const onTriggerRestore = (template: TemplateGetDTO) => setTemplateToRestore(template);
  const onTriggerEdit = (template: TemplateGetDTO) => {
    alert(`Mở form edit cho: ${template.title}`);
  };

  return (
    <>
      <div className="space-y-6">
        <BaseHeader
          title="Quản lý Giáo án"
          description="Quản lý, tạo mới và chỉnh sửa giáo án trên hệ thống"
          //  action={
          //   <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
          //     <Plus className="w-4 h-4" />
          //     Tạo Giáo Án Mới
          //   </Button>
          // }
        />
        
        {/* [TODO: Bạn cần tạo StatsSection.tsx] */}
        {/* <StatsSection {...stats} /> */}

        <Card>
          <CardHeader>
            <TemplateToolbar
              filters={filters}
              setFilters={setFilters}
              gradeLevels={gradeLevels}
            />
          </CardHeader>
          <CardContent>
            <RenderResults
              templates={templates}
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

      <CreateTemplateDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
      
      <DeleteTemplateDialog
        template={templateToDelete}
        open={!!templateToDelete}
        onOpenChange={(open) => !open && setTemplateToDelete(null)}
        onConfirm={() => {
          if (templateToDelete) {
            deleteMutation.mutate(templateToDelete.templateId, {
              onSettled: () => setTemplateToDelete(null)
            });
          }
        }}
        isPending={deleteMutation.isPending}
      />
      
      <DeleteTemplateDialog
        template={templateToRestore}
        open={!!templateToRestore}
        onOpenChange={(open) => !open && setTemplateToRestore(null)}
        onConfirm={() => {
          if (templateToRestore) {
            restoreMutation.mutate(templateToRestore.templateId, {
              onSettled: () => setTemplateToRestore(null)
            });
          }
        }}
        isPending={restoreMutation.isPending}
        isRestore={true}
      />
    </>
  );
}