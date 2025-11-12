'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GradeLevel } from '@/utils/type';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedGradeLevel: string;
  onGradeLevelChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  gradeLevels: GradeLevel[];
}

export function SearchFilter({ 
  searchQuery, 
  onSearchChange,
  selectedGradeLevel,
  onGradeLevelChange,
  selectedStatus,
  onStatusChange,
  gradeLevels,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm ma trận..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Select value={selectedGradeLevel} onValueChange={onGradeLevelChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Lọc theo lớp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả lớp</SelectItem>
          {gradeLevels.map((level) => (
            <SelectItem key={level.gradeLevelId} value={level.name}>
              {level.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={onStatusChange}>
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