import { BaseHeader } from "@/components/layout/base/header";
import StatsSection from "./_components/StatsSection";
import SearchFilter from "./_components/SearchFilter";
import type { TemplateQuery } from "@/utils/type";
import { useState } from "react";
import TemplateListSection from "./_components/TemplateListSection";



const DEFAULT_FILTERS = {
  PageNumber: 1,
  PageSize: 10,
  search: '',
  GradeLevelId: undefined,
  isDeleted: undefined,
}


export default function TemplateManagementPage() {
  const [filters, setFilters] = useState<TemplateQuery>(DEFAULT_FILTERS);
  return (
    <div className="space-y-6 p-3">
      <BaseHeader
        title="Quản lý Mẫu đề"
        description="Quản lý và tạo mẫu đề thi cho học sinh"
      />

      <StatsSection />
      <SearchFilter
        queryParams={filters}
        onParamsChange={setFilters}
      />

      <TemplateListSection
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
}
