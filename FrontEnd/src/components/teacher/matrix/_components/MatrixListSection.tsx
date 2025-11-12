'use client';

import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router'; // Change từ next/navigation
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SearchFilter } from './SearchFilter';
import { MatrixTable } from './MatrixTable';
import { BasePagination } from '@/components/layout/base/pagination';
import type { Matrix, GradeLevel } from '@/utils/type';

interface MatrixListSectionProps {
  matrices: Matrix[];
  gradeLevels: GradeLevel[];
}

export function MatrixListSection({ 
  matrices: initialMatrices,
  gradeLevels 
}: MatrixListSectionProps) {
  const navigate = useNavigate(); // Change từ useRouter
  const [matrices, setMatrices] = useState(initialMatrices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handlers
  const handleCreateNew = () => {
    navigate({ to: '/teacher/matrices/create' }); // TanStack Router syntax
  };

  const handleView = (id: number) => {
    console.log('View matrix:', id);
    // TODO: Navigate to detail page
  };

  const handleEdit = (id: number) => {
    console.log('Edit matrix:', id);
    // TODO: Open edit dialog
  };

  const handleCopy = (id: number) => {
    console.log('Copy matrix:', id);
    // TODO: Duplicate matrix
  };

  const handleDelete = (id: number) => {
    setMatrices(matrices.filter((m) => m.matrixId !== id));
    // TODO: Call delete API
  };

  // Filter
  const filteredMatrices = matrices.filter((matrix) => {
    const matchSearch =
      matrix.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      matrix.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchGrade =
      selectedGradeLevel === 'all' ||
      matrix.gradeLevelId.toString() === selectedGradeLevel;

    const matchStatus =
      selectedStatus === 'all' || matrix.status === selectedStatus;

    return matchSearch && matchGrade && matchStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMatrices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMatrices = filteredMatrices.slice(startIndex, endIndex);

  // Reset page when filter changes
  const handleFilterChange = (filterFn: () => void) => {
    setCurrentPage(1);
    filterFn();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Danh sách ma trận</CardTitle>
            <CardDescription>
              Quản lý và chỉnh sửa các ma trận đề thi của bạn
            </CardDescription>
          </div>
          <Button className="gap-2" onClick={handleCreateNew}>
            <Plus className="w-4 h-4" />
            Tạo Ma Trận Mới
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={(value) => handleFilterChange(() => setSearchQuery(value))}
          selectedGradeLevel={selectedGradeLevel}
          onGradeLevelChange={(value) => handleFilterChange(() => setSelectedGradeLevel(value))}
          selectedStatus={selectedStatus}
          onStatusChange={(value) => handleFilterChange(() => setSelectedStatus(value))}
          gradeLevels={gradeLevels}
        />

        <MatrixTable
          matrices={paginatedMatrices}
          onView={handleView}
          onEdit={handleEdit}
          onCopy={handleCopy}
          onDelete={handleDelete}
        />

        {filteredMatrices.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Không tìm thấy ma trận nào phù hợp
          </div>
        )}

        {filteredMatrices.length > 0 && (
          <BasePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredMatrices.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </CardContent>
    </Card>
  );
}