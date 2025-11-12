'use client';
import { useMemo } from 'react';
import FilterTemplates from "./FilterTemplates";
import HeroSection from "./HeroSection";
import { useTemplate } from '@/hooks/useTemplate';
import { useGradeLevel } from '@/hooks/useGradeLevel';
import { Skeleton } from '@/components/ui/skeleton';

export default function TemplatesPage() {
  const { useGetTemplates } = useTemplate();
  const { useGetGradeLevels } = useGradeLevel();

  // Fetch templates
  const { data: templateData, isLoading: isLoadingTemplates } = useGetTemplates({
    PageNumber: 1,
    PageSize: 100, // Lấy nhiều để filter, hoặc bạn có thể implement filter server-side
  });
  
  // Fetch grade levels
  const { data: gradeLevelData, isLoading: isLoadingGrades } = useGetGradeLevels({
    PageNumber: 1,
    PageSize: 100,
  });

  const templates = useMemo(() => templateData?.data?.items || [], [templateData]);
  const gradeLevels = useMemo(() => gradeLevelData?.data?.items || [], [gradeLevelData]);

  const isLoading = isLoadingTemplates || isLoadingGrades;

  return (
    <>
      <HeroSection />

      {isLoading ? (
        <div className="container py-8">
          <Skeleton className="h-32 w-full mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      ) : (
        <FilterTemplates
          templates={templates}
          mockGradeLevels={gradeLevels} // Prop name giữ nguyên nhưng data là thật
        />
      )}
    </>
  );
}