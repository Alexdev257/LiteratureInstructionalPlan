import { PUBLIC_ENDPOINT } from "@/lib/api/endpoint";
import { mockExamData, mockGradeLevels,  mockExamTypes } from "./mockAPi";
import type { ExamData, ExamFilters } from "./type";

export function isPublicEndpoint(endpoint: string): boolean {
  return Object.values(PUBLIC_ENDPOINT).some(v => endpoint.includes(v));
}


// Helper function to get full exam data with relationships
export const getExamWithDetails = (examId: number): ExamData | undefined => {
  const exam = mockExamData.find(e => e.examId === examId);
  if (!exam) return undefined;

  return {
    ...exam,
    examType: mockExamTypes.find(t => t.examTypeId === exam.examType.examTypeId)!,
    matrix: {
      ...exam.matrix,
      grade: mockGradeLevels.find(g => g.gradeLevelId === exam.matrix.grade.gradeLevelId)!
    }
  };
};


// Helper function to filter exams
export const filterExams = (filters: ExamFilters): ExamData[] => {
  return mockExamData.filter(exam => {
    if (filters.gradeLevel && exam.matrix.grade.gradeLevelId !== filters.gradeLevel) return false;
    if (filters.difficulty && exam.matrix.difficulty !== filters.difficulty) return false;
    if (filters.examType && exam.examType.examTypeId !== filters.examType) return false;
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return exam.title.toLowerCase().includes(searchTerm) || 
             exam.description.toLowerCase().includes(searchTerm);
    }
    return true;
  });
};