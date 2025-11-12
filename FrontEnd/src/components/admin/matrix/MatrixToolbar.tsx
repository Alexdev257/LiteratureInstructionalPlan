// --- File: src/components/admin/matrix/MatrixToolbar.tsx ---
'use client';
import type { Dispatch, SetStateAction } from "react";
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GradeLevel, GetAllMatrixQuery } from '@/utils/type';
import { useDebouncedCallback } from "use-debounce";

interface MatrixToolbarProps {
  filters: GetAllMatrixQuery;
  setFilters: Dispatch<SetStateAction<GetAllMatrixQuery>>;
  gradeLevels: GradeLevel[];
}

export function MatrixToolbar({ 
  filters,
  setFilters,
  gradeLevels,
}: MatrixToolbarProps) {

  const handleFilterChange = (key: keyof GetAllMatrixQuery, value: string) => {
    setFilters((prev: GetAllMatrixQuery) => ({ 
      ...prev, 
      [key]: value === 'all' ? "all" : value, 
      PageNumber: 1,
    }));
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
     setFilters((prev: GetAllMatrixQuery) => ({ 
       ...prev, 
       Search: value, 
       PageNumber: 1 
      }));
  }, 500);

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm ma trận..."
          className="pl-10"
          defaultValue={filters.Search}
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      
      <Select 
        value={filters.GradeLevelId?.toString() ?? 'all'} 
        onValueChange={(value) => handleFilterChange('GradeLevelId', value)}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Lọc theo lớp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả lớp</SelectItem>
          {gradeLevels.map((level) => (
            <SelectItem key={level.gradeLevelId} value={level.gradeLevelId.toString()}>
              {level.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
         value={filters.Status ?? 'all'} 
         onValueChange={(value) => handleFilterChange('Status', value)}
      >
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="active">Hoạt động</SelectItem>
          <SelectItem value="draft">Nháp</SelectItem>
          <SelectItem value="locked">Khóa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}