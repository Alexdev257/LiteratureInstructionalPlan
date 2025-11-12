import { 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical, 
  TrendingUp, 
  Calendar, 
  GraduationCap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Template } from '@/utils/type'; // <-- 1. Import type

// 2. Xóa interface Template cục bộ

interface TemplateRowProps {
  template: Template; // <-- 3. Dùng Template từ type.ts
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TemplateRow({ 
  template, 
  onView, 
  onEdit, 
  onDelete 
}: TemplateRowProps) {
  
  // 4. Cập nhật hàm getStatusBadge
  const getStatusBadge = (isDeleted: boolean) => {
    return (
      <Badge variant={isDeleted ? 'destructive' : 'default'}>
        {isDeleted ? 'Đã xóa' : 'Hoạt động'}
      </Badge>
    );
  };

  return (
    // 5. Cập nhật các trường dữ liệu
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{template.templateId}</TableCell>
      <TableCell>
        <div className="font-medium max-w-xs truncate" title={template.title}>
          {template.title}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          {/* Dùng gradeLevel.name */}
          <Badge variant="outline">{template.gradeLevel.name}</Badge>
        </div>
      </TableCell>
      <TableCell>
        <span className="font-semibold text-green-600">
          {template.price.toLocaleString('vi-VN')} ₫
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-600" />
           {/* Dùng totalDownload */}
          <span className="font-semibold">{template.totalDownload}</span>
        </div>
      </TableCell>
      {/* Dùng isDeleted */}
      <TableCell>{getStatusBadge(template.isDeleted)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
           {/* Dùng createdAt */}
          {new Date(template.createdAt).toLocaleDateString('vi-VN')}
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
               // Dùng templateId
              onClick={() => onView?.(template.templateId)}
            >
              <Eye className="w-4 h-4" /> Xem
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2"
               // Dùng templateId
              onClick={() => onEdit?.(template.templateId)}
            >
              <Edit className="w-4 h-4" /> Sửa
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-destructive focus:text-destructive"
               // Dùng templateId
              onClick={() => onDelete(template.templateId)}
            >
              <Trash2 className="w-4 h-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}