import { User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import type { Matrix } from "@/utils/type";

interface MatrixMetadataProps {
  matrix: Matrix;
}

export function MatrixMetadata({ matrix }: MatrixMetadataProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            Người tạo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{matrix.createdBy.fullName}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Ngày tạo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            {format(new Date(matrix.createdAt), "PPP", { locale: vi })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}