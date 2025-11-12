import { DollarSign, CreditCard, Hourglass } from 'lucide-react';
import { BaseTotal } from '@/components/layout/base/total';

interface StatsSectionProps {
  totalRevenue: number;
  totalTransactions: number;
  pendingTransactions: number;
}

export function StatsSection({ 
  totalRevenue, 
  totalTransactions, 
  pendingTransactions 
}: StatsSectionProps) {
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <BaseTotal
        title="Tổng Doanh Thu"
        value={formatCurrency(totalRevenue)}
        description="Tổng doanh thu từ giáo án"
        icon={DollarSign}
      />
      <BaseTotal
        title="Tổng Giao Dịch"
        value={totalTransactions}
        description="Tổng số giao dịch đã ghi nhận"
        icon={CreditCard}
      />
      <BaseTotal
        title="Đang Chờ Xử Lý"
        value={pendingTransactions}
        description="Giao dịch chưa hoàn tất"
        icon={Hourglass}
      />
    </div>
  );
}