import { BaseStats } from "@/components/layout/base/stats";
import { useMatrixStats } from "@/hooks/stats/matrix";


export default function StateSection() {
  const { stats, isLoading } = useMatrixStats();

  return (
    <BaseStats 
      stats={stats} 
      isLoading={isLoading}
      columns={{ mobile: 1, tablet: 2, desktop: 4 }}
    />
  );
}