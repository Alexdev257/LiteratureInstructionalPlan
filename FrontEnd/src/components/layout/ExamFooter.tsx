
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Trophy,
  BookOpen,
  HelpCircle,
  Shield,
  Wifi,
  Battery
} from "lucide-react";
import { useParams } from "@tanstack/react-router";
import { mockExamData } from "@/utils/mockAPi";

export const ExamFooter = () => {
  const { examId } = useParams({ from: "/exam/$examId/$attemptId" });
  const exam = mockExamData.find(e => e.examId === Number(examId));
  
  const isEssayExam = exam?.examTypeId === 2;
  const currentTime = new Date().toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-4">
        {/* Mobile compact footer */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <Save className="w-3 h-3 mr-1" />
                <span className="text-xs">Lưu</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <HelpCircle className="w-3 h-3 mr-1" />
                <span className="text-xs">Trợ giúp</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop full footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Exam Status */}
            <Card className="border-muted/50">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <h4 className="font-semibold text-sm">Trạng thái</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thời gian:</span>
                    <span className="font-medium">37:25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isEssayExam ? "Từ viết:" : "Câu làm:"}
                    </span>
                    <span className="font-medium">
                      {isEssayExam ? "247/600" : "14/50"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lưu:</span>
                    <Badge variant="secondary" className="text-xs h-4 px-1">
                      <Clock className="w-2 h-2 mr-1" />
                      2p trước
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-muted/50">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <h4 className="font-semibold text-sm">Thao tác</h4>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    <Save className="w-3 h-3 mr-1" />
                    Lưu
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    <HelpCircle className="w-3 h-3 mr-1" />
                    Trợ giúp
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Báo lỗi
                  </Button>
                  <Button variant="destructive" size="sm" className="text-xs h-7 px-2">
                    <Trophy className="w-3 h-3 mr-1" />
                    Nộp bài
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-muted/50">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <h4 className="font-semibold text-sm">Hệ thống</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kết nối:</span>
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3 text-green-500" />
                      <Badge variant="default" className="text-xs h-4 px-1 bg-green-500">
                        Tốt
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bảo mật:</span>
                    <Badge variant="secondary" className="text-xs h-4 px-1">
                      <Shield className="w-2 h-2 mr-1" />
                      SSL
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trình duyệt:</span>
                    <div className="flex items-center gap-1">
                      <Battery className="w-3 h-3 text-green-500" />
                      <span className="font-medium">98%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time & Support */}
            <Card className="border-muted/50">
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <h4 className="font-semibold text-sm">Thông tin</h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hiện tại:</span>
                    <span className="font-mono font-medium">{currentTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phiên:</span>
                    <span className="font-medium">v2.4.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hỗ trợ:</span>
                    <span className="font-medium text-primary">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Đang kết nối ổn định</span>
              </div>
              <div className="hidden lg:block">
                © 2024 EduExam System - Bảo mật cao
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Hotline: 1900-1234</span>
              <span>•</span>
              <span>support@eduexam.vn</span>
              <Badge variant="outline" className="ml-2">
                <Shield className="w-3 h-3 mr-1" />
                Bảo mật
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ExamFooter;
