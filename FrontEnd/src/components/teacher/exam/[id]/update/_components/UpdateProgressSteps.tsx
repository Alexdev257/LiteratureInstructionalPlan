import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UpdateProgressStepsProps {
  currentStep: 1 | 2;
}

export default function UpdateProgressSteps({ currentStep }: UpdateProgressStepsProps) {
  return (
    <Card className="border-border/50">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm ${
              currentStep === 1
                ? "bg-primary text-primary-foreground"
                : "bg-green-500 text-white"
            }`}>
              {currentStep > 1 ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                1
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">Chọn câu hỏi</p>
              <p className="text-xs text-muted-foreground">Cập nhật danh sách câu hỏi</p>
            </div>
          </div>
          <div className={`flex-1 h-1 mx-4 rounded-full ${
            currentStep > 1 ? "bg-green-500" : "bg-muted"
          }`} />
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${
              currentStep === 2
                ? "bg-primary text-primary-foreground"
                : currentStep < 2
                ? "bg-muted text-muted-foreground"
                : "bg-green-500 text-white"
            }`}>
              {currentStep > 2 ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                2
              )}
            </div>
            <div>
              <p className={`font-semibold text-sm ${
                currentStep === 2 ? "" : "text-muted-foreground"
              }`}>
                Xem lại & Lưu
              </p>
              <p className="text-xs text-muted-foreground">Xác nhận thay đổi</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}