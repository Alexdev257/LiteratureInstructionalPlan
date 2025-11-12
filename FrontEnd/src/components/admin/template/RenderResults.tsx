"use client";
import type { TemplateGetDTO } from "@/utils/type";
import { TemplateRow } from "./TemplateRow";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow as UiTableRow } from '@/components/ui/table';

type RenderResultsProps = {
  templates: TemplateGetDTO[];
  isLoading: boolean;
  isError: boolean;
  onEdit: (template: TemplateGetDTO) => void;
  onDelete: (template: TemplateGetDTO) => void;
  onRestore: (template: TemplateGetDTO) => void;
};

export function RenderResults({ 
  templates, 
  isLoading, 
  isError,
  onEdit,
  onDelete,
  onRestore
}: RenderResultsProps) {
  
  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Đang tải dữ liệu...</div>;
  }
  if (isError) {
     return <div className="p-6 text-center text-destructive">Lỗi tải dữ liệu.</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <UiTableRow className="bg-muted/50">
            <TableHead>Giáo án</TableHead>
            <TableHead>Lớp</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Lượt tải/mua</TableHead>
            <TableHead>Người tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right w-20">Thao tác</TableHead>
          </UiTableRow>
        </TableHeader>
        <TableBody>
          {templates.length === 0 ? (
            <UiTableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                Không tìm thấy giáo án nào
              </TableCell>
            </UiTableRow>
          ) : (
            templates.map((template) => (
              <TemplateRow
                key={template.templateId}
                template={template}
                onEdit={onEdit}
                onDelete={onDelete}
                onRestore={onRestore}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}