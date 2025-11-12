import { BaseHeader } from "@/components/layout/base/header";
import StateSection from "../question/_components/StatsSection";
import SearchFilter from "./_components/SearchFilter";
import QuestionListSection from "./_components/QuestionListSection";
import type { QuestionQuery } from "@/utils/type";
import { useState } from "react";



const DEFAULT_FILTERS: QuestionQuery = {
  PageNumber: 1,
  PageSize: 10,
  Search: '',
  IsAdmin: false,
  Difficulty: undefined,
  IsShowAnswer: true,
  IsShowCorrectAnswer: true,
  QuestionType: undefined,
  GradeLevelId: undefined,
};


export default function QuestionPage() {
    const [filters, setFilters] = useState<QuestionQuery>(DEFAULT_FILTERS);
  return (
   <div className="space-y-6 p-6">
         <BaseHeader
           title="Ngân Hàng Câu Hỏi"
           description="Quản lý tất cả câu hỏi của bạn"
         />
   
         <StateSection />
   
         <SearchFilter 
           queryParams={filters} 
           onParamsChange={setFilters}
         />
   
         <QuestionListSection 
           filters={filters} 
           onFiltersChange={setFilters}
         />
       </div>
  )
}
