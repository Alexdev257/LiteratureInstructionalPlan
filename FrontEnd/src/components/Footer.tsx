import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 px-4 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Văn Học Việt Nam</span>
            </div>
            <p className="text-muted-foreground text-sm">Nền tảng văn học hàng đầu Việt Nam</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="*" className="hover:text-foreground transition-colors">
                  Đề thi
                </Link>
              </li>
              <li>
                <Link to="*" className="hover:text-foreground transition-colors">
                  Luyện tập
                </Link>
              </li>
              <li>
                <Link to="*" className="hover:text-foreground transition-colors">
                  Kết quả
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/help" className="hover:text-foreground transition-colors">
                  Trợ giúp
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Công ty</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Chính sách
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Điều khoản
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 Văn Học Việt Nam. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  )
}
