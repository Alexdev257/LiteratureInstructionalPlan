// --- File: src/components/admin/matrix/RenderResults.tsx ---
'use client';
import type { ExamMatrixGetAllResponseDTO } from '@/utils/type';
import { MatrixCard } from './MatrixCard';

interface RenderResultsProps {
  matrices: ExamMatrixGetAllResponseDTO[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onCopy: (id: number) => void;
  onDelete: (matrix: ExamMatrixGetAllResponseDTO) => void;
  onRestore: (matrix: ExamMatrixGetAllResponseDTO) => void;
}

export function RenderResults({ 
  matrices, 
  onView, 
  onEdit, 
  onCopy,
  onDelete,
  onRestore
}: RenderResultsProps) {
  
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
          onDelete={() => onDelete(matrix)}
          onRestore={() => onRestore(matrix)}
        />
      ))}
    </div>
  );
}