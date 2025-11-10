
import { useMemo } from "react";
import type { StatCard } from "@/components/layout/base/stats";
import { FileText, CheckCircle, Clock, Archive } from "lucide-react";
import { useMatrix } from "../useMatrix";

export function useMatrixStats() {
  const { useGetMatrices } = useMatrix();
  const { data, isLoading } = useGetMatrices({ PageSize: 1000 });
  
  const stats: StatCard[] = useMemo(() => {
    const matrices = data?.data?.items || [];
    
    const totalMatrices = matrices.length;
    const activeMatrices = matrices.filter(m => m.status === 'active').length;
    const draftMatrices = matrices.filter(m => m.status === 'draft').length;
    const archivedMatrices = matrices.filter(m => m.status === 'archived').length;

    // Calculate percentages
    const activePercentage = totalMatrices > 0 
      ? Math.round((activeMatrices / totalMatrices) * 100) 
      : 0;
    
    const draftPercentage = totalMatrices > 0 
      ? Math.round((draftMatrices / totalMatrices) * 100) 
      : 0;

    return [
      {
        label: "Tổng số ma trận",
        value: totalMatrices,
        icon: FileText,
        color: "text-blue-600",
        description: "Tất cả ma trận đã tạo"
      },
      {
        label: "Đang hoạt động",
        value: activeMatrices,
        icon: CheckCircle,
        color: "text-green-600",
        description: `${activePercentage}% tổng số`,
        trend: activePercentage > 50 ? {
          value: activePercentage - 50,
          isPositive: true
        } : undefined
      },
      {
        label: "Bản nháp",
        value: draftMatrices,
        icon: Clock,
        color: "text-yellow-600",
        description: `${draftPercentage}% chưa hoàn thành`
      },
      {
        label: "Đã lưu trữ",
        value: archivedMatrices,
        icon: Archive,
        color: "text-gray-600",
        description: "Không còn sử dụng"
      }
    ];
  }, [data]);

  return { stats, isLoading };
}