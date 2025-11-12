"use client";
import { useState } from "react";
import { useQuestionAdmin } from "@/hooks/useQuestionAdmin";
// [SỬA LỖI]: Import đúng type 'QuestionFilters' và thêm 'GetAllPracticequestionQuery'
import type { QuestionFilters, GetAllPracticequestionQuery, GradeLevel } from "@/utils/type"; 
import QuestionPageContent from "./QuestionPageContent";
import { useGradeLevel } from "@/hooks/useGradeLevel";

export default function QuestionManagementPage() {
  // 1. Dùng QuestionFilters (kiểu của UI) cho useState
  const [filters, setFilters] = useState<QuestionFilters>({
    PageNumber: 1,
    PageSize: 10,
    status: "All",
    search: "",
    grade: "All",
    lesson: "All",
    difficulty: "All",
    IsAdmin: true,
  });

  // 2. Tạo apiFilters (kiểu của API) [cite: 6483-6547]
  // Chỉ chọn các trường mà API 'GetAllPracticequestionQuery' hỗ trợ
  const apiFilters: GetAllPracticequestionQuery = {
    PageNumber: filters.PageNumber,
    PageSize: filters.PageSize,
    IsAdmin: filters.IsAdmin,
    GradeLevelId: filters.grade === "All" ? undefined : Number(filters.grade),
    QuestionType: filters.QuestionType === "All" ? undefined : filters.QuestionType,
    CreatedByUserId: filters.CreatedByUserId,
  };

  // --- 3. Fetch Data ---
  const { useGetQuestions } = useQuestionAdmin();
  const { data: questionsResponse, isLoading, isError } = useGetQuestions(apiFilters);
  
  const { useGetGradeLevels } = useGradeLevel();
  const { data: gradeLevelData, isLoading: isLoadingGrades } = useGetGradeLevels({ PageNumber: 1, PageSize: 100 });
  // ---------------------
  
  const questions = questionsResponse?.data?.items ?? [];
  const gradeLevels = gradeLevelData?.data?.items ?? [];
  const pagination = {
    currentPage: questionsResponse?.data?.pageNumber ?? 1,
    totalPages: questionsResponse?.data?.totalPages ?? 1,
    totalItems: questionsResponse?.data?.totalItems ?? 0,
    itemsPerPage: questionsResponse?.data?.pageSize ?? 10,
  };

  return (
    // 4. Truyền filters (state của UI) xuống
    <QuestionPageContent
      questions={questions}
      gradeLevels={gradeLevels} 
      isLoading={isLoading || isLoadingGrades}
      isError={isError}
      filters={filters} // Truyền state UI
      setFilters={setFilters} // Truyền hàm set state UI
      paginationData={pagination}
    />
  );
}