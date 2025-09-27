
import type { Features } from "@/utils/type";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

type FeaturesSectionProps = {
    features: Features[];
};

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
    return (
        <section className="py-24 px-4 ">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-secondary/30 text-secondary">
                        ✨ Tại sao chọn chúng tôi?
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                        Nền tảng học tập
                        <span className="text-primary block drop-shadow-sm">hiện đại nhất</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Chúng tôi cung cấp môi trường luyện thi trực tuyến hiện đại và hiệu quả nhất
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-secondary/30 bg-gradient-to-br from-background to-primary/5">
                                <CardContent className="pt-8 pb-6">
                                    <div className="bg-secondary/10 p-4 rounded-2xl inline-flex mb-6 group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                                        <Icon className="h-8 w-8 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
