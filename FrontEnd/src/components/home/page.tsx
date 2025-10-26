import {  mockExamData, mockfeatures, mockLeaderboard } from "@/utils/mockAPi";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import FeatureExamsSection from "./FeatureExamsSection";
import TopPerformersSection from "./TopPerformersSection";



const HomePage = () => {
    const featuredExams = mockExamData.slice(0, 3);
    const topPerformers = mockLeaderboard.slice(0, 5);
    const features = mockfeatures
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Stats Section */}
            <StatsSection />

            {/* Features Section */}
            <FeaturesSection features={features} />

            {/* Featured Exams Section */}
            <FeatureExamsSection featuredExams={featuredExams} />

            {/* Top Performers Section */}
            <TopPerformersSection topPerformers={topPerformers} />

        </>
    );
}

export default HomePage;
