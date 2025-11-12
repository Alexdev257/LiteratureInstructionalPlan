import { Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import { BaseTotal } from '@/components/layout/base/total';

interface StatsSectionProps {
  totalTemplates: number;
  totalPurchases: number;
  activeTemplates: number;
}

export function StatsSection({ 
  totalTemplates, 
  totalPurchases, 
  activeTemplates 
}: StatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <BaseTotal
        title="Tổng Giáo Án"
        value={totalTemplates}
        description="Tất cả giáo án trên hệ thống"
        icon={Calendar}
      />
      <BaseTotal
        title="Lượt Mua/Tải"
        value={totalPurchases}
        description="Tổng số lượt tải và mua"
        icon={TrendingUp}
      />
      <BaseTotal
        title="Đang Hoạt Động"
        value={activeTemplates}
        description="Giáo án đang hiển thị"
        icon={CheckCircle}
      />
    </div>
  );
}