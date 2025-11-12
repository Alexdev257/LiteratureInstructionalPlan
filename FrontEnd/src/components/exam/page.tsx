
"use client";
import HeroSection from "./HeroSection";
import type { ExamQuery } from "@/utils/type";
import SearchFilter from "../teacher/exam/_components/SearchFilter";
import { useState } from "react";
import RenderResults from "./RenderResults";


const DEFAULT_FILTERS: ExamQuery = {
    PageNumber: 1,
    PageSize: 10,
    Search: '',
    IsAdmin: false,
    IsShowCorrectAnswer: true,
    GradeLevelId: undefined,
    ExamTypeId: undefined,
};
const ExamPage = () => {
    const [filters, setFilters] = useState<ExamQuery>(DEFAULT_FILTERS);
    return (

        <>
            {/* Header Section */}
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

                <SearchFilter
                    queryParams={filters}
                    onParamsChange={setFilters}
                />
                <RenderResults
                  filters={filters}
                   onFiltersChange={setFilters}
                />
            </div>




        </>
    );
};

export default ExamPage;
