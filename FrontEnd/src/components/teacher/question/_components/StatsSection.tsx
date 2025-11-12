


import { BaseStats } from "@/components/layout/base/stats";
import { useQuestioningStats } from "@/hooks/stats/question";




export default function StateSection() {
    const {stats,isLoading} = useQuestioningStats()

  return (
    <BaseStats 
      stats={stats} 
      isLoading={isLoading}
      columns={{ mobile: 1, tablet: 2, desktop: 4 }}
    />
  );
}