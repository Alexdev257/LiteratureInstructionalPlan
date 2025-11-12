'use client';

// === SỬA LỖI Ở ĐÂY: Thêm lại đuôi .ts ===
import { useCartStore } from "@/stores/cardStore.ts"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "@tanstack/react-router";

// Component cho một hàng trong giỏ hàng
function CartItemRow({ item, onRemove }: { item: { id: string; title: string; price: number; }; onRemove: () => void; }) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex-1 space-y-1">
        <p className="font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">
          {item.price.toLocaleString('vi-VN')} ₫
        </p>
      </div>
      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={onRemove}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

// Component trang giỏ hàng chính
export default function CartPage() {
  const { cartItems, totalPrice, removeFromCart } = useCartStore();

  return (
    <div className="container mx-auto max-w-4xl py-12 mt-16 px-4">
      {cartItems.length === 0 ? (
        // --- TRƯỜNG HỢP GIỎ HÀNG RỖNG ---
        <Card className="shadow-lg border-border/40">
          <CardContent className="p-10 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Giỏ hàng của bạn đang trống</h2>
            <p className="text-muted-foreground mb-6">
              Hãy quay lại trang giáo án để tìm thêm tài liệu nhé.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/templates" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tiếp tục mua sắm
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        // --- TRƯỜNG HỢP CÓ SẢN PHẨM ---
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Giỏ hàng của bạn</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cột bên trái: Danh sách sản phẩm */}
            <Card className="lg:col-span-2 shadow-lg border-border/40">
              <CardHeader>
                <CardTitle>Sản phẩm ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flow-root">
                  {cartItems.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onRemove={() => removeFromCart(item.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cột bên phải: Tổng kết đơn hàng */}
            <Card className="lg:col-span-1 sticky top-24 shadow-lg border-border/40">
              <CardHeader>
                <CardTitle>Tổng kết đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tổng tạm tính:</span>
                  <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                
                {/* === THAY THẾ SEPARATOR BẰNG DIV === */}
                <div className="my-2 h-px w-full bg-border" /> 

                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Tiến hành thanh toán
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}