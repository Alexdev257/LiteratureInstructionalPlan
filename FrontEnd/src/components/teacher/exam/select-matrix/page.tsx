"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, BookOpen, AlertCircle, Loader2, FileStack, User, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useMatrix } from "@/hooks/useMatrix";
import { useExamStore } from "@/stores/examStore";
import type { MatrixQuery } from "@/utils/type";
import { BaseHeader } from "@/components/layout/base/header";
import { BasePagination } from "@/components/layout/base/pagination";
import SearchFilter from "../../matrix/_components/SearchFilter";

const DEFAULT_FILTERS: MatrixQuery = {
  PageNumber: 1,
  PageSize: 10,
  Search: "",
  IsAdmin: false,
  GradeLevelId: undefined,
};

export default function SelectMatrixPage() {
  const router = useRouter();
  const { useGetMatrices } = useMatrix();
  const { examData, setMatrixId, setCurrentStep } = useExamStore();

  const [filters, setFilters] = useState<MatrixQuery>(DEFAULT_FILTERS);
  const [selectedMatrixId, setSelectedMatrixId] = useState<number | null>(
    examData.matrixId
  );

  const { data, isLoading, isError } = useGetMatrices(filters);
  const matrices = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalItems || 0;

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const handleNext = () => {
    if (selectedMatrixId) {
      setMatrixId(selectedMatrixId);
      router.navigate({ to: "/teacher/exams/select-question" });
    }
  };

  const handleFiltersChange = (newFilters: Partial<MatrixQuery>) => {
    setFilters({ ...filters, ...newFilters, PageNumber: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, PageNumber: page });
  };

  // Status configuration matching MatrixListSection
  const getStatusConfig = (status: string) => {
    const configs = {
      active: {
        label: "Hoạt động",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      draft: {
        label: "Bản nháp",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      archived: {
        label: "Lưu trữ",
        className: "bg-red-100 text-red-800 border-red-200",
      },
    };
    return configs[status as keyof typeof configs] || configs.draft;
  };

  const getQuestionTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      "1": "Nhiều đáp án",
      "2": "Một đáp án",
      "3": "Tự luận",
    };
    return types[type] || "";
  };

  const getDifficultyLabel = (level: string) => {
    const labels: Record<string, string> = {
      "1": "Dễ",
      "2": "TB",
      "3": "Khó",
      "4": "Rất khó",
    };
    return labels[level] || "";
  };

  const getDifficultyColor = (level: string) => {
    const colors: Record<string, string> = {
      "1": "bg-green-50 text-green-700 border-green-200",
      "2": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "3": "bg-orange-50 text-orange-700 border-orange-200",
      "4": "bg-red-50 text-red-700 border-red-200",
    };
    return colors[level] || "bg-muted text-muted-foreground border-border";
  };

  const isArchived = (status: string) => status === "archived";

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <BaseHeader
        title="Tạo đề thi mới"
        description="Bước 1: Chọn ma trận đề làm cơ sở"
      />

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">
                1
              </div>
              <div>
                <p className="font-semibold text-sm">Chọn Ma trận</p>
                <p className="text-xs text-muted-foreground">Chọn cơ sở đề thi</p>
              </div>
            </div>
            <div className="flex-1 h-1 bg-muted mx-4 rounded-full" />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-sm text-muted-foreground">Chọn câu hỏi</p>
                <p className="text-xs text-muted-foreground">Lựa chọn các câu</p>
              </div>
            </div>
            <div className="flex-1 h-1 bg-muted mx-4 rounded-full" />
            <div className="flex items-center gap-2 opacity-50">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-sm text-muted-foreground">Hoàn tất</p>
                <p className="text-xs text-muted-foreground">Xác nhận & tạo</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <SearchFilter
            queryParams={filters}
            onParamsChange={handleFiltersChange}
          />
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Đang tải ma trận đề...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-destructive/10 p-4 mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Có lỗi xảy ra</h3>
            <p className="text-sm text-muted-foreground text-center">
              Không thể tải danh sách ma trận đề. Vui lòng thử lại.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Matrix List */}
      {!isLoading && !isError && matrices.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Hiển thị <span className="font-medium text-foreground">{matrices.length}</span> / <span className="font-medium">{totalItems}</span> ma trận đề
            </p>
            <Badge 
              variant={selectedMatrixId ? "default" : "outline"}
              className={selectedMatrixId ? "" : "text-muted-foreground"}
            >
              {selectedMatrixId ? "Đã chọn 1 ma trận" : "Chưa chọn"}
            </Badge>
          </div>

          <div className="space-y-4">
            {matrices.map((matrix) => {
              const isSelected = selectedMatrixId === matrix.matrixId;
              const statusConfig = getStatusConfig(matrix.status);
              const archived = isArchived(matrix.status);

              const multipleChoiceCount = matrix.details.reduce(
                (acc, cur) => (cur.questionType !== "3" ? acc + cur.quantity : acc),
                0
              );
              const essayCount = matrix.details.reduce(
                (acc, cur) => (cur.questionType === "3" ? acc + cur.quantity : acc),
                0
              );

              return (
                <Card
                  key={matrix.matrixId}
                  className={`cursor-pointer transition-all ${
                    archived ? "opacity-60 cursor-not-allowed" : ""
                  } ${
                    isSelected
                      ? "border-primary shadow-md"
                      : "hover:border-muted-foreground/30"
                  }`}
                  onClick={() => !archived && setSelectedMatrixId(matrix.matrixId)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          <FileStack className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base mb-1 line-clamp-1">
                              {matrix.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                              {matrix.description}
                            </p>
                          </div>
                          <Badge variant="outline" className={statusConfig.className}>
                            {statusConfig.label}
                          </Badge>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Lớp học</p>
                            <p className="text-sm font-medium">{matrix.gradeLevel.name}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Tổng câu hỏi</p>
                            <p className="text-sm font-medium">{matrix.totalQuestions}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Tổng điểm</p>
                            <p className="text-sm font-medium text-primary">{matrix.totalPoint}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Ngày tạo</p>
                            <p className="text-sm font-medium">
                              {new Date(matrix.createdAt).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                        </div>

                        {/* Question Type Badges */}
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {multipleChoiceCount} Trắc nghiệm
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {essayCount} Tự luận
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {matrix.details.length} Phần
                          </Badge>
                        </div>

                        {/* Matrix Details Grid */}
                        {matrix.details && matrix.details.length > 0 && (
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              {matrix.details.slice(0, 4).map((detail, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/30"
                                >
                                  <div className="flex-1 min-w-0 space-y-1">
                                    <p className="text-xs font-medium truncate">
                                      {detail.lessonName}
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                      <Badge 
                                        variant="outline" 
                                        className="text-xs h-5 px-1.5 py-0"
                                      >
                                        {getQuestionTypeLabel(detail.questionType)}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`text-xs h-5 px-1.5 py-0 ${getDifficultyColor(
                                          detail.difficulty
                                        )}`}
                                      >
                                        {getDifficultyLabel(detail.difficulty)}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="text-right ml-2 flex-shrink-0">
                                    <p className="text-xs font-semibold">
                                      {detail.quantity} câu
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {detail.scorePerQuestion}đ
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {matrix.details.length > 4 && (
                              <p className="text-xs text-muted-foreground text-center">
                                và {matrix.details.length - 4} phần khác...
                              </p>
                            )}
                          </div>
                        )}

                        {/* Footer Info */}
                        <div className="flex items-center gap-4 pt-3 border-t text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" />
                            <span>{matrix.createdBy.fullName}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>
                              {new Date(matrix.createdAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Notes */}
                        {matrix.notes && (
                          <div className="rounded-lg bg-amber-50/50 border border-amber-200/50 p-3">
                            <p className="text-xs font-medium text-amber-900 mb-1">
                              Ghi chú:
                            </p>
                            <p className="text-xs text-amber-800/90 leading-relaxed">
                              {matrix.notes}
                            </p>
                          </div>
                        )}

                        {/* Archived Warning */}
                        {archived && (
                          <div className="flex items-center gap-2 rounded-lg bg-red-50/50 border border-red-200/50 p-3">
                            <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <p className="text-xs text-red-700">
                              Ma trận này đã được lưu trữ và không thể sử dụng.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Selection Indicator */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-primary border-primary"
                              : archived
                              ? "border-muted-foreground/30 bg-muted"
                              : "border-muted-foreground/30"
                          }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <BasePagination
              currentPage={filters.PageNumber || 1}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={filters.PageSize || 10}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && !isError && matrices.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Chưa có ma trận nào</h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
              Vui lòng tạo ma trận đề trước khi tạo đề thi
            </p>
            <Button onClick={() => router.navigate({ to: "/teacher/matrix/create" })}>
              <BookOpen className="h-4 w-4 mr-2" />
              Tạo ma trận mới
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => router.navigate({ to: "/teacher/exam" })}
          size="lg"
        >
          Hủy bỏ
        </Button>
        <Button onClick={handleNext} disabled={!selectedMatrixId} size="lg">
          Tiếp theo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}