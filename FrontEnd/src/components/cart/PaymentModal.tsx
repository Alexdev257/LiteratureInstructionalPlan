import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Wallet, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import tiện ích cn

// Định nghĩa các trạng thái của modal
type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalAmount: number;
  onPaymentSuccess: () => void; // Hàm callback khi thanh toán thành công
}

// === LOGO SVG CHO VNPAY ===
// (Chúng ta định nghĩa logo trực tiếp ở đây để không cần import file ảnh)
const VNPayLogo = () => (
  <svg width="40" height="40" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M512 0C229.23 0 0 229.23 0 512S229.23 1024 512 1024 1024 794.77 1024 512 794.77 0 512 0Z" fill="#005A9C"/>
    <path d="M783.5 322.65C747.03 286.18 696.53 264 642 264C546.61 264 466.82 343.79 466.82 439.18V458.82C466.82 489.17 483.91 516.33 511.08 528.82C538.25 541.32 570.63 543.91 599.99 537.16C629.35 530.41 654.5 513.32 667.01 486.15C679.52 458.98 677.89 427.62 663.02 401.5L626.54 340.24C619.08 327.31 608.28 317.06 595.34 310.8C582.4 304.55 567.89 302.58 553.81 305.17C504.99 313.36 470.19 359.01 478.38 407.83L490.9 470.18C496.06 498.41 486.6 527.12 465.73 545.98C444.86 564.84 415.02 571.19 387.6 562.01L248.68 518.06C234.99 513.78 222.7 506.66 212.87 497.26C203.04 487.87 195.91 476.44 192.01 463.78C180.99 428.16 200.03 388.9 235.65 377.88L382.4 331.42C419.87 319.95 459.72 338.4 471.19 375.87L483.71 438.22C485.01 442.22 489.01 444.82 493.01 443.52C497.01 442.22 499.61 438.22 498.31 434.22L485.79 371.87C468.7 317.29 417.61 280.82 363.02 297.91L216.27 344.37C150.84 365.24 122.13 438.86 143 504.28C163.87 569.7 237.49 598.41 302.91 577.54L441.83 533.59C484.58 519.31 517.9 486.75 526.86 443.04L529.44 428.82C529.44 374.24 579.94 329.87 634.53 329.87C670.6 329.87 702.39 344.97 724.87 368.64L761.34 406.3C770.36 415.7 775.39 428.49 775.39 441.88C775.39 479.95 744.17 511.16 706.1 511.16C688.08 511.16 670.67 504.7 657.29 492.99C638.19 476.32 629.86 450.48 635.85 425.29L642 396.46C643.3 392.46 647.3 389.86 651.3 391.16C655.3 392.46 657.9 396.46 656.6 400.46L650.45 429.29C640.62 469.32 660.08 511.75 697.16 526.84C720.04 536.02 745.5 536.61 769.17 528.28C792.83 519.95 812.89 503.4 825.82 482.02C838.74 460.64 843.6 435.84 839.4 411.33C835.2 386.82 822.28 364.53 803.02 347.96L783.5 322.65Z" fill="#FFF"/>
  </svg>
);

// === LOGO SVG CHO MOMO ===
const MomoLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#D82D8B"/>
    <path d="M20.0003 14.283C19.508 13.149 18.441 12.015 16.8003 12.015C14.767 12.015 13.1256 13.535 13.1256 15.655C13.1256 17.775 14.767 19.296 16.8003 19.296C18.441 19.296 19.508 18.162 20.0003 17.028H24.3636C24.1673 19.061 23.033 21.094 21.223 22.384C19.9876 23.287 18.4663 23.738 16.8003 23.738C12.4363 23.738 8.99164 20.18 8.99164 15.655C8.99164 11.13 12.4363 7.573 16.8003 7.573C18.4663 7.573 19.9876 8.024 21.223 8.927C23.033 10.217 24.1673 12.25 24.3636 14.283H20.0003Z" fill="white"/>
    <path d="M26.8744 19.296C28.9077 19.296 30.5491 17.775 30.5491 15.655C30.5491 13.535 28.9077 12.015 26.8744 12.015C25.2337 12.015 24.1673 13.149 23.675 14.283H19.3113C19.5077 12.25 20.642 10.217 22.452 8.927C23.6873 8.024 25.2087 7.573 26.8744 7.573C31.2384 7.573 34.683 11.13 34.683 15.655C34.683 20.18 31.2384 23.738 26.8744 23.738C25.2087 23.738 23.6873 23.287 22.452 22.384C20.642 21.094 19.5077 19.061 19.3113 17.028H23.675C24.1673 18.162 25.2337 19.296 26.8744 19.296Z" fill="white"/>
  </svg>
);


