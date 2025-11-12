
import { useState } from 'react';
import { BaseHeader } from "@/components/layout/base/header";
import type { MatrixQuery } from '@/utils/type';
import StateSection from './_components/StateSection';
import MatrixListSection from './_components/MatrixListSection';
import SearchFilter from './_components/SearchFilter';

const DEFAULT_FILTERS: MatrixQuery = {
  PageNumber: 1,
  PageSize: 10,
  Search: '',
  GradeLevelId: undefined,
  IsAdmin: false,
 
};

export default function MatrixPage() {
  const [filters, setFilters] = useState<MatrixQuery>(DEFAULT_FILTERS);

  return (
    <div className="space-y-6 p-6">
      <BaseHeader
        title="Ma Trận Đề Thi"
        description="Quản lý tất cả ma trận đề thi của bạn"
      />

      <StateSection />

      <SearchFilter 
        queryParams={filters} 
        onParamsChange={setFilters}
      />

      <MatrixListSection 
        filters={filters} 
        onFiltersChange={setFilters}
      />
    </div>
  );
}