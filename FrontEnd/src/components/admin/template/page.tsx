// --- File: src/components/admin/template/page.tsx ---
"use client";
import { useState, useMemo } from "react";
import { useAdminTemplate } from "@/hooks/useAdminTemplate";
import { useGradeLevel } from "@/hooks/useGradeLevel";
import type { TemplateFilterState, GetAllTemplateQuery, GradeLevel, TemplateGetDTO } from "@/utils/type";
import TemplatePageContent from "./TemplatePageContent"; // Lỗi này sẽ được sửa khi bạn tạo file tiếp theo
import { StatsSection } from "./StatsSection"; 

export default function AdminTemplatePage() {
  
  const [filters, setFilters] = useState<TemplateFilterState>({
    PageNumber: 1,
    PageSize: 10,
    status: "All",
    Search: "",
    gradeLevel: "All",
    priceRange: "All",
  });

  const apiFilters: GetAllTemplateQuery = {
    PageNumber: filters.PageNumber,
    PageSize: filters.PageSize,
    Search: filters.Search || undefined,
    IsDeleted: filters.status === 'Banned' ? true : filters.status === 'Active' ? false : undefined,
  };

  const { useGetTemplates } = useAdminTemplate();
  const { data: templateResponse, isLoading, isError } = useGetTemplates(apiFilters);

  const { useGetGradeLevels } = useGradeLevel();
  const { data: gradeLevelData, isLoading: isLoadingGrades } = useGetGradeLevels({
    PageNumber: 1,
    PageSize: 100,
  });
  
  const templates = templateResponse?.data?.items ?? [];
  const gradeLevels = gradeLevelData?.data?.items ?? [];
  const pagination = {
    currentPage: templateResponse?.data?.pageNumber ?? 1,
    totalPages: templateResponse?.data?.totalPages ?? 1,
    totalItems: templateResponse?.data?.totalItems ?? 0,
    itemsPerPage: templateResponse?.data?.pageSize ?? 10,
  };

  // [SỬA LỖI LOGIC FILTER TẠI ĐÂY]
  const templatesToDisplay = useMemo(() => {
     let filteredTemplates = templates; // Bắt đầu với API data

      // Lọc Grade (Client-side)
      if (filters.gradeLevel && filters.gradeLevel !== "All") {
        // [SỬA LỖI 1]: Thêm (template => ...)
        filteredTemplates = filteredTemplates.filter(template => { 
          if (!template.gradeLevelId) return false;
          // [SỬA LỖI 2]: So sánh string (từ filter) với string (từ data)
          return template.gradeLevelId.id.toString() === filters.gradeLevel;
        });
      }
      
      // [TODO: Lọc PriceRange]
      
      return filteredTemplates; // Luôn trả về một mảng
  }, [templates, filters.gradeLevel, filters.priceRange]);

  // Tính Stats
  const stats = useMemo(() => ({
    totalTemplates: pagination.totalItems,
    totalPurchases: templates.reduce((sum, t) => sum + t.totalDownload, 0),
    activeTemplates: templates.filter(t => !t.isDeleted).length,
  }), [pagination.totalItems, templates]);

  return (
    <TemplatePageContent
      stats={stats}
      templates={templatesToDisplay}
      gradeLevels={gradeLevels}
      isLoading={isLoading || isLoadingGrades}
      isError={isError}
      filters={filters}
      setFilters={setFilters}
      paginationData={pagination}
    />
  );
}