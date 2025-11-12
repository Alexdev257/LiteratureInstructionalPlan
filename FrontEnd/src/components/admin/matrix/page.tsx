"use client";
import { useState, useMemo } from "react";
import { useAdminMatrix } from "@/hooks/useAdminMatrix"; // Hook MỚI
import { useGradeLevel } from "@/hooks/useGradeLevel";
import type { GetAllMatrixQuery, GradeLevel } from "@/utils/type";
import MatrixPageContent from "./MatrixPageContent";
import { StatsSection } from "./StatsSection"; 

export default function AdminMatrixPage() {
  
  // 1. Dùng GetAllMatrixQuery (kiểu của UI + API) cho useState
  const [filters, setFilters] = useState<GetAllMatrixQuery>({
    PageNumber: 1,
    PageSize: 10,
    IsAdmin: true, // Admin xem của mọi người
    Status: "all",
    Search: "",
    GradeLevelId: "all",
  });

  // 2. Tạo apiFilters
  const apiFilters: GetAllMatrixQuery = {
    PageNumber: filters.PageNumber,
    PageSize: filters.PageSize,
    IsAdmin: filters.IsAdmin,
    GradeLevelId: filters.GradeLevelId === "all" ? undefined : Number(filters.GradeLevelId),
    Status: filters.Status === "all" ? undefined : filters.Status,
    Search: filters.Search || undefined,
  };

  // --- 3. Fetch Data ---
  const { useGetMatrices } = useAdminMatrix(); // Dùng hook MỚI
  const { data: matrixData, isLoading, isError } = useGetMatrices(apiFilters);

  const { useGetGradeLevels } = useGradeLevel();
  const { data: gradeLevelData, isLoading: isLoadingGrades } = useGetGradeLevels({
    PageNumber: 1,
    PageSize: 100,
  });
  // ---------------------

  const matrices = matrixData?.data?.items ?? [];
  const gradeLevels = gradeLevelData?.data?.items ?? [];
  const pagination = {
    currentPage: matrixData?.data?.pageNumber ?? 1,
    totalPages: matrixData?.data?.totalPages ?? 1,
    totalItems: matrixData?.data?.totalItems ?? 0,
    itemsPerPage: matrixData?.data?.pageSize ?? 10,
  };

  // Tính toán Stats
  const stats = useMemo(() => {
    const totalMatrices = matrixData?.data?.totalItems ?? 0;
    const activeMatrices = matrices.filter((m) => m.status === "active").length; 
    const draftMatrices = matrices.filter((m) => m.status === "draft").length;
    const totalQuestions = matrices.reduce((sum, m) => sum + (m.totalQuestions || 0), 0);
    return { totalMatrices, activeMatrices, draftMatrices, totalQuestions };
  }, [matrixData, matrices]);

  return (
    <MatrixPageContent
      stats={stats}
      matrices={matrices}
      gradeLevels={gradeLevels}
      pagination={pagination}
      filters={filters}
      setFilters={setFilters}
      isLoading={isLoading || isLoadingGrades}
      isError={isError}
    />
  );
}