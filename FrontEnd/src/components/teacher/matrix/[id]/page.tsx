
import { useMatrix } from "@/hooks/useMatrix";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { MatrixHeader } from "./_components/MatrixHeader";
import { MatrixStats } from "./_components/MatrixStats";
import { MatrixMetadata } from "./_components/MatrixMetadata";
import { MatrixNotes } from "./_components/MatrixNotes";
import { MatrixDetailsTable } from "./_components/MatrixDetailsTable";
import { useParams } from "@tanstack/react-router";

export default function DetailMatrixPage() {
  const { matrixId } = useParams({from: "/teacher/matrix/$matrixId/"});
  const { useGetMatrixById } = useMatrix();
  const { data, isLoading, isError, error } = useGetMatrixById(Number(matrixId));
  
  const matrix = data?.data;

  // Validate matrixId
  if (!matrixId || isNaN(Number(matrixId))) {
    return (
      <div className="container max-w-7xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi</AlertTitle>
          <AlertDescription>ID ma trận không hợp lệ</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container max-w-7xl space-y-8 py-8">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Error state
  if (isError || !matrix) {
    return (
      <div className="container max-w-7xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi tải dữ liệu</AlertTitle>
          <AlertDescription>
            {error instanceof Error 
              ? error.message 
              : 'Không tìm thấy ma trận hoặc đã xảy ra lỗi. Vui lòng thử lại sau.'
            }
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Success state
  return (
    <div className="space-y-6 p-6 ">
      <MatrixHeader matrix={matrix} />
      <Separator />
      <MatrixStats matrix={matrix} />
      <MatrixMetadata matrix={matrix} />
      <MatrixNotes matrix={matrix} />
      <MatrixDetailsTable matrix={matrix} />
    </div>
  );
}