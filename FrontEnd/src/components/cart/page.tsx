'use client';

import { useState } from 'react';
import { useCartStore } from "@/stores/cardStore"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// Cập nhật icon, thêm FileText
import { Trash2, ShoppingCart, ArrowLeft, CreditCard, FileText } from "lucide-react"; 
import { Link } from "@tanstack/react-router";
import { PaymentModal } from './PaymentModal'; 

function CartItemRow({ item, onRemove }: { item: { id: string; title: string; price: number; }; onRemove: () => void; }) {
  return (
    <div className="flex items-center py-5 border-b last:border-b-0">
      {/* Icon sản phẩm */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
          <FileText className="w-6 h-6 text-primary" />
        </div>
      </div>
      
      {/* Thông tin sản phẩm */}
      <div className="flex-1 ml-4 min-w-0">
        <p className="font-semibold text-lg text-foreground truncate" title={item.title}>
          {item.title}
        </p>
        <p className="text-base font-medium text-primary">
          {item.price.toLocaleString('vi-VN')} ₫
        </p>
      </div>
      
      {/* Nút xóa */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="ml-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
        onClick={onRemove}
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
}


// === COMPONENT TRANG GIỎ HÀNG CHÍNH ===
export default function CartPage() {
  const { cartItems, totalPrice, removeFromCart, clearCart } = useCartStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    // Thêm padding top (mt-16) để không bị header che
    <div className="container mx-auto max-w-5xl py-12 mt-16 px-4"> 
      
      {cartItems.length === 0 ? (
        // --- TRƯỜNG HỢP GIỎ HÀNG RỖNG (THIẾT KẾ LẠI) ---
        <Card className="shadow-xl border-border/20 bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-12 text-center">
            {/* Icon lớn hơn */}
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border-4 border-primary/10">
              <ShoppingCart className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Giỏ hàng của bạn đang trống</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Bạn chưa có giáo án nào. Hãy quay lại và khám phá nhé.
            </p>
            {/* Nút bấm lớn và rõ ràng hơn */}
            <Button asChild size="lg" className="text-base py-6 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/40 transition-all">
              <Link to="/templates" className="flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Khám phá giáo án
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        // --- TRƯỜNG HỢP CÓ SẢN PHẨM ---
        <>
          {/* Header của trang */}
          <div className="mb-8 pb-4 border-b">
            <h1 className="text-4xl font-bold text-foreground">Giỏ hàng của bạn</h1>
            <p className="text-lg text-muted-foreground mt-1">Kiểm tra và tiến hành thanh toán.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Cột bên trái: Danh sách sản phẩm (Thiết kế lại) */}
            <Card className="lg:col-span-2 shadow-lg border-border/20">
              <CardHeader>
                <CardTitle className="text-2xl">Danh sách sản phẩm ({cartItems.length})</CardTitle>
                <CardDescription>
                  Các giáo án bạn đã chọn để thanh toán.
                </CardDescription>
              </CardHeader>
              {/* Bỏ padding của CardContent để các row con tự căn chỉnh */}
              <CardContent className="p-0">
                <div className="flow-root px-6"> {/* Thêm padding ở đây */}
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

            {/* Cột bên phải: Tổng kết đơn hàng (Thiết kế lại) */}
            <Card className="lg:col-span-1 sticky top-24 shadow-lg border-border/20 bg-muted/30">
              <CardHeader>
                <CardTitle className="text-2xl">Tổng kết đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5"> {/* Tăng khoảng cách */}
                <div className="flex justify-between text-lg text-muted-foreground">
                  <span>Tổng tạm tính:</span>
                  <span className="font-medium text-foreground">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
                
                <div className="my-2 h-px w-full bg-border" /> 

                {/* Làm nổi bật tổng cộng */}
                <div className="flex justify-between font-bold text-2xl text-foreground">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
              </CardContent>
              <CardFooter>
                {/* Nút bấm lớn và nổi bật hơn */}
                <Button 
                  size="lg"
                  className="w-full text-base py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/40 transition-all"
                  onClick={() => setIsPaymentModalOpen(true)}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Tiến hành thanh toán
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}

      {/* Modal thanh toán (không thay đổi) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        setIsOpen={setIsPaymentModalOpen}
        totalAmount={totalPrice}
        onPaymentSuccess={clearCart} 
      />
    </div>
  );
}