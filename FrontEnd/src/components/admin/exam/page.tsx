"use client";
import { useState, useMemo } from "react";
import { useAdminExams } from "@/hooks/useAdminExams"; // Hook mới
import { useGradeLevel } from "@/hooks/useGradeLevel";
import { useExamType } from "@/hooks/useExamType";
import type { ExamFilterState, GetAllExamQuery, GradeLevel, ExamType } from "@/utils/type";
import ExamPageContent from "./ExamPageContent";

export default function ExamManagementPage() {
  // 1. Dùng ExamFilterState (kiểu của UI)
  const [filters, setFilters] = useState<ExamFilterState>({
    PageNumber: 1,
    PageSize: 10,
    IsAdmin: true,
    status: "All",
    search: "", // Mặc dù API không hỗ trợ, UI vẫn cần
    grade: "All",
    difficulty: "All", // Mặc dù API không hỗ trợ, UI vẫn cần
    examType: "All",
  });

  // 2. Tạo apiFilters (kiểu của API) [cite: 6055-6089]
  const apiFilters: GetAllExamQuery = {
    PageNumber: filters.PageNumber,
    PageSize: filters.PageSize,
    IsAdmin: filters.IsAdmin,
    GradeLevelId: filters.grade === "All" ? undefined : Number(filters.grade),
    ExamTypeId: filters.examType === "All" ? undefined : Number(filters.examType),
    IsDeleted: filters.status === 'Banned' ? true : filters.status === 'Active' ? false : undefined,
    // [LƯU Ý]: API (GetAllExamQuery) không hỗ trợ 'search' hoặc 'difficulty'.
  };

  // --- 3. Fetch Data ---
  const { useGetExams } = useAdminExams();
  const { data: examsResponse, isLoading, isError } = useGetExams(apiFilters);

  const { useGetGradeLevels } = useGradeLevel();
  const { data: gradeLevelData, isLoading: isLoadingGrades } = useGetGradeLevels({ PageNumber: 1, PageSize: 100 });
  
  const { useGetExamTypes } = useExamType();
  const { data: examTypeData, isLoading: isLoadingExamTypes } = useGetExamTypes({ PageNumber: 1, PageSize: 100 });
  // ---------------------
  
  const exams = examsResponse?.data?.items ?? [];
  const gradeLevels = gradeLevelData?.data?.items ?? [];
  const examTypes = examTypeData?.data?.items ?? [];
  const pagination = {
    currentPage: examsResponse?.data?.pageNumber ?? 1,
    totalPages: examsResponse?.data?.totalPages ?? 1,
    totalItems: examsResponse?.data?.totalItems ?? 0,
    itemsPerPage: examsResponse?.data?.pageSize ?? 10,
  };
  
  // [LƯU Ý]: Do API không hỗ trợ lọc 'search', 'difficulty', 'status',
  // chúng ta sẽ lọc trên client SAU KHI fetch.
  const examsToDisplay = useMemo(() => {
    let filtered = exams; // Bắt đầu với dữ liệu từ API

    // Lọc 'difficulty' (tạm thời gán 'medium' nếu API không trả về)
    if (filters.difficulty && filters.difficulty !== "All") {
       filtered = filtered.filter(e => (/* e.difficulty ?? */ "medium") === filters.difficulty);
    }
    
    // Lọc 'search'
    if (filters.search) {
      const search = filters.search.toLowerCase();
       filtered = filtered.filter(e =>
        e.title?.toLowerCase().includes(search) ||
        e.createdBy?.userName?.toLowerCase().includes(search)
      );
    }
    
    // Lọc 'status' (Tạm thời, API DTO không có)
    if (filters.status && filters.status !== "All") {
      // filtered = filtered.filter(e => e.status === filters.status);
    }

    return filtered;
  }, [exams, filters.difficulty, filters.search, filters.status]);


  return (
    <ExamPageContent
      exams={examsToDisplay} // Truyền dữ liệu đã lọc (nếu có)
      gradeLevels={gradeLevels}
      examTypes={examTypes}
      isLoading={isLoading || isLoadingGrades || isLoadingExamTypes} 
      isError={isError}
      filters={filters}
      setFilters={setFilters}
      paginationData={pagination}
    />
  );
}