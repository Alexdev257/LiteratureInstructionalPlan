"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Save,
  Loader2,
  ArrowLeft,
  Clock,
  Tag,
  BookOpen,
  ListChecks,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

import { useExam } from "@/hooks/useExam";
import { useExamType } from "@/hooks/useExamType";
import { updateExamSchema, type UpdateExamInput } from "@/schema/examSchema";
import type { ExamData, Matrix } from "@/utils/type";
import { useRouter } from "@tanstack/react-router";

interface UpdateReviewStepProps {
  exam: ExamData;
  matrix: Matrix;
  selectedQuestionIds: number[];
  onBack: () => void;
  onCancel: () => void;
}

export default function UpdateReviewStep({
  exam,
  matrix,
  selectedQuestionIds,
  onBack,
  onCancel,
}: UpdateReviewStepProps) {
  const router = useRouter();
  const { usePutExam } = useExam();
  const { useGetExamTypes } = useExamType();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: examTypesData } = useGetExamTypes({
    PageSize: 100,
    PageNumber: 1,
  });
  const examTypes = examTypesData?.data?.items || [];

  const form = useForm<UpdateExamInput>({
    resolver: zodResolver(updateExamSchema),
    defaultValues: {
      title: exam.title,
      description: exam.description || "",
      durationMinutes: exam.durationMinutes,
      examTypeId: exam.examType.examTypeId,
      matrixId: exam.matrixId,
      questionIds: selectedQuestionIds,
    },
  });

  const onSubmit = async (data: UpdateExamInput) => {
    setIsSubmitting(true);

    const payload: UpdateExamInput = {
      ...data,
      matrixId: exam.matrixId,
      questionIds: selectedQuestionIds,
    };

    usePutExam.mutate(
      {
        id: exam.examId,
        data: payload,
      },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            toast.success(res.message || "Cập nhật đề thi thành công!");
            router.navigate({ to: `/teacher/exams/${exam.examId}` });
          } else {
            toast.error(res.message || "Cập nhật đề thi thất bại!");
            setIsSubmitting(false);
          }
        },
        onError: (error) => {
          toast.error(error.message || "Có lỗi xảy ra. Vui lòng thử lại!");
          setIsSubmitting(false);
        },
      }
    );
  };

  const requiredCount = matrix.details.reduce((sum, detail) => sum + detail.quantity, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT - Form */}
      <div className="lg:col-span-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Thông tin đề thi</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Tên đề thi <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VD: Đề kiểm tra giữa kỳ 1 - Lớp 6"
                          className="h-11"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Tên đề thi nên rõ ràng và dễ hiểu
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Mô tả <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả chi tiết về đề thi..."
                          rows={4}
                          className="resize-none"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        Mô tả ngắn gọn về nội dung và mục đích
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="durationMinutes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Thời gian (phút) <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="60"
                              min={1}
                              max={300}
                              className="pl-11 h-11"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              disabled={isSubmitting}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Từ 1 đến 300 phút</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="examTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Loại đề thi <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          value={field.value?.toString()}
                          disabled={isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-gray-400" />
                                <SelectValue placeholder="Chọn loại đề thi" />
                              </div>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {examTypes.map((type) => (
                              <SelectItem
                                key={type.examTypeId}
                                value={type.examTypeId.toString()}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Phân loại đề thi theo mục đích sử dụng
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="flex justify-between gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="h-11"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      disabled={isSubmitting}
                      className="h-11"
                    >
                      Hủy bỏ
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang cập nhật...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Lưu thay đổi
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT - Summary */}
      <div>
          <Card className="border-border/50 sticky top-6">
            <CardHeader>
              <CardTitle>Tóm tắt</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    MA TRẬN ĐỀ
                  </p>
                </div>
                <p className="text-sm font-semibold">ID: #{matrix.matrixId}</p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="h-4 w-4 text-gray-400" />
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    SỐ CÂU HỎI
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-primary">
                    {selectedQuestionIds.length}
                  </p>
                  <p className="text-sm text-muted-foreground">câu hỏi</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  THÔNG TIN HIỆN TẠI
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tên đề thi:</span>
                    <span className="font-medium">
                      {exam.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Thời gian:</span>
                    <span className="font-medium">
                      {exam.durationMinutes} phút
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loại đề:</span>
                    <span className="font-medium">
                      {examTypes.find(t => t.examTypeId === exam.examType.examTypeId)?.name || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}