'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TemplateRow } from './TemplateRow';
// === THAY ĐỔI: IMPORT TYPE TỪ @/utils/type ===
import type { Template } from '@/utils/type';

// === XÓA INTERFACE TEMPLATE CŨ Ở ĐÂY ===

interface TemplateTableProps {
  templates: Template[]; // <-- Dùng Template từ API
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TemplateTable({ 
  templates, 
  onView, 
  onEdit, 
  onDelete 
}: TemplateTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-16">ID</TableHead> {/* Sửa STT thành ID */}
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Lớp học</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Lượt mua</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="text-right w-20">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                Không tìm thấy mẫu đề nào
              </TableCell>
            </TableRow>
          ) : (
            templates.map((template) => (
              <TemplateRow
                key={template.templateId} // <-- Sửa
                template={template}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}