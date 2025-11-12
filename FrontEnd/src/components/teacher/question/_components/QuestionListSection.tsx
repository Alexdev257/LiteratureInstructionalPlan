"use client";

import { useState } from "react";
import {
    Plus,
    Eye,
    Edit2,
    Trash2,
    MoreVertical,
    Loader2,
    HelpCircle,
    AlertCircle,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BasePagination } from "@/components/layout/base/pagination";
import { toast } from "sonner";
import { useSessionStore } from "@/stores/sessionStore";
import { useRouter } from "@tanstack/react-router";

import type { Question, QuestionQuery } from "@/utils/type";
import { useQuestion } from "@/hooks/useQuestion";

interface QuestionListSectionProps {
    filters: Partial<QuestionQuery>;
    onFiltersChange: (filters: Partial<QuestionQuery>) => void;
}

export default function QuestionListSection({
    filters,
    onFiltersChange,
}: QuestionListSectionProps) {
    const router = useRouter();
    const { user } = useSessionStore();
    const { useGetQuestions,useDeleteQuestion } = useQuestion();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
    const [selectedQuestionContent, setSelectedQuestionContent] = useState<string>("");
    const [previewContent, setPreviewContent] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const openPreview = (content: string) => {
        setPreviewContent(content);
        setPreviewOpen(true);
    };
    const { data, isLoading, isError, error, refetch } = useGetQuestions(filters);

    const questions = data?.data?.items || [];
    const totalPages = data?.data?.totalPages || 1;
    const totalItems = data?.data?.totalItems || 0;
    const currentPage = filters.PageNumber || 1;
    const pageSize = filters.PageSize || 10;

    const handlePageChange = (page: number) => {
        onFiltersChange({ PageNumber: page });
    };

    const handleView = (questionId: number) => {
        router.navigate({ to: `/teacher/questions/${questionId}` });
    };

    const handleEdit = (questionId: number) => {
        router.navigate({ to: `/teacher/questions/${questionId}/edit` });
    };

    const handleCreateNew = () => {
        router.navigate({ to: "/teacher/questions/create" });
    };

    const openDeleteDialog = (questionId: number, content: string) => {
        setSelectedQuestionId(questionId);
        setSelectedQuestionContent(content);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (selectedQuestionId !== null) {
            useDeleteQuestion.mutate(selectedQuestionId, {
                onSuccess: (res) => {
                    if (res.isSuccess) {
                        toast.success("Đã xóa câu hỏi", {
                            description: `Câu hỏi đã được xóa thành công`,
                        });
                        setDeleteDialogOpen(false);
                        refetch();
                    } else {
                        toast.error(res.message || "Xóa thất bại!");
                    }
                },
                onError: (error) => {
                    toast.error(error?.message || "Lỗi hệ thống!");
                },
            });
        }
    };

    const canModify = (question: Question) => {
        return Number(user?.UserId) === question.createdBy.userId;
    };

    const getQuestionTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            "1": "Nhiều đáp án",
            "2": "Một đáp án",
            "3": "Tự luận",
        };
        return labels[type] || "N/A";
    };

    const getQuestionTypeBadgeColor = (type: string) => {
        const colors: Record<string, string> = {
            "1": "bg-blue-100 text-blue-800 border-blue-200",
            "2": "bg-green-100 text-green-800 border-green-200",
            "3": "bg-purple-100 text-purple-800 border-purple-200",
        };
        return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    const getDifficultyLabel = (difficulty: string) => {
        const labels: Record<string, string> = {
            "1": "Dễ",
            "2": "Trung bình",
            "3": "Khó",
            "4": "Rất khó",
        };
        return labels[difficulty] || "N/A";
    };

    const getDifficultyBadgeColor = (difficulty: string) => {
        const colors: Record<string, string> = {
            "1": "bg-green-100 text-green-800 border-green-200",
            "2": "bg-yellow-100 text-yellow-800 border-yellow-200",
            "3": "bg-orange-100 text-orange-800 border-orange-200",
            "4": "bg-red-100 text-red-800 border-red-200",
        };
        return colors[difficulty] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
            </div>
        );
    }

    // Error State
    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-destructive/10 rounded-full p-6 mb-4">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
                <p className="text-muted-foreground text-center max-w-md mb-4">
                    {error?.message || "Không thể tải dữ liệu câu hỏi"}
                </p>
                <Button onClick={() => refetch()} variant="outline">
                    Thử lại
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Quản lý Câu hỏi</h2>
                        <p className="text-muted-foreground mt-1">
                            Hiển thị {(currentPage - 1) * pageSize + 1} -{" "}
                            {Math.min(currentPage * pageSize, totalItems)} trong tổng số{" "}
                            {totalItems} câu hỏi
                        </p>
                    </div>
                    <Button onClick={handleCreateNew}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tạo Câu Hỏi Mới
                    </Button>
                </div>
                {
                    !isLoading && !isError && questions.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="bg-muted rounded-full p-6 mb-4">
                                <HelpCircle className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Không tìm thấy câu hỏi</h3>
                            <p className="text-muted-foreground text-center max-w-md">
                                Thử thay đổi bộ lọc hoặc tạo câu hỏi mới
                            </p>
                            <Button onClick={handleCreateNew} className="mt-4">
                                <Plus className="h-4 w-4 mr-2" />
                                Tạo câu hỏi đầu tiên
                            </Button>
                        </div>
                    )
                }
                {/* Table */}
                <div className="rounded-md border bg-card">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16 text-center">STT</TableHead>
                                <TableHead className="w-64">Câu hỏi</TableHead>
                                <TableHead className="w-32">Loại câu hỏi</TableHead>
                                <TableHead className="w-32">Độ khó</TableHead>
                                <TableHead className="w-24 text-center">Số đáp án</TableHead>
                                <TableHead className="w-24">Lớp</TableHead>
                                <TableHead className="min-w-[150px]">Người tạo</TableHead>
                                <TableHead className="w-32">Ngày tạo</TableHead>
                                <TableHead className="w-24 text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {questions.map((question, index) => {
                                const hasPermission = canModify(question);
                                const rowIndex = (currentPage - 1) * pageSize + index + 1;
                                const isLongContent = question.content.length > 10;
                                return (
                                    <TableRow
                                        key={question.questionId}
                                        className="hover:bg-muted/50 transition-colors"
                                    >
                                        {/* STT */}
                                        <TableCell className="text-center font-medium">
                                            {rowIndex}
                                        </TableCell>

                                        {/* Câu hỏi */}
                                        <TableCell className="py-3 !whitespace-normal">
                                            <div className="group relative w-64">
                                                <div
                                                    className="font-medium text-foreground leading-relaxed"
                                                    style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        wordBreak: 'break-word'
                                                    } as React.CSSProperties}
                                                    title={question.content}
                                                >
                                                    {question.content || "Không có nội dung"}
                                                </div>

                                                {/* Nút Xem thêm */}
                                                {isLongContent && (
                                                    <button
                                                        onClick={() => openPreview(question.content)}
                                                        className="
                    absolute right-0 top-1/2 -translate-y-1/2 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200
                    text-primary hover:text-primary/80
                    text-xs font-semibold 
                    underline underline-offset-2
                    bg-background/90 backdrop-blur-sm
                    px-2 py-0.5 rounded
                    shadow-sm
                "
                                                    >
                                                        Xem thêm
                                                    </button>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Loại câu hỏi */}
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={getQuestionTypeBadgeColor(question.questionType)}
                                            >
                                                {getQuestionTypeLabel(question.questionType)}
                                            </Badge>
                                        </TableCell>

                                        {/* Độ khó */}
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={getDifficultyBadgeColor(question.difficulty)}
                                            >
                                                {getDifficultyLabel(question.difficulty)}
                                            </Badge>
                                        </TableCell>

                                        {/* Số đáp án */}
                                        <TableCell className="text-center">
                                            <span className="font-medium">
                                                {question.answer?.length || 0}
                                            </span>
                                        </TableCell>

                                        {/* Lớp */}
                                        <TableCell>
                                            <Badge variant="secondary">
                                                Lớp {question.gradeLevel.name}
                                            </Badge>
                                        </TableCell>

                                        {/* Người tạo */}
                                        <TableCell>
                                            <div className="text-sm">
                                                <p className="font-medium text-foreground">
                                                    {question.createdBy.fullName || "N/A"}
                                                </p>
                                            </div>
                                        </TableCell>

                                        {/* Ngày tạo */}
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(question.createdAt).toLocaleDateString("vi-VN", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </TableCell>

                                        {/* Action */}
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {/* View - Always available */}
                                                    <DropdownMenuItem
                                                        onClick={() => handleView(question.questionId)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Xem chi tiết
                                                    </DropdownMenuItem>

                                                    {/* Edit & Delete - Only for creator */}
                                                    {hasPermission && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => handleEdit(question.questionId)}
                                                            >
                                                                <Edit2 className="h-4 w-4 mr-2" />
                                                                Chỉnh sửa
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    openDeleteDialog(
                                                                        question.questionId,
                                                                        question.content
                                                                    )
                                                                }
                                                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Xóa
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <BasePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={pageSize}
                        onPageChange={handlePageChange}
                    />
                )}

                {/* Delete Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                                <Trash2 className="h-5 w-5" />
                                Xóa câu hỏi
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <p className="mb-2">
                                    Bạn có chắc chắn muốn xóa câu hỏi này không?
                                </p>
                                <p className="text-sm font-medium text-foreground line-clamp-2 bg-muted p-2 rounded">
                                    "{selectedQuestionContent}"
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Hành động này không thể hoàn tác.
                                </p>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
                                Xóa câu hỏi
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>



            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Nội dung câu hỏi</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap break-words">
                            {previewContent || "Không có nội dung"}
                        </p>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setPreviewOpen(false)}>Đóng</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
