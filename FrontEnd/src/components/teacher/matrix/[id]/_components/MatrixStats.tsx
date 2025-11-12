import { Hash, BookOpen, ListChecks, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Matrix } from "@/utils/type";

interface MatrixStatsProps {
  matrix: Matrix;
}

export function MatrixStats({ matrix }: MatrixStatsProps) {
  const stats = [
    {
      icon: Hash,
      label: "Mã ma trận",
      value: `#${matrix.matrixId}`,
      color: "text-primary",
    },
    {
      icon: BookOpen,
      label: "Khối lớp",
      value: matrix.gradeLevel.name,
      color: "text-foreground",
    },
    {
      icon: ListChecks,
      label: "Tổng câu hỏi",
      value: matrix.totalQuestions,
      color: "text-blue-600",
    },
    {
      icon: Target,
      label: "Tổng điểm",
      value: matrix.totalPoint.toFixed(1),
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}