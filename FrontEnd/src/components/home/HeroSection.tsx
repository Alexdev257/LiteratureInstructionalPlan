import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";




const HeroSection = () => {
    return (
        <section className="relative py-28 px-4 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 ">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
            <div className="container relative mx-auto text-center max-w-5xl">
                <Badge variant="secondary" className="mb-8 text-sm font-medium px-4 py-2 bg-secondary/10 text-secondary border-secondary/20">
                    🎓 Nền tảng luyện thi hàng đầu Việt Nam
                </Badge>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-8 leading-[1.1]">
                    Chinh phục kỳ thi
                    <span className="text-primary block mt-2 drop-shadow-sm">Văn học Việt Nam</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-12 max-w-3xl mx-auto leading-relaxed">
                    Hệ thống đề thi đa dạng, giải thích chi tiết và lộ trình học tập cá nhân hóa giúp bạn đạt điểm cao trong kỳ
                    thi đại học.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="text-base px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90">
                        Bắt đầu luyện thi
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" className="text-base px-8 py-4 h-auto border-2 border-primary/20 hover:bg-primary/5 hover:border-primary/30">
                        Xem đề thi mẫu
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
