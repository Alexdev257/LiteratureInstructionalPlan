"use client";
import { ArrowRight,  Star, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { LeaderboardEntry } from "@/utils/type";

type TopPerformProps = {
  topPerformers: LeaderboardEntry[];
}
const TopPerformersSection = ({ topPerformers }: TopPerformProps) => {
    return (
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
    );
}

export default TopPerformersSection;
