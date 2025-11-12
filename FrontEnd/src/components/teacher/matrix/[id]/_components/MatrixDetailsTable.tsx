import { ListChecks } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Matrix } from "@/utils/type";

interface MatrixDetailsTableProps {
  matrix: Matrix;
}

const getQuestionTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    "1": "Nhiều đáp án",
    "2": "Một đáp án",
    "3": "Tự luận",
  };
  return labels[type] || "Không xác định";
};

const getDifficultyLabel = (difficulty: string) => {
  const labels: Record<string, { label: string; color: string }> = {
    "1": { label: "Dễ", color: "text-green-600 bg-green-50" },
    "2": { label: "Trung bình", color: "text-yellow-600 bg-yellow-50" },
    "3": { label: "Khó", color: "text-orange-600 bg-orange-50" },
    "4": { label: "Rất khó", color: "text-red-600 bg-red-50" },
  };
  return labels[difficulty] || labels["2"];
};

export function MatrixDetailsTable({ matrix }: MatrixDetailsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <ListChecks className="w-6 h-6 text-primary" />
          Chi tiết câu hỏi
        </CardTitle>
        <CardDescription>
          Phân bổ câu hỏi theo bài học, loại câu hỏi và độ khó
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead>Bài học</TableHead>
                <TableHead>Loại câu hỏi</TableHead>
                <TableHead>Độ khó</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead className="text-center">Điểm/câu</TableHead>
                <TableHead className="text-right">Tổng điểm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matrix.details.map((detail, index) => {
                const difficulty = getDifficultyLabel(detail.difficulty);
                const total = detail.quantity * detail.scorePerQuestion;
                return (
                  <TableRow key={detail.examMatrixDetailId || index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{detail.lessonName}</TableCell>
                    <TableCell>{getQuestionTypeLabel(detail.questionType)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficulty.color}`}>
                        {difficulty.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{detail.quantity}</TableCell>
                    <TableCell className="text-center">{detail.scorePerQuestion}</TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      {total.toFixed(1)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Tổng cộng</span>
            <div className="flex items-center gap-6">
              <span className="text-lg">
                <strong className="text-blue-600">{matrix.totalQuestions}</strong> câu hỏi
              </span>
              <span className="text-lg">
                <strong className="text-green-600">{matrix.totalPoint.toFixed(1)}</strong> điểm
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}