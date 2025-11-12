import type { AdminQuestion, QuestionStatus } from "@/utils/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"; // Icons mới

// Helper style Badge theo status
const statusStyles: Record<QuestionStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Active: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
};

// Helper style Badge theo difficulty
const difficultyStyles: Record<AdminQuestion['difficulty'], string> = {
    Easy: "bg-blue-100 text-blue-800 border-blue-200",
    Medium: "bg-purple-100 text-purple-800 border-purple-200",
    Hard: "bg-pink-100 text-pink-800 border-pink-200",
};

export function QuestionRow({ question }: { question: AdminQuestion }) {

  // Hàm rút gọn text nếu quá dài
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Format ngày 
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch (e) {
      return dateString; 
    }
  };


  return (
    <div className="grid grid-cols-[3fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center text-sm">
      {/* Câu Hỏi */}
      <div className="font-medium truncate" title={question.questionText}>
          {truncateText(question.questionText, 80)}
      </div>

      {/* Lớp */}
      <div className="text-muted-foreground">{question.grade}</div>

      {/* Bài */}
      <div className="text-muted-foreground truncate" title={question.lesson}>
          {truncateText(question.lesson, 30)}
      </div>

      {/* Cấp Độ */}
      <div>
        <Badge variant="outline" className={`text-xs ${difficultyStyles[question.difficulty]}`}>
            {question.difficulty}
        </Badge>
      </div>

      {/* Trạng Thái */}
      <div>
        <Badge variant="outline" className={`text-xs ${statusStyles[question.status]}`}>
          {question.status}
        </Badge>
      </div>

      {/* Người Tạo */}
      <div className="text-muted-foreground">{question.creatorName}</div>

      {/* Ngày Tạo */}
      <div className="text-muted-foreground">{formatDate(question.createdAt)}</div>

      {/* Ngày Sửa */}
      <div className="text-muted-foreground">{formatDate(question.updatedAt)}</div>

      {/* Hành Động */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Sửa
            </DropdownMenuItem>
            {/* Các action thay đổi tùy theo status */}
            {question.status === 'Pending' && (
              <>
                <DropdownMenuItem className="text-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Duyệt
                </DropdownMenuItem>
                 <DropdownMenuItem className="text-destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Từ chối
                </DropdownMenuItem>
              </>
            )}
             {question.status === 'Active' && (
                 <DropdownMenuItem className="text-destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Hủy kích hoạt
                </DropdownMenuItem>
             )}
             {question.status === 'Rejected' && (
                 <DropdownMenuItem className="text-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Duyệt lại
                </DropdownMenuItem>
             )}
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}