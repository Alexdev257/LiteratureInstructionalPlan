'use client';

import { useState } from 'react';
import { useCartStore } from "@/stores/cardStore"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Cập nhật icon, thêm FileText và CreditCard
import { Trash2, ShoppingCart, ArrowLeft, CreditCard, FileText } from "lucide-react"; 
import { Link } from "@tanstack/react-router";
import { PaymentModal } from './PaymentModal'; 

// Định nghĩa kiểu dữ liệu cho item trong giỏ hàng (để dùng trong state)
interface CartItem {
  id: string;
  title: string;
  price: number;
}

// === COMPONENT CON: HÀNG SẢN PHẨM (ĐÃ CẬP NHẬT) ===
function CartItemRow({ 
  item, 
  onRemove,
  onCheckout // Thêm prop "Mua ngay"
}: { 
  item: CartItem; 
  onRemove: () => void; 
  onCheckout: () => void; 
}) {
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
      
      {/* Cụm nút bấm (Đã cập nhật) */}
      <div className="flex items-center ml-4 space-x-2 flex-shrink-0">
        {/* Nút Mua ngay */}
        <Button 
          variant="default" 
          size="sm"
          className="bg-primary hover:bg-primary/90" 
          onClick={onCheckout}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Mua ngay
        </Button>

        {/* Nút xóa */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
          onClick={onRemove}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}


// === COMPONENT TRANG GIỎ HÀNG CHÍNH (ĐÃ CẬP NHẬT) ===
export default function CartPage() {
  const { cartItems, removeFromCart } = useCartStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  // Thêm state để lưu item đang được chọn thanh toán
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  // Hàm xử lý khi nhấn nút "Mua ngay"
  const handleCheckout = (item: CartItem) => {
    setSelectedItem(item);
    setIsPaymentModalOpen(true);
  };

  return (
    // Thêm padding top (mt-16) để không bị header che
    <div className="container mx-auto max-w-5xl py-12 mt-16 px-4"> 
      
      {cartItems.length === 0 ? (
        // --- TRƯỜNG HỢP GIỎ HÀNG RỖNG (GIỮ NGUYÊN) ---
        <Card className="shadow-xl border-border/20 bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border-4 border-primary/10">
              <ShoppingCart className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Giỏ hàng của bạn đang trống</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Bạn chưa có giáo án nào. Hãy quay lại và khám phá nhé.
            </p>
            <Button asChild size="lg" className="text-base py-6 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/40 transition-all">
              <Link to="/templates" className="flex items-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Khám phá giáo án
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        // --- TRƯỜNG HỢP CÓ SẢN PHẨM (ĐÃ CẬP NHẬT) ---
        <>
          {/* Header của trang */}
          <div className="mb-8 pb-4 border-b">
            <h1 className="text-4xl font-bold text-foreground">Giỏ hàng của bạn</h1>
            <p className="text-lg text-muted-foreground mt-1">Chọn giáo án bạn muốn thanh toán ngay.</p>
          </div>
          
          {/* Chỉ còn 1 cột danh sách sản phẩm */}
          <Card className="w-full shadow-lg border-border/20">
            <CardHeader>
              <CardTitle className="text-2xl">Danh sách sản phẩm ({cartItems.length})</CardTitle>
              <CardDescription>
                Các giáo án bạn đã chọn để thanh toán.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flow-root px-6">
                {cartItems.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                    onCheckout={() => handleCheckout(item)} // Gọi hàm xử lý checkout
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Modal thanh toán (Đã cập nhật props) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        setIsOpen={setIsPaymentModalOpen}
        item={selectedItem} // Truyền item được chọn
        onPaymentSuccess={() => {
          // Khi thanh toán thành công, xóa item đó khỏi giỏ hàng
          if (selectedItem) {
            removeFromCart(selectedItem.id);
          }
        }} 
      />
    </div>
  );
}