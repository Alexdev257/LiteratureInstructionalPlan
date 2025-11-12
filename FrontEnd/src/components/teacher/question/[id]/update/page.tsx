import { useParams, useRouter } from "@tanstack/react-router";
import { BaseHeader } from "@/components/layout/base/header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuestion } from "@/hooks/useQuestion";
import UpdateQuestionForm from "./_components/updateQuestionForm";


export default function UpdateQuestionPage() {
  const router = useRouter();
  const { questionId } = useParams({from: "/teacher/questions/$questionId/edit"});
  const { useGetQuestionById } = useQuestion();
  
  const { data,  isError, error } = useGetQuestionById(Number(questionId));
  const question = data?.data;

  const handleBack = () => {
    router.history.back();
  };

  // // Loading state
  // if (isLoading) {
  //   return (
  //     <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
  //       <div className="flex items-center gap-4">
  //         <Skeleton className="h-10 w-10 rounded-md" />
  //         <div className="space-y-2">
  //           <Skeleton className="h-8 w-64" />
  //           <Skeleton className="h-4 w-96" />
  //         </div>
  //       </div>
  //       <Card>
  //         <CardContent className="pt-6 space-y-4">
  //           <Skeleton className="h-10 w-full" />
  //           <Skeleton className="h-32 w-full" />
  //           <Skeleton className="h-10 w-full" />
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  // Error state
  if (isError || !question) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lỗi tải dữ liệu</AlertTitle>
          <AlertDescription>
            {error instanceof Error 
              ? error.message 
              : 'Không tìm thấy câu hỏi hoặc đã xảy ra lỗi. Vui lòng thử lại sau.'
            }
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <BaseHeader
          title="Chỉnh Sửa Ma Trận Đề Thi"
          description={`Cập nhật thông tin cho ma trận: ${question.content}`}
        />
      </div>

      <UpdateQuestionForm initialData={question} />
    </div>
  );
}