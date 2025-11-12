import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";


export interface StatCard {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface BaseStatsProps {
  stats: StatCard[];
  isLoading?: boolean;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function BaseStats({ 
  stats, 
  isLoading = false,
  columns = { mobile: 1, tablet: 2, desktop: 4 }
}: BaseStatsProps) {
  const gridClasses = `grid grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} gap-4`;

  // if (isLoading) {
  //   return (
  //     <div className={gridClasses}>
  //       {Array.from({ length: 4 }).map((_, i) => (
  //         <Card key={i}>
  //           <CardContent className="p-6">
  //             <Skeleton className="h-20 w-full" />
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className={gridClasses}>
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                
                {/* Optional Description */}
                {stat.description && (
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                )}

                {/* Optional Trend Indicator */}
                {stat.trend && (
                  <div className={`flex items-center gap-1 mt-2 text-xs ${
                    stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{stat.trend.isPositive ? '↑' : '↓'}</span>
                    <span>{Math.abs(stat.trend.value)}%</span>
                  </div>
                )}
              </div>
              
              <div className={`p-3 rounded-full bg-opacity-10 ${stat.color || 'bg-gray-100'}`}>
                <stat.icon className={`h-6 w-6 ${stat.color || 'text-gray-600'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}