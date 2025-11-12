import { BookOpen, Users, Trophy, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
const StatsSection = () => {
    return (
        <section className="py-20 px-4 ">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="text-center border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/90 backdrop-blur-sm hover:border-primary/20 group">
                        <CardContent className="pt-8 pb-6">
                            <div className="text-4xl font-bold text-primary mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <BookOpen className="w-8 h-8 mr-2 text-secondary" />
                                500+
                            </div>
                            <div className="text-muted-foreground font-medium">Đề thi</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/90 backdrop-blur-sm hover:border-primary/20 group">
                        <CardContent className="pt-8 pb-6">
                            <div className="text-4xl font-bold text-primary mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Users className="w-8 h-8 mr-2 text-secondary" />
                                50K+
                            </div>
                            <div className="text-muted-foreground font-medium">Học sinh</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/90 backdrop-blur-sm hover:border-primary/20 group">
                        <CardContent className="pt-8 pb-6">
                            <div className="text-4xl font-bold text-primary mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Trophy className="w-8 h-8 mr-2 text-accent" />
                                95%
                            </div>
                            <div className="text-muted-foreground font-medium">Tỷ lệ đỗ</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300 bg-background/90 backdrop-blur-sm hover:border-primary/20 group">
                        <CardContent className="pt-8 pb-6">
                            <div className="text-4xl font-bold text-primary mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Star className="w-8 h-8 mr-2 text-accent" />
                                4.9/5
                            </div>
                            <div className="text-muted-foreground font-medium">Đánh giá</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default StatsSection;
