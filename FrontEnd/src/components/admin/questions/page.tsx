"use client";
import { useState } from "react";
import { useQuestionAdmin } from "@/hooks/useQuestionAdmin";
import type { GetAllPracticequestionQuery, GradeLevel } from "@/utils/type";
import QuestionPageContent from "./QuestionPageContent";
import { useGradeLevel } from "@/hooks/useGradeLevel";

export default function QuestionManagementPage() {
  const [filters, setFilters] = useState<GetAllPracticequestionQuery>({
    PageNumber: 1,
    PageSize: 10,
    IsAdmin: true,
    // Các trường UI-only
    status: "All",
    search: "",
    grade: "All",
    difficulty: "All",
    QuestionType: "All",
  });

  // --- 1. Tạo API Filters ---
  // Chỉ gửi các key mà API hỗ trợ
  const apiFilters: GetAllPracticequestionQuery = {
    PageNumber: filters.PageNumber,
    PageSize: filters.PageSize,
    IsAdmin: filters.IsAdmin,
    GradeLevelId: filters.grade === "All" ? undefined : Number(filters.grade),
    QuestionType: filters.QuestionType === "All" ? undefined : filters.QuestionType,
    // Backend KHÔNG hỗ trợ search, difficulty, status
    // Chúng ta sẽ phải lọc trên Client nếu muốn (hiện tại đã bỏ qua để giữ pagination)
  };

  // --- 2. Fetch Data ---
  const { useGetQuestions } = useQuestionAdmin();
  const { data: questionsResponse, isLoading, isError } = useGetQuestions(apiFilters);
  
  const { useGetGradeLevels } = useGradeLevel();
  const { data: gradeLevelData, isLoading: isLoadingGrades } = useGetGradeLevels({ PageNumber: 1, PageSize: 100 });
  // ---------------------
  
  // Lấy dữ liệu và thông tin pagination
  const questions = questionsResponse?.data?.items ?? [];
  const gradeLevels = gradeLevelData?.data?.items ?? [];
  const pagination = {
    currentPage: questionsResponse?.data?.pageNumber ?? 1,
    totalPages: questionsResponse?.data?.totalPages ?? 1,
    totalItems: questionsResponse?.data?.totalItems ?? 0,
    itemsPerPage: questionsResponse?.data?.pageSize ?? 10,
  };

  return (
    <QuestionPageContent
      questions={questions}
      gradeLevels={gradeLevels} // Truyền gradeLevels xuống
      isLoading={isLoading || isLoadingGrades} // Kết hợp loading
      isError={isError}
      filters={filters}
      setFilters={setFilters}
      paginationData={pagination}
    />
  );
}