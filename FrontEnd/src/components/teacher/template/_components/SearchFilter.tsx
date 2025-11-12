'use client';

import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick?: () => void;
}

export function SearchFilter({ 
  searchQuery, 
  onSearchChange, 
  onFilterClick 
}: SearchFilterProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo tên đề hoặc lớp học..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" className="gap-2" onClick={onFilterClick}>
        <Filter className="w-4 h-4" />
        Lọc
      </Button>
    </div>
  );
}