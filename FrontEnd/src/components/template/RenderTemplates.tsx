"use client";

import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eye,
  ShoppingCart,
  Star,
  User,
  BookOpen,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { useCartStore } from "@/stores/cardStore";
import { useTemplate } from "@/hooks/useTemplate";
import { BasePagination } from "../layout/base/pagination";
import type { TemplateQuery } from "@/utils/type";

interface Props {
  filters: TemplateQuery;
  onFiltersChange: (filters: Partial<TemplateQuery>) => void;
}

const RenderTemplates = ({ filters, onFiltersChange }: Props) => {
  const { addToCart, isInCart } = useCartStore();
  const { useGetTemplates } = useTemplate();
  const { data, isLoading, isError } = useGetTemplates(filters);

  const templates = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalItems = data?.data?.totalItems || 0;
  const currentPage = filters.PageNumber || 1;
  const pageSize = filters.PageSize || 10;

  const handlePageChange = (page: number) => {
    onFiltersChange({ PageNumber: page });
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted/30 rounded mb-4"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error or empty state
  if (isError || templates.length === 0) {
    return (
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-7xl text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
            <FileText className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Không tìm thấy tài liệu</h3>
          <p className="text-slate-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">
              Kết quả ({totalItems} tài liệu)
            </h2>
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const selected = isInCart(template.templateId.toString());
            const isFree = template.price === 0;

            return (
              <Card
                key={template.templateId}
                className="group hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      {template.gradeLevel?.name || "Chưa xác định"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${
                        isFree
                          ? "bg-green-100 text-green-800 border-green-300"
                          : "bg-yellow-100 text-yellow-800 border-yellow-300"
                      }`}
                    >
                      {isFree ? "Miễn phí" : `${template.price.toLocaleString()}đ`}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {template.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Info */}
                  <div className="space-y-3 text-sm text-muted-foreground mb-6 p-4 rounded-lg border border-border bg-muted/30 dark:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span className="font-medium truncate text-foreground">
                        {template.createdBy?.fullName || "Ẩn danh"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {template.totalDownload || 0}+ lượt tải
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 flex-shrink-0 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium text-foreground">4.8/5</span>
                      <span className="text-muted-foreground">(120 đánh giá)</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border hover:border-primary/50 hover:bg-primary/10 text-foreground transition-all duration-200"
                      onClick={() => window.open(template.viewPath, "_blank")}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem trước
                    </Button>

                    {isFree ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300"
                        onClick={() => window.open(template.filePath, "_blank")}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Tải xuống
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className={`flex-1 transition-all duration-300 ${
                          selected
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-amber-600 hover:bg-amber-700 text-white"
                        }`}
                        onClick={() =>
                          addToCart({
                            id: template.templateId.toString(),
                            title: template.title,
                            price: template.price,
                          })
                        }
                      >
                        {selected ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Đã thêm
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Mua ngay
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <BasePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default RenderTemplates;