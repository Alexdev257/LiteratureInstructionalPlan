'use client';


import type { Matrix } from '@/utils/type';
import { MatrixCard } from './MatrixCard';

interface MatrixTableProps {
  matrices: Matrix[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onCopy: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MatrixTable({ 
  matrices, 
  
  onView, 
  onEdit, 
  onCopy,
  onDelete 
}: MatrixTableProps) {
  if (matrices.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Không tìm thấy ma trận nào
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {matrices.map((matrix) => (
        <MatrixCard
          key={matrix.matrixId}
          matrix={matrix}
          onView={() => onView(matrix.matrixId)}
          onEdit={() => onEdit(matrix.matrixId)}
          onCopy={() => onCopy(matrix.matrixId)}
          onDelete={() => onDelete(matrix.matrixId)}
        />
      ))}
    </div>
  );
}