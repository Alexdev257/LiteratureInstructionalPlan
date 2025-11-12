import { Calendar, TrendingUp } from 'lucide-react';
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
        title="Tổng mẫu đề"
        value={totalTemplates}
        description="+3 so với tháng trước"
        icon={Calendar}
      />

      <BaseTotal
        title="Lượt mua"
        value={totalPurchases}
        description="+12.5% so với tháng trước"
        icon={TrendingUp}
      />

      <BaseTotal
        title="Đang hoạt động"
        value={activeTemplates}
        description="Mẫu đề đang được sử dụng"
      />
    </div>
  );
}