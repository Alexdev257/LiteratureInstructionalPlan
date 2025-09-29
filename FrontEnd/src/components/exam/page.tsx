
"use client";
import HeroSection from "./HeroSection";
import FilterSection from "./FilterSection";
import { mockeBookSeries, mockExamData, mockExamTypes, mockGradeLevels } from "@/utils/mockAPi";

const ExamPage = () => {
    const fetchExamData = mockExamData;
    const fetchGradeLevels = mockGradeLevels;
    const fetchExamTypes = mockExamTypes;
    const fetcheBookSeries = mockeBookSeries;
    return (

        <>
            {/* Header Section */}
            <HeroSection />


            {/* Filters Section */}
            <FilterSection
                examData={fetchExamData}
                mockExamTypes={fetchExamTypes}
                mockGradeLevels={fetchGradeLevels}
                mockeBookSeries={fetcheBookSeries}
            />

        </>
    );
};

export default ExamPage;
