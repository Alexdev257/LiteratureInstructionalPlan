"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BaseStats } from "@/components/layout/base/stats";
import { useExamStats } from "@/hooks/stats/exam";
import { useQuestioningStats } from "@/hooks/stats/question";
import { useMatrixStats } from "@/hooks/stats/matrix";
import { useTemplateStats } from "@/hooks/stats/template";
import {
  BookOpen,
  FileText,
  Layout,
  FileCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useRouter } from "@tanstack/react-router";
import { useSessionStore } from "@/stores/sessionStore";

export default function TeacherOverviewPage() {
  const router = useRouter();
  const { user } = useSessionStore();
  const { stats: examStats, isLoading: examLoading } = useExamStats();
  const { stats: questionStats, isLoading: questionLoading } = useQuestioningStats();
  const { stats: matrixStats, isLoading: matrixLoading } = useMatrixStats();
  const { stats: templateStats, isLoading: templateLoading } = useTemplateStats();

  const isLoading = examLoading || questionLoading || matrixLoading || templateLoading;

  // Calculate total stats
  const totalExams = examStats[0]?.value as number || 0;
  const totalQuestions = questionStats[0]?.value as number || 0;
  const totalMatrices = matrixStats[0]?.value as number || 0;
  const totalTemplates = templateStats[0]?.value as number || 0;

  const quickActions = [
    {
      title: "Tạo đề thi mới",
      description: "Tạo một đề thi mới với ma trận và câu hỏi",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      href: "/teacher/exam",
    },
    {
      title: "Tạo câu hỏi",
      description: "Thêm câu hỏi mới vào ngân hàng câu hỏi",
      icon: Plus,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      href: "/teacher/question/create",
    },
    {
      title: "Tạo ma trận",
      description: "Tạo ma trận đề thi mới",
      icon: Layout,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      href: "/teacher/matrix/create",
    },
    {
      title: "Xem mẫu đề",
      description: "Quản lý và xem các mẫu đề thi",
      icon: FileCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      href: "/teacher/template",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      {/* <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Chào mừng trở lại, {user?.FullName || "Giáo viên"}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Quản lý và theo dõi tất cả hoạt động giảng dạy của bạn tại một nơi
        </p>
      </div> */}

      {/* Overall Statistics */}
      {/* <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BarChart3 className="w-6 h-6 text-primary" />
            Tổng quan thống kê
          </CardTitle>
          <CardDescription>
            Tổng hợp số liệu về các hoạt động của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-1">Tổng đề thi</p>
                    <p className="text-3xl font-bold text-blue-900">{totalExams}</p>
                    <p className="text-xs text-blue-600 mt-1">Đề thi đã tạo</p>
                  </div>
                  <div className="p-3 bg-blue-200 rounded-full">
                    <FileText className="w-8 h-8 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">Tổng câu hỏi</p>
                    <p className="text-3xl font-bold text-green-900">{totalQuestions}</p>
                    <p className="text-xs text-green-600 mt-1">Câu hỏi trong ngân hàng</p>
                  </div>
                  <div className="p-3 bg-green-200 rounded-full">
                    <BookOpen className="w-8 h-8 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 mb-1">Tổng ma trận</p>
                    <p className="text-3xl font-bold text-purple-900">{totalMatrices}</p>
                    <p className="text-xs text-purple-600 mt-1">Ma trận đề thi</p>
                  </div>
                  <div className="p-3 bg-purple-200 rounded-full">
                    <Layout className="w-8 h-8 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 mb-1">Tổng mẫu đề</p>
                    <p className="text-3xl font-bold text-orange-900">{totalTemplates}</p>
                    <p className="text-xs text-orange-600 mt-1">Mẫu đề đã tạo</p>
                  </div>
                  <div className="p-3 bg-orange-200 rounded-full">
                    <FileCheck className="w-8 h-8 text-orange-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card> */}

      {/* Quick Actions */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            Thao tác nhanh
          </CardTitle>
          <CardDescription>
            Truy cập nhanh các chức năng thường dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card
                  key={index}
                  className={`${action.bgColor} ${action.borderColor} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  onClick={() => router.navigate({ to: action.href })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-white/50 group-hover:bg-white transition-colors`}>
                        <Icon className={`w-6 h-6 ${action.color}`} />
                      </div>
                      <ArrowRight className={`w-5 h-5 ${action.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card> */}

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Thống kê đề thi
            </CardTitle>
            <CardDescription>Chi tiết về các đề thi của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <BaseStats stats={examStats} columns={{ mobile: 1, tablet: 2, desktop: 2 }} />
            )}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.navigate({ to: "/teacher/exam" })}
            >
              Xem tất cả đề thi
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Question Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Thống kê câu hỏi
            </CardTitle>
            <CardDescription>Chi tiết về ngân hàng câu hỏi</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <BaseStats stats={questionStats} columns={{ mobile: 1, tablet: 2, desktop: 2 }} />
            )}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.navigate({ to: "/teacher/question" })}
            >
              Xem tất cả câu hỏi
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Matrix Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-purple-600" />
              Thống kê ma trận
            </CardTitle>
            <CardDescription>Chi tiết về các ma trận đề thi</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <BaseStats stats={matrixStats} columns={{ mobile: 1, tablet: 2, desktop: 2 }} />
            )}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.navigate({ to: "/teacher/matrix" })}
            >
              Xem tất cả ma trận
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Template Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-orange-600" />
              Thống kê mẫu đề
            </CardTitle>
            <CardDescription>Chi tiết về các mẫu đề thi</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <BaseStats stats={templateStats} columns={{ mobile: 1, tablet: 2, desktop: 2 }} />
            )}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => router.navigate({ to: "/teacher/template" })}
            >
              Xem tất cả mẫu đề
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tips & Information */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Mẹo sử dụng hiệu quả
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Tạo ma trận trước</h4>
                <p className="text-sm text-muted-foreground">
                  Tạo ma trận đề thi trước khi tạo đề thi để có cấu trúc rõ ràng
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Quản lý ngân hàng câu hỏi</h4>
                <p className="text-sm text-muted-foreground">
                  Xây dựng ngân hàng câu hỏi phong phú để tái sử dụng
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Sử dụng mẫu đề</h4>
                <p className="text-sm text-muted-foreground">
                  Tạo mẫu đề để tiết kiệm thời gian khi tạo đề thi mới
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

