'use client';

import { FileText,  Eye, Edit2, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Matrix } from '@/utils/type';

interface MatrixCardProps {
  matrix: Matrix;

  onView: () => void;
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

export function MatrixCard({ 
  matrix, 

  onView, 
  onEdit, 
  onCopy,
  onDelete 
}: MatrixCardProps) {
  // Helper functions
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; label: string }> = {
      active: { className: 'bg-green-100 text-green-800', label: 'Hoạt động' },
      draft: { className: 'bg-yellow-100 text-yellow-800', label: 'Nháp' },
      locked: { className: 'bg-red-100 text-red-800', label: 'Khóa' },
    };

    const variant = variants[status] || variants.draft;
    
    return (
      <Badge className={variant.className}>
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

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {matrix.gradeLevelId}
              </Badge>
              {getStatusBadge(matrix.status)}
              <Badge variant="secondary">{matrix.totalQuestions} câu hỏi</Badge>
              <Badge variant="secondary">{matrix.totalPoints} điểm</Badge>
            </div>
          </div>

          <div className="flex gap-2 lg:flex-shrink-0">
            <Button variant="outline" size="sm" onClick={onView} title="Xem chi tiết">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit} title="Chỉnh sửa">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onCopy} title="Sao chép">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onDelete} title="Xóa">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}