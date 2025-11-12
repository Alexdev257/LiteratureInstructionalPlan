
import { useMemo, useCallback } from "react";
import { Search, X } from "lucide-react";

import { useGradeLevel } from "@/hooks/useGradeLevel";
import { useDebouncedParams } from "@/hooks/useDebounce";
import type { TemplateQuery } from "@/utils/type";


interface TemplateSearchFilterProps {
  queryParams?: Partial<TemplateQuery>;
  onParamsChange?: (params: Partial<TemplateQuery>) => void;
}

const DEFAULT_PARAMS: TemplateQuery = {
  PageNumber: 1,
  PageSize: 10,
  Search: "",
  GradeLevelId: undefined,
  isDeleted: undefined,
};

export default function TemplateSearchFilter({
  queryParams,
  onParamsChange,
}: TemplateSearchFilterProps) {
  const initialParams = useMemo(() => {
    return { ...DEFAULT_PARAMS, ...queryParams };
  }, [queryParams]);

  const handleParamsChange = useCallback(
    (params: TemplateQuery) => {
      onParamsChange?.(params);
    },
    [onParamsChange]
  );

  const {
    localParams,
    updateLocalParam,
    setLocalParams,
  } = useDebouncedParams(initialParams, 500, handleParamsChange);

  const { useGetGradeLevels } = useGradeLevel();
  const { data: gradeLevelsData } = useGetGradeLevels({ PageSize: 100 });
  const gradeLevels = gradeLevelsData?.data?.items || [];

  const hasActiveFilters =
    !!localParams.Search ||
    localParams.GradeLevelId !== undefined ||
    localParams.isDeleted !== undefined;

  const handleClearFilters = useCallback(() => {
    setLocalParams({
      ...DEFAULT_PARAMS,
      PageSize: localParams.PageSize || 10,
    });
  }, [localParams.PageSize, setLocalParams]);


  return (
    <div className="space-y-4">
      {/* Row: Search + Filters + Clear */}
      <div className="flex flex-col lg:flex-row gap-3 items-end">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề template..."
              className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={localParams.Search || ""}
              onChange={(e) => updateLocalParam("Search", e.target.value)}
            />
          </div>
        </div>

        {/* Trạng thái xóa (isDeleted) */}
        <div className="w-full lg:w-[200px]">
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.isDeleted === undefined ? "" : String(localParams.isDeleted)}
            onChange={(e) => {
              const value = e.target.value;
              updateLocalParam(
                "isDeleted",
                value === "" ? undefined : value === "true"
              );
            }}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="false">Đang hoạt động</option>
            <option value="true">Trong thùng rác</option>
          </select>
        </div>

        {/* Grade Level */}
        <div className="w-full lg:w-[180px]">
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.GradeLevelId ?? ""}
            onChange={(e) =>
              updateLocalParam(
                "GradeLevelId",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">Tất cả khối</option>
            {gradeLevels.map((grade) => (
              <option key={grade.gradeLevelId} value={grade.gradeLevelId}>
                {grade.name}
              </option>
            ))}
          </select>
        </div>

        {/* Page Size */}
        <div className="w-full lg:w-[140px]">
          <select
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            value={localParams.PageSize || 10}
            onChange={(e) => updateLocalParam("PageSize", Number(e.target.value))}
          >
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
            <option value={50}>50 / trang</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-input rounded-md hover:bg-accent transition-colors inline-flex items-center gap-2 whitespace-nowrap"
          >
            <X className="h-4 w-4" />
            Xóa bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}