export function PaymentModal({ isOpen, setIsOpen, totalAmount, onPaymentSuccess }: PaymentModalProps) {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [selectedMethod, setSelectedMethod] = useState<'momo' | 'vnpay' | null>(null);

  // Reset trạng thái về 'pending' mỗi khi modal được mở
  useEffect(() => {
    if (isOpen) {
      // Thêm một chút delay để animation của dialog đẹp hơn
      setTimeout(() => {
        setStatus('pending');
        setSelectedMethod(null);
      }, 100); 
    }
  }, [isOpen]);

  const handlePayment = (method: 'momo' | 'vnpay') => {
    setSelectedMethod(method);
    setStatus('processing');
    setTimeout(() => {
      if (Math.random() > 0.5) { // 80% tỷ lệ thành công
        setStatus('success');
      } else {
        setStatus('failed');
      }
    }, 2500); 
  };
  const handleSuccessClose = () => {
    onPaymentSuccess(); // Gọi callback (clearCart)
    setIsOpen(false);
  };

  const renderContent = () => {
    // === TRẠNG THÁI: ĐANG XỬ LÝ ===
    if (status === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center p-12 min-h-[400px] text-center">
          {/* Hiển thị logo của phương thức đã chọn */}
          {selectedMethod === 'momo' ? <MomoLogo /> : <VNPayLogo />}
          <Loader2 className="w-12 h-12 text-primary animate-spin my-6" />
          <h3 className="text-xl font-semibold text-foreground">Đang kết nối với {selectedMethod === 'momo' ? 'Ví Momo' : 'VNPay'}...</h3>
          <p className="text-muted-foreground mt-2">Vui lòng không tắt cửa sổ này.</p>
        </div>
      );
    }
    
    // === TRẠNG THÁI: THÀNH CÔNG ===
    if (status === 'success') {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Thanh toán thành công!</h3>
          <p className="text-lg text-muted-foreground mb-4">
            Bạn đã thanh toán thành công 
            <span className="font-bold text-foreground mx-1">
              {totalAmount.toLocaleString('vi-VN')} ₫
            </span>.
          </p>
          <p className="text-muted-foreground mb-8">Cảm ơn bạn đã mua sắm.</p>
          <Button onClick={handleSuccessClose} className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
            Tuyệt vời!
          </Button>
        </div>
      );
    }

    // === TRẠNG THÁI: THẤT BẠI ===
    if (status === 'failed') {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Thanh toán thất bại</h3>
          <p className="text-muted-foreground mb-8">
            Đã có lỗi xảy ra trong quá trình xử lý.
            <br />
            Vui lòng thử lại bằng phương thức khác.
          </p>
          <div className="flex gap-4 w-full">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1 text-base py-6">
              Đóng
            </Button>
            <Button onClick={() => setStatus('pending')} className="flex-1 text-base py-6">
              Thử lại
            </Button>
          </div>
        </div>
      );
    }

    // === TRẠNG THÁI: CHỌN PHƯƠNG THỨC (MẶC ĐỊNH) ===
    return (
      <>
        {/* Header với icon và nền đẹp hơn */}
        <DialogHeader className="p-6 bg-muted/30 border-b text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Thanh toán đơn hàng</DialogTitle>
          <DialogDescription className="text-lg">
            Tổng cộng:
            <span className="font-bold text-3xl text-primary ml-2">
              {totalAmount.toLocaleString('vi-VN')} ₫
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* Phần thân chọn phương thức */}
        <div className="p-6">
          <h4 className="font-semibold mb-4 text-muted-foreground">Chọn phương thức thanh toán:</h4>
          <div className="space-y-4">
            {/* Nút VNPay (đã thiết kế lại) */}
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start h-20 text-left p-4 transition-all duration-200 border-2",
                selectedMethod === 'vnpay' ? "border-primary bg-primary/5" : "hover:border-primary/50 hover:bg-primary/5"
              )} 
              onClick={() => handlePayment('vnpay')}
            >
              <VNPayLogo />
              <div className="ml-4">
                <span className="text-base font-semibold text-foreground">Thanh toán qua VNPay</span>
                <p className="text-sm font-normal text-muted-foreground">QR Code, Thẻ nội địa, Thẻ quốc tế.</p>
              </div>
            </Button>
            
            {/* Nút Momo (đã thiết kế lại) */}
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start h-20 text-left p-4 transition-all duration-200 border-2",
                selectedMethod === 'momo' ? "border-primary bg-primary/5" : "hover:border-primary/50 hover:bg-primary/5"
              )} 
              onClick={() => handlePayment('momo')}
            >
              <MomoLogo />
              <div className="ml-4">
                <span className="text-base font-semibold text-foreground">Thanh toán qua Ví Momo</span>
                <p className="text-sm font-normal text-muted-foreground">Sử dụng ứng dụng Momo để quét mã QR.</p>
              </div>
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <DialogFooter className="p-6 bg-muted/30 border-t">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Hủy bỏ
          </Button>
        </DialogFooter>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Cập nhật DialogContent: rộng hơn, không padding, ẩn nút X khi đang xử lý */}
      <DialogContent 
        className="sm:max-w-lg p-0 overflow-hidden" 
        showCloseButton={status === 'pending'}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}