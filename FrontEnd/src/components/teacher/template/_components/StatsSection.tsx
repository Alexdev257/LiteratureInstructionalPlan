import { BaseStats } from "@/components/layout/base/stats";
import { useTemplateStats } from "@/hooks/stats/template";


export default function StateSection() {
  const { stats, isLoading } = useTemplateStats();

  return (
    <BaseStats 
      stats={stats} 
      isLoading={isLoading}
      columns={{ mobile: 1, tablet: 2, desktop: 4 }}
    />
  );
}