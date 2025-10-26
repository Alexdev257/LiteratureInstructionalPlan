import { Badge } from "../ui/badge";
import {  FileText } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto text-center max-w-5xl">
        {/* Badge */}
        <Badge variant="secondary" className="mb-8 text-sm font-medium px-4 py-2 bg-secondary/10 text-secondary border-secondary/20">
          <FileText className="w-4 h-4 mr-2 inline-block" />
          Thư viện Giáo án Ngữ văn
        </Badge>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-[1.1]">
          Kho tài liệu
          <span className="text-primary block mt-2 drop-shadow-sm">
            Giảng dạy Ngữ văn
          </span>
        </h1>

        {/* Paragraph */}
        <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-12 max-w-3xl mx-auto leading-relaxed">
          Khám phá hàng trăm mẫu giáo án, bài giảng được biên soạn bởi các giáo viên giàu kinh nghiệm.
          Tiết kiệm thời gian và nâng cao chất lượng giảng dạy.
        </p>

        {/* Stats */}
      
      </div>
    </section>
  );
};

export default HeroSection;