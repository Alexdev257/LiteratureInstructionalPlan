
import { BookOpen, Users, Trophy, ArrowRight, Star, Clock} from 'lucide-react';
import { features, mockExams, mockLeaderboard } from '@/utils/mockAPi';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';





export const HomePage = () => {
  const featuredExams = mockExams.slice(0, 3);
  const topPerformers = mockLeaderboard.slice(0, 5);

  

  // Helper function


  return (
    <>
      {/* Hero Section */}
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

      {/* Stats Section */}
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

      {/* Features Section */}
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

      {/* Featured Exams Section */}
      <section className="py-24 px-4 ">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-accent/30 text-accent bg-accent/5">
              🔥 Đề thi hot
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Đề thi nổi bật
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Những đề thi được lựa chọn và làm nhiều nhất
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredExams.map((exam) => (
              <Card key={exam.id} className="group hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-secondary/30 overflow-hidden bg-gradient-to-br from-background to-secondary/5">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20">
                      Lớp {exam.grade}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                      <Users className="h-4 w-4 mr-1" />
                      {exam.attempts}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {exam.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-1">
                    {exam.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">{exam.duration} phút</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-500 fill-current" />
                      <span className="font-medium">{exam.averageScore}/10</span>
                    </div>
                  </div>
                  <Button className="w-full group-hover:shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90">
                    Làm bài thi
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto text-base border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
              Xem tất cả đề thi
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Top Performers Card Section */}
      <section className="py-20 px-4 ">
        <div className="container mx-auto max-w-7xl ">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-accent/30 text-accent bg-accent/10">
              🏆 Top Performers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Học sinh xuất sắc
              <span className="text-primary block drop-shadow-sm">nhất tháng</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Những học sinh có thành tích cao nhất được vinh danh
            </p>
          </div>

          {/* Top performers grid */}
          <div className="flex justify-center items-end gap-8 flex-wrap max-w-6xl mx-auto mb-12">
            {topPerformers.map((performer, index) => {
              const isFirst = index === 0;
              const isSecond = index === 1;
              const isThird = index === 2;
              const isForth = index === 3;
              const isFith = index === 4;

              let rankStyle = "";
              let badgeStyle = "";
              let cardStyle =
                "border hover:border-primary/30 transition-all duration-500 group relative overflow-hidden hover:-translate-y-2 hover:scale-105";

              // Height + màu sắc theo rank - width tăng lên cho phù hợp
              if (isFirst) {
                rankStyle =
                  "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900";
                badgeStyle = "bg-yellow-100 text-yellow-800 border-yellow-300";
                cardStyle +=
                  " w-56 h-80 border-2 border-yellow-200 shadow-xl shadow-yellow-100/50 bg-gradient-to-br from-yellow-50/50 to-background";
              } else if (isSecond) {
                rankStyle =
                  "bg-gradient-to-br from-gray-400 to-gray-600 text-gray-900";
                badgeStyle = "bg-gray-100 text-gray-800 border-gray-300";
                cardStyle +=
                  " w-52 h-[19rem] border-2 border-gray-200 shadow-lg shadow-gray-100/50 bg-gradient-to-br from-gray-50/30 to-background";
              } else if (isThird) {
                rankStyle =
                  "bg-gradient-to-br from-amber-400 to-amber-600 text-amber-900";
                badgeStyle = "bg-amber-100 text-amber-800 border-amber-300";
                cardStyle +=
                  " w-48 h-[18rem] border-2 border-amber-200 shadow-lg shadow-amber-100/50 bg-gradient-to-br from-amber-50/30 to-background";
              } else if (isForth) {
                rankStyle =
                  "bg-gradient-to-br from-green-400 to-green-600 text-green-900";
                badgeStyle = "bg-green-100 text-green-800 border-green-300";
                cardStyle +=
                  " w-44 h-[17rem] border-2 border-green-200 shadow-lg shadow-green-100/50 bg-gradient-to-br from-green-50/30 to-background";
              } else if (isFith) {
                rankStyle =
                  "bg-gradient-to-br from-blue-400 to-blue-600 text-blue-900";
                badgeStyle = "bg-blue-100 text-blue-800 border-blue-300";
                cardStyle +=
                  " w-44 h-[16rem] border-2 border-blue-200 shadow-lg shadow-blue-100/50 bg-gradient-to-br from-blue-50/30 to-background";
              }


              return (
                <Card
                  key={performer.userId}
                  className={cardStyle}
                >
                  {/* Rank Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${rankStyle}`}
                    >
                      #{performer.rank}
                    </div>
                  </div>

                  {/* Decorative gradient */}
                  <div
                    className={`absolute inset-0 opacity-5 ${isFirst
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                      : isSecond
                        ? "bg-gradient-to-br from-gray-400 to-gray-600"
                        : "bg-gradient-to-br from-amber-400 to-amber-600"
                      }`}
                  />

                  {/* Card content */}
                  <CardContent className="relative h-full flex flex-col justify-between p-4 text-center">
                    {/* Avatar */}
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        <Avatar
                          className={`${isFirst
                            ? "w-20 h-20"
                            : isSecond
                              ? "w-18 h-18"
                              : isThird
                                ? "w-16 h-16"
                                : "w-14 h-14"
                            } shadow-xl border-2 ${isFirst
                              ? "border-yellow-300"
                              : isSecond
                                ? "border-gray-300"
                                : isThird
                                  ? "border-amber-300"
                                  : isForth
                                    ? "border-green-300"
                                    : "border-blue-300"
                            } group-hover:scale-110 transition-transform duration-300`}
                        >
                          <AvatarFallback
                            className={`${isFirst
                              ? "text-lg"
                              : isSecond
                                ? "text-base"
                                : isThird
                                  ? "text-sm"
                                  : "text-xs"
                              } font-bold ${isFirst
                                ? "bg-yellow-50 text-yellow-700"
                                : isSecond
                                  ? "bg-gray-50 text-gray-700"
                                  : isThird
                                    ? "bg-amber-50 text-amber-700"
                                    : isForth
                                      ? "bg-green-50 text-green-700"
                                      : "bg-blue-50 text-blue-700"
                              }`}
                          >
                            {performer.userName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Trophy icon for first place */}
                        {isFirst && (
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <Trophy className="w-4 h-4 text-yellow-900" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <h3
                      className={`${isFirst
                        ? "text-lg"
                        : isSecond
                          ? "text-base"
                          : isThird
                            ? "text-sm"
                            : "text-xs"
                        } font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight truncate px-2`}
                      title={performer.userName}
                    >
                      {performer.userName}
                    </h3>

                    {/* Score */}
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border ${badgeStyle} mb-3`}
                    >
                      <Star
                        className={`${isFirst
                          ? "w-4 h-4"
                          : isSecond
                            ? "w-3 h-3"
                            : "w-2 h-2"
                          }`}
                      />
                      <span
                        className={`${isFirst
                          ? "text-base"
                          : isSecond
                            ? "text-sm"
                            : "text-xs"
                          } font-bold`}
                      >
                        {performer.averageScore.toFixed(1)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-center p-2 bg-muted/30 rounded-lg">
                        <div
                          className={`${isFirst
                            ? "text-base"
                            : isSecond
                              ? "text-sm"
                              : "text-xs"
                            } font-bold text-foreground`}
                        >
                          {performer.totalExams}
                        </div>
                        <div className={`${isFirst || isSecond ? "text-xs" : "text-xs"} text-muted-foreground`}>
                          bài thi
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to action */}
          <div className="text-center">
            <Button size="lg" variant="outline" className="px-8 py-4 h-auto text-base border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
              Xem tất cả học sinh xuất sắc
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};