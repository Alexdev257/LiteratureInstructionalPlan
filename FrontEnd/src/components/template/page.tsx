



import type { TemplateQuery } from "@/utils/type"
import HeroSection from "./HeroSection"
import { useState } from "react";
import SearchFilter from "../teacher/template/_components/SearchFilter";
import RenderTemplates from "./RenderTemplates";
const DEFAULT_FILTERS: TemplateQuery = {
  PageNumber: 1,
  PageSize: 10,
  Search: '',
  GradeLevelId: undefined,
  isDeleted: undefined,
}

export default function TemplatesPage() {
  const [filters, setFilters] = useState<TemplateQuery>(DEFAULT_FILTERS);
  return (
    <>
      {/* Header Section */}
      <HeroSection />

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <SearchFilter
          queryParams={filters}
          onParamsChange={setFilters}
        />
        <RenderTemplates
          filters={filters}
          onFiltersChange={setFilters}

        />
      </div>

    </>
  )
}
