import { BaseStats } from "@/components/layout/base/stats"
import { useExamStats } from "@/hooks/stats/exam"




export default function StatsSection() {
  const { stats, isLoading } = useExamStats()
  return (
    <BaseStats
      stats={stats}
      isLoading={isLoading}
      columns={{ mobile: 1, tablet: 2, desktop: 4 }}
    />
  )
}
