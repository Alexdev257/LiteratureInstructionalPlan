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

interface Template {
  id: number;
  stt: number;
  title: string;
  price: number;
  gradeLevel: string;
  created_at: string;
  luongMua: number;
  status: 'active' | 'draft' | 'archived';
}

interface TemplateRowProps {
  template: Template;
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
  const getStatusBadge = (status: Template['status']) => {
    const variants = {
      active: 'default',
      draft: 'secondary',
      archived: 'outline',
    } as const;

    const labels = {
      active: 'Hoạt động',
      draft: 'Nháp',
      archived: 'Lưu trữ',
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">{template.stt}</TableCell>
      <TableCell>
        <div className="font-medium max-w-xs truncate" title={template.title}>
          {template.title}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <Badge variant="outline">{template.gradeLevel}</Badge>
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
          <span className="font-semibold">{template.luongMua}</span>
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(template.status)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          {new Date(template.created_at).toLocaleDateString('vi-VN')}
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
              onClick={() => onView?.(template.id)}
            >
              <Eye className="w-4 h-4" /> Xem
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2"
              onClick={() => onEdit?.(template.id)}
            >
              <Edit className="w-4 h-4" /> Sửa
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 text-destructive focus:text-destructive"
              onClick={() => onDelete(template.id)}
            >
              <Trash2 className="w-4 h-4" /> Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}