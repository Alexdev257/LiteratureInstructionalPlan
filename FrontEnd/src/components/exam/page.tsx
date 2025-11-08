
"use client";
import HeroSection from "./HeroSection";
import FilterSection from "./FilterSection";
import { mockExamData, 
    // mockExamTypes, mockGradeLevels 
} from "@/utils/mockAPi";
import { useGradeLevel } from "@/hooks/useGradeLevel";
import { useExamType } from "@/hooks/useExamType";


const ExamPage = () => {
    const fetchExamData = mockExamData;
    // const fetchGradeLevels = mockGradeLevels;
    // const fetchExamTypes = mockExamTypes;

    const { useGetExamTypes } = useExamType();
    const { useGetGradeLevels } = useGradeLevel();
    const { data: examTypeData } = useGetExamTypes({PageNumber:1, PageSize:10});
    const { data: gradeLevelData } = useGetGradeLevels({PageNumber:1, PageSize:10});
    
    return (

        <>
            {/* Header Section */}
            <HeroSection />


            {/* Filters Section */}
            <FilterSection
                examData={fetchExamData}
                examType={examTypeData?.data.items || []}
                gradeLevel={gradeLevelData?.data.items || []}
            />

        </>
    );
};

export default ExamPage;
