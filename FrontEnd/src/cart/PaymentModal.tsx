import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSessionStore } from '@/stores/sessionStore'; // Import hook để lấy thông tin user

// Định nghĩa các trạng thái của modal
type PaymentStatus = 'pending' | 'processing' | 'display_qr' | 'success' | 'failed';

interface CartItem {
  id: string;
  title: string;
  price: number;
}

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: CartItem | null;
  onPaymentSuccess: () => void;
}

// SVG Logo Momo (giữ nguyên)
const MomoLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#D82D8B"/>
    <path d="M20.0003 14.283C19.508 13.149 18.441 12.015 16.8003 12.015C14.767 12.015 13.1256 13.535 13.1256 15.655C13.1256 17.775 14.767 19.296 16.8003 19.296C18.441 19.296 19.508 18.162 20.0003 17.028H24.3636C24.1673 19.061 23.033 21.094 21.223 22.384C19.9876 23.287 18.4663 23.738 16.8003 23.738C12.4363 23.738 8.99164 20.18 8.99164 15.655C8.99164 11.13 12.4363 7.573 16.8003 7.573C18.4663 7.573 19.9876 8.024 21.223 8.927C23.033 10.217 24.1673 12.25 24.3636 14.283H20.0003Z" fill="white"/>
    <path d="M26.8744 19.296C28.9077 19.296 30.5491 17.775 30.5491 15.655C30.5491 13.535 28.9077 12.015 26.8744 12.015C25.2337 12.015 24.1673 13.149 23.675 14.283H19.3113C19.5077 12.25 20.642 10.217 22.452 8.927C23.6873 8.024 25.2087 7.573 26.8744 7.573C31.2384 7.573 34.683 11.13 34.683 15.655C34.683 20.18 31.2384 23.738 26.8744 23.738C25.2087 23.738 23.6873 23.287 22.452 22.384C20.642 21.094 19.5077 19.061 19.3113 17.028H23.675C24.1673 18.162 25.2337 19.296 26.8744 19.296Z" fill="white"/>
  </svg>
);

