import { FileText, Eye, Clock, Search } from 'lucide-react';
import { BaseTotal } from '@/components/layout/base/total';

interface StatsSectionProps {
  totalMatrices: number;
  activeMatrices: number;
  draftMatrices: number;
  totalQuestions: number;
}

export function StatsSection({ 
  totalMatrices, 
  activeMatrices, 
  draftMatrices,
  totalQuestions 
}: StatsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <BaseTotal
        title="Tổng Ma Trận"
        value={totalMatrices}
        description="Tất cả ma trận đã tạo"
        icon={FileText}
      />

      <BaseTotal
        title="Đang Hoạt Động"
        value={activeMatrices}
        description="Có thể sử dụng"
        icon={Eye}
      />

      <BaseTotal
        title="Nháp"
        value={draftMatrices}
        description="Chưa hoàn thành"
        icon={Clock}
      />

      <BaseTotal
        title="Câu Hỏi"
        value={totalQuestions}
        description="Tổng số câu hỏi"
        icon={Search}
      />
    </div>
  );
}