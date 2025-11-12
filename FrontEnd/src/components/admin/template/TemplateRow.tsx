"use client";
import { Eye, Edit, Trash2, MoreVertical, TrendingUp, Calendar, GraduationCap, Undo, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import type { TemplateGetDTO } from "@/utils/type";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface TemplateRowProps {
  template: TemplateGetDTO;
  onEdit: (template: TemplateGetDTO) => void;
  onDelete: (template: TemplateGetDTO) => void;
  onRestore: (template: TemplateGetDTO) => void;
}

export function TemplateRow({ 
  template, 
  onEdit, 
  onDelete, 
  onRestore 
}: TemplateRowProps) {
  
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
    } catch (e) { return dateString; }
  };
  
  const formatCurrency = (amount: number) => {
    if (amount === 0) return "Miễn phí";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  
  // Tạm thời giả định là false. Cần BE bổ sung.
  const isDeleted = template.isDeleted ?? false;

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div className="font-medium max-w-xs truncate" title={template.title}>
          {template.title}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <Badge variant="outline">{template.gradeLevelId?.name ?? 'N/A'}</Badge>
        </div>
      </TableCell>
      <TableCell>
        <span className={`font-semibold ${template.price === 0 ? 'text-green-600' : 'text-foreground'}`}>
          {formatCurrency(template.price)}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-600" />
          <span className="font-semibold">{template.totalDownload}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm text-muted-foreground">
          {template.createdBy?.userName ?? 'N/A'}
        </div>
      </TableCell>
      <TableCell>
         {isDeleted ? (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              <ShieldAlert className="mr-1 h-3 w-3" /> Đã xóa
            </Badge>
         ) : (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <ShieldCheck className="mr-1 h-3 w-3" /> Hoạt động
            </Badge>
         )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          {formatDate(template.createdAt)}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className="gap-2"
              onClick={() => window.open(template.viewPath, "_blank")}
            >
              <Eye className="w-4 h-4" /> Xem
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2"
              onClick={() => onEdit(template)}
              disabled={isDeleted}
            >
              <Edit className="w-4 h-4" /> Sửa
            </DropdownMenuItem>
            {isDeleted ? (
              <DropdownMenuItem
                className="gap-2 text-green-600 focus:text-green-600"
                onClick={() => onRestore(template)}
              >
                <Undo className="w-4 h-4" /> Khôi phục
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={() => onDelete(template)}
              >
                <Trash2 className="w-4 h-4" /> Xóa
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}