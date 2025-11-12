import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Matrix } from "@/utils/type";

interface MatrixNotesProps {
  matrix: Matrix;
}

export function MatrixNotes({ matrix }: MatrixNotesProps) {
  if (!matrix.notes) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Ghi chú
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground whitespace-pre-wrap">{matrix.notes}</p>
      </CardContent>
    </Card>
  );
}