import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Edit2, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Matrix } from "@/utils/type";

interface MatrixHeaderProps {
  matrix: Matrix;
}

const getStatusConfig = (status: string) => {
  const configs = {
    active: { label: "Hoạt động", variant: "default" as const, icon: CheckCircle },
    draft: { label: "Bản nháp", variant: "secondary" as const, icon: AlertCircle },
    archived: { label: "Lưu trữ", variant: "outline" as const, icon: AlertCircle },
  };
  return configs[status as keyof typeof configs] || configs.draft;
};

export function MatrixHeader({ matrix }: MatrixHeaderProps) {
  const router = useRouter();
  const statusConfig = getStatusConfig(matrix.status);
  const StatusIcon = statusConfig.icon;

  return (
    <>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.navigate({ to: "/teacher/matrix" })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => router.navigate({
            to: "/teacher/matrix/$id/edit",
            params: { id: matrix.matrixId.toString() }
          })}
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Chỉnh sửa
        </Button>
      </div>

      {/* Title & Status */}
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
              <FileText className="w-10 h-10 text-primary" />
              {matrix.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-4xl">
              {matrix.description}
            </p>
          </div>
          <Badge variant={statusConfig.variant} className="text-lg px-4 py-2 flex items-center gap-2">
            <StatusIcon className="w-5 h-5" />
            {statusConfig.label}
          </Badge>
        </div>
      </div>
    </>
  );
}