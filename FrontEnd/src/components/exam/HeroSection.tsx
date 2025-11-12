
import { Badge } from "../ui/badge";
const HeroSection = () => {
    return (
        <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10">
            {/* background grid pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

            <div className="container relative mx-auto text-center max-w-5xl">
                {/* Badge */}
                  <Badge variant="secondary" className="mb-8 text-sm font-medium px-4 py-2 bg-secondary/10 text-secondary border-secondary/20">
                    📚 Ngân hàng đề thi
                </Badge>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-[1.1]">
                    Kho đề thi
                    <span className="text-primary block mt-2 drop-shadow-sm">
                        Văn học Việt Nam
                    </span>
                </h1>

                {/* Paragraph */}
                <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-12 max-w-3xl mx-auto leading-relaxed">
                    Hơn 10000 đề thi được phân loại theo lớp, độ khó và chủ đề.
                    Luyện tập hiệu quả để đạt kết quả cao nhất.
                </p>
            </div>
        </section>
    );
}

export default HeroSection;
