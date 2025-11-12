// --- File: src/components/admin/matrix/MatrixCard.tsx ---
'use client';
import { FileText, Eye, Edit2, Copy, Trash2, Undo, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { ExamMatrixGetAllResponseDTO } from '@/utils/type';

interface MatrixCardProps {
  matrix: ExamMatrixGetAllResponseDTO;
  onView: () => void;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  onRestore: () => void;
}

export function MatrixCard({ 
  matrix, 
  onView, 
  onEdit, 
  onCopy,
  onDelete,
  onRestore
}: MatrixCardProps) {
  
  const getStatusBadge = (status: string | null, isDeleted: boolean) => {
    if (isDeleted) {
       return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
          <ShieldAlert className="h-3 w-3 mr-1" />
          Đã xóa
        </Badge>
       );
    }
    
    const variants: Record<string, { className: string; label: string }> = {
      active: { className: 'bg-green-100 text-green-800 border-green-200', label: 'Hoạt động' },
      draft: { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Nháp' },
      locked: { className: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Khóa' },
    };
    
    const variant = variants[status ?? 'draft'] || variants.draft;
    
    return (
      <Badge variant="outline" className={variant.className}>
        <ShieldCheck className="h-3 w-3 mr-1" />
        {variant.label}
      </Badge>
    );
  };

  return (
    <Card className="hover:border-primary/50 transition">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {matrix.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {matrix.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {matrix.gradeLevel?.name ?? 'N/A'}
              </Badge>
              {getStatusBadge(matrix.status, matrix.isDeleted)}
              <Badge variant="secondary">{matrix.totalQuestions} câu hỏi</Badge>
              <Badge variant="secondary">{matrix.totalPoint} điểm</Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Tạo bởi: {matrix.createdBy?.userName ?? 'N/A'}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2 lg:flex-shrink-0">
            <Button variant="outline" size="sm" onClick={onView} title="Xem chi tiết">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit} title="Chỉnh sửa" disabled={matrix.isDeleted}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onCopy} title="Sao chép" disabled={matrix.isDeleted}>
              <Copy className="h-4 w-4" />
            </Button>
            
            {matrix.isDeleted ? (
               <Button variant="outline" size="sm" onClick={onRestore} title="Khôi phục">
                 <Undo className="h-4 w-4 text-green-600" />
               </Button>
            ) : (
               <Button variant="outline" size="sm" onClick={onDelete} title="Xóa">
                 <Trash2 className="h-4 w-4 text-destructive" />
               </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}