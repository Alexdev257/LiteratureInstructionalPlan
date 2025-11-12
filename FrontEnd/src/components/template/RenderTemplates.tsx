"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, ShoppingCart, Star, User, BookOpen, FileText, CheckCircle2 } from "lucide-react";
import type { Template } from "@/utils/type";
import { useCartStore } from "@/stores/cardStore";


interface RenderTemplatesProps {
  templates: Template[];
  clearFilters: () => void;
}

const RenderTemplates = ({ templates, clearFilters }: RenderTemplatesProps) => {
  const { addToCart, isInCart } = useCartStore(); // 👈 lấy hàm từ store

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">
              Kết quả ({templates.length} tài liệu)
            </h2>
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const selected = isInCart(template.id);

            return (
              <Card
                key={template.id}
                className="group hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      {template.grade.name}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`${
                        template.price === 0
                          ? "bg-green-100 text-green-800 border-green-300"
                          : "bg-yellow-100 text-yellow-800 border-yellow-300"
                      }`}
                    >
                      {template.price === 0
                        ? "Miễn phí"
                        : `${template.price.toLocaleString()}đ`}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {template.title}
                  </CardTitle>

                  <CardDescription className="text-sm leading-relaxed line-clamp-1">
                    {template.description}
                  </CardDescription>
                </CardHeader>

               <CardContent className="pt-0">
  {/* Thông tin người tạo, lượt tải, đánh giá */}
  <div className="space-y-3 text-sm text-muted-foreground mb-6 p-4 rounded-lg border border-border bg-muted/30 dark:bg-muted/40 transition-colors">
    <div className="flex items-center gap-2">
      <User className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <span className="font-medium truncate text-foreground">
        {template.createdBy.username}
      </span>
    </div>

    <div className="flex items-center gap-2">
      <Download className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <span className="font-medium text-foreground">
        250+ lượt tải
      </span>
    </div>

    <div className="flex items-center gap-2">
      <Star className="h-4 w-4 flex-shrink-0 text-yellow-500 fill-yellow-500" />
      <span className="font-medium text-foreground">4.8/5</span>
      <span className="text-muted-foreground">(120 đánh giá)</span>
    </div>
  </div>

  {/* Các nút hành động */}
  <div className="flex gap-2">
    <Button
      variant="outline"
      size="sm"
      className="flex-1 border-border hover:border-primary/50 hover:bg-primary/10 text-foreground transition-all duration-200"
      onClick={() => window.open(template.urlView, "_blank")}
    >
      <Eye className="w-4 h-4 mr-2" />
      Xem trước
    </Button>

    {template.price === 0 ? (
      <Button
        size="sm"
        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300"
        onClick={() => window.open(template.urlDownload, "_blank")}
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
            id: template.id,
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

        {/* No Results */}
        {templates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
              <FileText className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy tài liệu</h3>
            <p className="text-slate-600 mb-4">
              Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác
            </p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RenderTemplates;
