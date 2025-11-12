'use client';

import { useMemo } from 'react';
import { BaseHeader } from "@/components/layout/base/header";
import { StatsSection } from "./_components/StatsSection";
import { TemplateListSection } from "./_components/TemplateListSection";
import { useTemplate } from '@/hooks/useTemplate';
import { Skeleton } from '@/components/ui/skeleton';
import { useSessionStore } from '@/stores/sessionStore';

export default function TemplateManagementPage() {
  const { user } = useSessionStore();
  const { useGetTemplates } = useTemplate();
  
  // Lấy templates do user này tạo
  const { data: templateData, isLoading } = useGetTemplates({
    PageNumber: 1,
    PageSize: 10, // Bạn có thể tăng PageSize nếu muốn
    CreatedByUserId: Number(user?.UserId), // Lọc theo ID của teacher
  }, { enabled: !!user?.UserId }); // Chỉ chạy query khi có user.UserId

  // Dùng useMemo để tính toán khi data thay đổi
  const templates = useMemo(() => {
    return templateData?.data?.items || [];
  }, [templateData]);

  const totalPurchases = useMemo(() => {
    // Dùng totalDownload từ API
    return templates.reduce((sum, t) => sum + t.totalDownload, 0);
  }, [templates]);
  
  const activeTemplates = useMemo(() => {
     // Dùng isDeleted từ API
     return templates.filter(t => !t.isDeleted).length;
  }, [templates]);

  // Xử lý trạng thái loading
  if (isLoading) {
    return (
      <div className="space-y-6 p-3">
        <BaseHeader title="Quản lý Mẫu đề" description="Đang tải danh sách..." />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3">
      <BaseHeader
        title="Quản lý Mẫu đề"
        description="Quản lý và tạo mẫu đề thi cho học sinh"
      />

      <StatsSection
        totalTemplates={templateData?.data?.totalItems || 0}
        totalPurchases={totalPurchases}
        activeTemplates={activeTemplates}
      />

      <TemplateListSection templates={templates} />
    </div>
  );
}