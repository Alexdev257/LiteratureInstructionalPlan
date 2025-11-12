import { BaseHeader } from "@/components/layout/base/header";
import type { ExamQuery } from "@/utils/type";
import { useState } from "react";
import StatsSection from "./_components/StatsSection";
import SearchFilter from "./_components/SearchFilter";
import ExamListSection from "./_components/ExamListSection";


const DEFAULT_FILTERS: ExamQuery = {
    PageNumber: 1,
    PageSize: 10,
    Search: '',
    IsAdmin: false,
    IsShowCorrectAnswer: true,
    GradeLevelId: undefined,
    ExamTypeId: undefined,
};
export default function ExamPage() {
   const [filters, setFilters] = useState<ExamQuery>(DEFAULT_FILTERS);
    return (
        <div className="space-y-6 p-6 ">
            <BaseHeader
                title="Ngân Hàng Đề Thi"
                description="Quản lý tất cả đề thi của bạn"
            />

            <StatsSection />

            <SearchFilter
                queryParams={filters}
                onParamsChange={setFilters}
            />
             
             <ExamListSection
                filters={filters}
                onFiltersChange={setFilters}
            />

        </div>
    )
}