export function PaymentModal({ isOpen, setIsOpen, item, onPaymentSuccess }: PaymentModalProps) {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<number | null>(null); // Lưu PaymentId từ backend

  // Lấy userId từ sessionStore
  const { user } = useSessionStore();
  const userId = user?.UserId ? Number(user.UserId) : null;

  // Reset trạng thái về 'pending' mỗi khi modal được mở
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setStatus('pending');
        setQrContent(null);
        setPaymentId(null); // Reset paymentId
      }, 100); 
    }
  }, [isOpen]);

  // Polling: Kiểm tra trạng thái thanh toán
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    // Hàm gọi API kiểm tra trạng thái
    const checkPaymentStatus = async (id: number) => {
      try {
        // Đây là endpoint GET /api/Payment/{paymentId} đã có ở backend
        const response = await fetch(`/api/Payment/${id}`); 
        if (!response.ok) {
          console.error("Polling failed, retrying...");
          return; 
        }
        
        const result = await response.json();
        
        // Backend trả về CommonResponse<PaymentGetResponseDTO>
        // Trạng thái thành công là "Success" (từ PaymentEnum)
        if (result.isSuccess && (result.data.status === "Success" || result.data.status === 1)) { 
          if (intervalId) clearInterval(intervalId); // Dừng polling
          onPaymentSuccess(); // Gọi callback (removeFromCart)
          setStatus('success'); // Chuyển sang màn hình success
        }
        // Nếu status là "Pending" hoặc "Failed", không làm gì, polling sẽ tiếp tục
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    // Chỉ chạy polling khi đang ở trạng thái hiển thị QR và có paymentId
    if (status === 'display_qr' && paymentId && isOpen) {
      // Bắt đầu polling ngay lập tức, sau đó lặp lại
      checkPaymentStatus(paymentId);
      intervalId = setInterval(() => {
        if (isOpen) { // Chỉ poll khi modal còn mở
          checkPaymentStatus(paymentId);
        } else if (intervalId) {
          clearInterval(intervalId); // Dừng nếu modal đã đóng
        }
      }, 3000); // Poll mỗi 3 giây
    }

    // Hàm dọn dẹp: dừng polling khi component unmount hoặc status thay đổi
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status, paymentId, isOpen, onPaymentSuccess]); // Thêm dependencies

  // Hàm xử lý gọi API tạo thanh toán
  const handlePayment = async () => {
    if (!item || !userId) {
      setStatus('failed');
      return;
    }
    
    setStatus('processing');
    setQrContent(null);
    setPaymentId(null);

    try {
      // --- API CALL THẬT (sẽ dùng khi chạy thực tế) ---
      // const response = await fetch('/api/Payment/payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     userId: userId, 
      //     templateId: parseInt(item.id)
      //   })
      // });
      // const result = await response.json();
      
      // --- GIẢ LẬP API CALL (cho mục đích demo) ---
      console.log(`Đang gọi API: /api/Payment/payment với UserId=${userId}, TemplateId=${item.id}`);
      await new Promise(resolve => setTimeout(resolve, 30));
      
      // Giả lập backend trả về PaymentCreateResponseDTO
      const mockResult = {
        isSuccess: true,
        data: {
          // Backend trả về `checkoutUrl`
          checkoutUrl: `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=MOCK_PAYMENT_FOR_ITEM_${item.id}_PRICE_${item.price}`,
          // Backend trả về `paymentId` để frontend polling
          paymentId: Date.now() // Dùng timestamp làm mock paymentId
        }
      };
      // --- KẾT THÚC GIẢ LẬP ---

      // Dùng `result` (thật) hoặc `mockResult` (giả lập)
      if (mockResult.isSuccess && mockResult.data.checkoutUrl) {
        setQrContent(mockResult.data.checkoutUrl); // Đây là URL ảnh QR
        setPaymentId(mockResult.data.paymentId);   // Lưu paymentId để polling
        setStatus('display_qr');
      } else {
        // throw new Error(result.message || 'Lỗi khi tạo thanh toán');
        setStatus('failed'); // Chuyển sang thất bại nếu API lỗi
      }
    } catch (error) {
      console.error("Payment failed", error);
      setStatus('failed');
    }
  };

  // HÀM NÀY KHÔNG CÒN ĐƯỢC SỬ DỤNG
  // const handleUserConfirmPayment = () => {
  //   onPaymentSuccess(); // Gọi callback (removeFromCart)
  //   setStatus('success'); // Chuyển sang màn hình success
  // };

  const renderContent = () => {
    // === TRẠNG THÁI: ĐANG XỬ LÝ (Đang gọi API) ===
    if (status === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center p-12 min-h-[400px] text-center">
          <MomoLogo />
          <Loader2 className="w-12 h-12 text-primary animate-spin my-6" />
          <h3 className="text-xl font-semibold text-foreground">Đang tạo mã thanh toán Momo...</h3>
          <p className="text-muted-foreground mt-2">Vui lòng không tắt cửa sổ này.</p>
        </div>
      );
    }

    // === TRẠNG THÁI: HIỂN THỊ QR CODE ===
    if (status === 'display_qr') {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <MomoLogo />
          <h3 className="text-2xl font-semibold text-foreground my-4">Quét mã QR bằng Ví Momo</h3>
          <p className="text-muted-foreground mb-4">
            Thanh toán cho giáo án: <br />
            <span className="font-bold text-foreground" title={item?.title}>{item?.title}</span>
          </p>
          
          {qrContent ? (
            <img src={qrContent} alt="Momo QR Code" width={250} height={250} className="border-4 border-primary rounded-lg p-2 bg-white" />
          ) : (
            <div className="w-[250px] h-[250px] flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          )}
          
          <p className="text-2xl font-bold text-primary mt-4">
              {item?.price.toLocaleString('vi-VN')} ₫
          </p>

          {/* Thay thế nút "Tôi đã thanh toán" bằng chỉ báo polling */}
          <p className="text-sm text-muted-foreground mt-4">
            Vui lòng quét mã để thanh toán.
            <br />
            Hệ thống sẽ tự động xác nhận sau khi thanh toán thành công.
          </p>
          <div className="flex items-center justify-center text-sm text-muted-foreground mt-6">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Đang chờ thanh toán...
          </div>
        </div>
      );
    }
    
    // === TRẠNG THÁI: THÀNH CÔNG (Sau khi polling thành công) ===
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
              {item?.price.toLocaleString('vi-VN')} ₫
            </span>.
          </p>
          <p className="text-muted-foreground mb-8">Giáo án đã được thêm vào tài khoản của bạn.</p>
          <Button onClick={() => setIsOpen(false)} className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
            Tuyệt vời!
          </Button>
        </div>
      );
    }

    // === TRẠNG THÁI: THẤT BẠI (API tạo thanh toán bị lỗi) ===
    if (status === 'failed') {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Thanh toán thất bại</h3>
          <p className="text-muted-foreground mb-8">
            Không thể tạo mã thanh toán.
            <br />
            Vui lòng kiểm tra lại hoặc thử lại sau.
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
        <DialogHeader className="p-6 bg-muted/30 border-b text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Thanh toán giáo án</DialogTitle>
          <DialogDescription className="text-lg px-6">
            <span className="font-medium text-foreground truncate block" title={item?.title}>
              {item?.title}
            </span>
            <span className="font-bold text-3xl text-primary ml-2">
              {item?.price.toLocaleString('vi-VN')} ₫
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <h4 className="font-semibold mb-4 text-muted-foreground">Chọn phương thức thanh toán:</h4>
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className={cn(
                "w-full justify-start h-20 text-left p-4 transition-all duration-200 border-2",
                "hover:border-primary/50 hover:bg-primary/5"
              )} 
              onClick={handlePayment}
            >
              <MomoLogo />
              <div className="ml-4">
                <span className="text-base font-semibold text-foreground">Thanh toán qua Ví Momo</span>
                <p className="text-sm font-normal text-muted-foreground">Sử dụng ứng dụng Momo để quét mã QR.</p>
              </div>
            </Button>
          </div>
        </div>
        
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
      <DialogContent 
        className="sm:max-w-lg p-0 overflow-hidden" 
        // Ẩn nút X khi đang xử lý hoặc hiển thị QR
        showCloseButton={status === 'pending' || status === 'failed' || status === 'success'}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}