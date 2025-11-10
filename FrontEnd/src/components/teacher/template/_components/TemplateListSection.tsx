
"use client";


import {
  Plus,
  Eye,
  Download,
  Edit2,
  Trash2,
  ArchiveRestore,
  MoreVertical,
  Loader2,
  FileText,
  DownloadIcon,
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

import { BasePagination } from "@/components/layout/base/pagination";
import { useState } from "react";
import { toast } from "sonner";
import { useSessionStore } from "@/stores/sessionStore";

import type { Template, TemplateQuery } from "@/utils/type";
import { CreateTemplateDialog } from "./CreateTemplateDialog";
import { useTemplate } from "@/hooks/useTemplate";

interface TemplateListSectionProps {
  filters: TemplateQuery;
  onFiltersChange: (filters: Partial<TemplateQuery>) => void;
}

export default function TemplateListSection({
  filters,
  onFiltersChange,
}: TemplateListSectionProps) {
  const { user } = useSessionStore();
  const { useGetTemplates } = useTemplate();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [permanentDeleteDialogOpen, setPermanentDeleteDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>("");

  const { data, isLoading, isError, error, refetch } = useGetTemplates(filters);

  const templates = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalItems || 0;
  const currentPage = filters.PageNumber || 1;
  const pageSize = filters.PageSize || 10;

  const handlePageChange = (page: number) => {
    onFiltersChange({ PageNumber: page });
  };

  const handlePreview = (viewPath: string) => {
    window.open(viewPath, "_blank");
  };

  const handleDownload = (filePath: string) => {
    window.open(filePath, "_blank");
  };

  const openEditDialog = (template: Template) => {
    setSelectedTemplate(template);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (id: number, title: string) => {
    setSelectedTemplateId(id);
    setSelectedTemplateTitle(title);
    setDeleteDialogOpen(true);
  };

  const openRestoreDialog = (id: number, title: string) => {
    setSelectedTemplateId(id);
    setSelectedTemplateTitle(title);
    setRestoreDialogOpen(true);
  };

  const openPermanentDeleteDialog = (id: number, title: string) => {
    setSelectedTemplateId(id);
    setSelectedTemplateTitle(title);
    setPermanentDeleteDialogOpen(true);
  };


  const handleDelete = () => {
    toast.success("Đã xóa template", {
      description: `"${selectedTemplateTitle}" vào thùng rác`,
    });
    setDeleteDialogOpen(false);
    refetch();
  };

  const handleRestore = () => {
    toast.success("Khôi phục thành công", {
      description: `"${selectedTemplateTitle}" đã quay lại`,
    });
    setRestoreDialogOpen(false);
    refetch();
  };

  const handlePermanentDelete = () => {
    toast.success("Xóa vĩnh viễn thành công", {
      description: `"${selectedTemplateTitle}" đã biến mất mãi mãi`,
    });
    setPermanentDeleteDialogOpen(false);
    refetch();
  };

  const canModify = (template: Template) => {
    return Number(user?.UserId) === template.createdBy?.id;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getFileIcon = (filePath: string) => {
    const ext = filePath?.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <FileText className="h-4 w-4 text-red-600" />;
    if (ext === "docx" || ext === "doc")
      return <FileText className="h-4 w-4 text-blue-600" />;
    return <FileText className="h-4 w-4 text-gray-600" />;
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
      </div>
    );
  }


  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-destructive/10 rounded-full p-6 mb-4">
          <FileText className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Có lỗi xảy ra</h3>
        <p className="text-muted-foreground text-center max-w-md mb-4">
          {error?.message || "Không thể tải dữ liệu template"}
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Thử lại
        </Button>
      </div>
    );
  }


  if (!isLoading && !isError && templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-muted rounded-full p-6 mb-4">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Không tìm thấy template</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Thử thay đổi bộ lọc hoặc tạo template mới
        </p>
        <Button onClick={() => setCreateDialogOpen(true)} className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Tạo template đầu tiên
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Template</h2>
          <p className="text-muted-foreground mt-1">
            Hiển thị {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, totalItems)} trong tổng số{" "}
            {totalItems} template
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo Template Mới
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">STT</TableHead>
              <TableHead className="min-w-[300px]">Tiêu đề</TableHead>
              <TableHead className="w-32">Giá</TableHead>
              <TableHead className="w-32">Lớp</TableHead>
              <TableHead className="w-32 text-center">Tải xuống</TableHead>
              <TableHead className="min-w-[180px]">Người tạo</TableHead>
              <TableHead className="w-32 text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template, index) => {
              const isDeleted = template.isDeleted;
              const hasPermission = canModify(template);
              const rowIndex = (currentPage - 1) * pageSize + index + 1;

              return (
                <TableRow
                  key={template.templateId}
                  className={`${
                    isDeleted ? "opacity-60 bg-muted/30" : ""
                  } hover:bg-muted/50 transition-colors`}
                >
                  {/* STT */}
                  <TableCell className="text-center font-medium">
                    {rowIndex}
                  </TableCell>

                  {/* Tiêu đề + File */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted rounded-md p-2">
                        {getFileIcon(template.filePath)}
                      </div>
                      <div>
                        <div className="font-medium line-clamp-1">
                          {template.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {template.filePath?.split("/").pop()}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Giá */}
                  <TableCell>
                    <div className="flex items-center gap-1 font-semibold text-green-600">
                      {formatPrice(template.price)}
                    </div>
                  </TableCell>

                  {/* Lớp */}
                  <TableCell>
                    <Badge variant="secondary">
                      {template.gradeLevelId?.name || "N/A"}
                    </Badge>
                  </TableCell>

                  {/* Total Download */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <DownloadIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {template.totalDownload || 0}
                      </span>
                    </div>
                  </TableCell>

                  {/* Người tạo */}
                  <TableCell>
                    <div className="text-sm font-medium">
                      {template.createdBy?.userName || "N/A"}
                    </div>
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
                        <DropdownMenuItem
                          onClick={() => handlePreview(template.viewPath)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Xem trước
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDownload(template.filePath)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Tải xuống
                        </DropdownMenuItem>

                        {hasPermission && !isDeleted && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openEditDialog(template)}
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                openDeleteDialog(
                                  template.templateId,
                                  template.title
                                )
                              }
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa tạm thời
                            </DropdownMenuItem>
                          </>
                        )}

                        {hasPermission && isDeleted && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                openRestoreDialog(
                                  template.templateId,
                                  template.title
                                )
                              }
                              className="text-green-600"
                            >
                              <ArchiveRestore className="h-4 w-4 mr-2" />
                              Khôi phục
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                openPermanentDeleteDialog(
                                  template.templateId,
                                  template.title
                                )
                              }
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa vĩnh viễn
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

      {/* Dialogs */}
      <CreateTemplateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {/* TODO: Uncomment khi có EditTemplateDialog */}
      {/* {selectedTemplate && (
        <EditTemplateDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          template={selectedTemplate}
          onSuccess={() => {
            toast.success("Cập nhật thành công!");
            refetch();
          }}
        />
      )} */}

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Xóa template
            </AlertDialogTitle>
            <AlertDialogDescription>
              Xóa <strong>"{selectedTemplateTitle}"</strong>? Template sẽ vào
              thùng rác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restore Dialog */}
      <AlertDialog
        open={restoreDialogOpen}
        onOpenChange={setRestoreDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-600">
              <ArchiveRestore className="h-5 w-5" />
              Khôi phục template
            </AlertDialogTitle>
            <AlertDialogDescription>
              Khôi phục <strong>"{selectedTemplateTitle}"</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestore} className="bg-green-600">
              Khôi phục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Permanent Delete Dialog */}
      <AlertDialog
        open={permanentDeleteDialogOpen}
        onOpenChange={setPermanentDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Xóa vĩnh viễn
            </AlertDialogTitle>
            <AlertDialogDescription>
              <strong>Không thể hoàn tác!</strong> Xóa vĩnh viễn{" "}
              <strong>"{selectedTemplateTitle}"</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePermanentDelete}
              className="bg-red-600"
            >
              Xóa vĩnh viễn
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}