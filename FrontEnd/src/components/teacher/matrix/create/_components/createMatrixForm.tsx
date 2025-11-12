"use client";

import { useState } from "react";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";


import { useMatrix } from "@/hooks/useMatrix";
import { useGradeLevel } from "@/hooks/useGradeLevel";
import { useSessionStore } from "@/stores/sessionStore";
import { matrixSchema, type MatrixInput } from "@/schema/matrixSchema";
import { useRouter } from "@tanstack/react-router";

export function CreateMatrixForm() {
    const router = useRouter();
    const { user } = useSessionStore();
    const { usePostMatrix } = useMatrix();
    const { useGetGradeLevels } = useGradeLevel();
    const [totalScore, setTotalScore] = useState(0);
 
    const { data: gradeLevelData, isLoading: isLoadingGradeLevels } =
        useGetGradeLevels({ PageNumber: 1, PageSize: 100 });
    const gradeLevels = gradeLevelData?.data?.items || [];

    // Form
    const form = useForm<MatrixInput>({
        resolver: zodResolver(matrixSchema),
        defaultValues: {
            title: "",
            description: "",
            gradeLevelId: undefined,
            createdAt: new Date().toISOString(),
            createdByUserId: Number(user?.UserId),
            status: "draft",
            notes: "",
            details: [
                {
                    lessonName: "",
                    questionType: "2",
                    difficulty: "2",
                    quantity: 1,
                    scorePerQuestion: 0.5,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "details",
    });

    // Calculate total score
    const calculateTotalScore = () => {
        const details = form.watch("details");
        const total = details.reduce(
            (sum, detail) => sum + detail?.quantity * detail?.scorePerQuestion,
            0
        );
        setTotalScore(total);
        return total;
    };

    // Watch for changes
    form.watch(() => {
        calculateTotalScore();
    });

    // Submit handler
    const onSubmit = async (data: MatrixInput) => {
        const total = calculateTotalScore();

        if (total > 10) {
            toast.error("Tổng điểm không được vượt quá 10!");
            return;
        }

        if (total === 0) {
            toast.error("Tổng điểm phải lớn hơn 0!");
            return;
        }
        
        if (total < 10) {
            toast.error("Tổng điểm phải bằng 10!");
            return;
        }

        usePostMatrix.mutate(
            {
                ...data,
                createdAt: new Date().toISOString(),
            },
            {
                onSuccess: (res) => {
                    if (res.isSuccess) {
                        toast.success(res.message || "Tạo ma trận thành công!");
                        router.navigate({ to: "/teacher/matrix" });
                    }
                },
                onError: (error) => {
                    console.error("Error creating matrix:", error);
                    toast.error(error.message || "Tạo ma trận thất bại. Vui lòng thử lại!");
                },
            }
        );
    };

    const getQuestionTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            "1": "Nhiều đáp án",
            "2": "Một đáp án",
            "3": "Tự luận",
        };
        return labels[type] || "";
    };

    const getDifficultyLabel = (difficulty: string) => {
        const labels: Record<string, string> = {
            "1": "Dễ",
            "2": "Trung bình",
            "3": "Khó",
            "4": "Rất khó",
        };
        return labels[difficulty] || "";
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin cơ bản</CardTitle>
                        <CardDescription>
                            Điền thông tin chung về ma trận đề thi
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Tiêu đề <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập tiêu đề ma trận..."
                                            {...field}
                                            disabled={usePostMatrix.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Mô tả <span className="text-destructive">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Nhập mô tả chi tiết..."
                                            rows={4}
                                            {...field}
                                            disabled={usePostMatrix.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Grade Level & Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="gradeLevelId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Lớp học <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            value={field.value?.toString()}
                                            disabled={usePostMatrix.isPending || isLoadingGradeLevels}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn lớp học" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {gradeLevels.map((level) => (
                                                    <SelectItem key={level.gradeLevelId} value={level.gradeLevelId.toString()}>
                                                        {level.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Trạng thái <span className="text-destructive">*</span>
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={usePostMatrix.isPending}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn trạng thái" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="draft">Nháp</SelectItem>
                                                <SelectItem value="active">Hoạt động</SelectItem>
                                                <SelectItem value="locked">Khóa</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Notes */}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ghi chú</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Thêm ghi chú (bắt buộc)..."
                                            rows={3}
                                            {...field}
                                            disabled={usePostMatrix.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Details Section */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Số lượng câu hỏi của từng bài</CardTitle>
                                <CardDescription>
                                    Thêm các câu hỏi với độ khó và điểm số
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge
                                    variant={totalScore > 10 ? "destructive" : "secondary"}
                                    className="text-base px-3 py-1"
                                >
                                    Tổng điểm: {totalScore.toFixed(1)} / 10
                                </Badge>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        append({
                                            lessonName: "",
                                            questionType: "2",
                                            difficulty: "2",
                                            quantity: 1,
                                            scorePerQuestion: 0.5,
                                        })
                                    }
                                    disabled={usePostMatrix.isPending}
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Thêm chi tiết
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {fields.map((field, index) => (
                            <Card key={field.id} className="border-2">
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-sm">
                                               Phần #{index + 1}
                                            </h4>
                                            {fields.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => remove(index)}
                                                    disabled={usePostMatrix.isPending}
                                                >
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            )}
                                        </div>

                                        {/* Lesson Name */}
                                        <FormField
                                            control={form.control}
                                            name={`details.${index}.lessonName`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Tên bài học <span className="text-destructive">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nhập tên bài học..."
                                                            {...field}
                                                            disabled={usePostMatrix.isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Question Type */}
                                            <FormField
                                                control={form.control}
                                                name={`details.${index}.questionType`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Loại câu hỏi <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            disabled={usePostMatrix.isPending}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Chọn loại" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="1"> Nhiều đáp án</SelectItem>
                                                                <SelectItem value="2"> Một đáp án</SelectItem>
                                                                <SelectItem value="3"> Tự luận</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Difficulty */}
                                            <FormField
                                                control={form.control}
                                                name={`details.${index}.difficulty`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Độ khó <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            disabled={usePostMatrix.isPending}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Chọn độ khó" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="1"> Dễ</SelectItem>
                                                                <SelectItem value="2"> Trung bình</SelectItem>
                                                                <SelectItem value="3"> Khó</SelectItem>
                                                                <SelectItem value="4"> Rất khó</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Quantity */}
                                            <FormField
                                                control={form.control}
                                                name={`details.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Số lượng <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                max="100"
                                                                placeholder="1"
                                                                {...field}
                                                                onChange={(e) =>
                                                                    field.onChange(Number(e.target.value))
                                                                }
                                                                disabled={usePostMatrix.isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Score Per Question */}
                                            <FormField
                                                control={form.control}
                                                name={`details.${index}.scorePerQuestion`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Điểm/câu <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                step="0.1"
                                                                min="0.1"
                                                                max="10"
                                                                placeholder="0.5"
                                                                {...field}
                                                                onChange={(e) =>
                                                                    field.onChange(Number(e.target.value))
                                                                }
                                                                disabled={usePostMatrix.isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Preview */}
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                            <span>
                                                {getQuestionTypeLabel(form.watch(`details.${index}.questionType`))}
                                            </span>
                                            <span>•</span>
                                            <span>
                                                {getDifficultyLabel(form.watch(`details.${index}.difficulty`))}
                                            </span>
                                            <span>•</span>
                                            <span className="font-semibold text-foreground">
                                                {form.watch(`details.${index}.quantity`)} câu × {form.watch(`details.${index}.scorePerQuestion`)} điểm = {" "}
                                                {(
                                                    form.watch(`details.${index}.quantity`) *
                                                    form.watch(`details.${index}.scorePerQuestion`)
                                                ).toFixed(1)}{" "}
                                                điểm
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.navigate({ to: "/teacher/matrix" })}
                        disabled={usePostMatrix.isPending}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại
                    </Button>
                    <Button type="submit" disabled={usePostMatrix.isPending || totalScore > 10 || totalScore === 0 || totalScore < 10}>
                        {usePostMatrix.isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Đang tạo...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Tạo ma trận
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}