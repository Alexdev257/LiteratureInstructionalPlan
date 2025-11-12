import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CreateExamData {
  title: string;
  description: string;
  durationMinutes: number;
  examTypeId: number;
  createdByUserId: number;
  matrixId: number | null;
  questionIds: number[];
}

interface ExamStore {
  // Data
  examData: CreateExamData;
  
  // Step tracking
  currentStep: number;
  
  // Actions
  setMatrixId: (matrixId: number) => void;
  setQuestionIds: (questionIds: number[]) => void;
  addQuestionId: (questionId: number) => void;
  removeQuestionId: (questionId: number) => void;
  setExamDetails: (data: Partial<CreateExamData>) => void;
  setCurrentStep: (step: number) => void;
  resetExam: () => void;
  
  // Getters
  getExamData: () => CreateExamData;
  isStepCompleted: (step: number) => boolean;
}

const initialExamData: CreateExamData = {
  title: "",
  description: "",
  durationMinutes: 0,
  examTypeId: 0,
  createdByUserId: 0,
  matrixId: null,
  questionIds: [],
};

export const useExamStore = create<ExamStore>()(
  persist(
    (set, get) => ({
      // Initial state
      examData: initialExamData,
      currentStep: 1,

      // Set matrix ID (Step 1)
      setMatrixId: (matrixId) =>
        set((state) => ({
          examData: { ...state.examData, matrixId },
        })),

      // Set question IDs (Step 2)
      setQuestionIds: (questionIds) =>
        set((state) => ({
          examData: { ...state.examData, questionIds },
        })),

      // Add single question ID
      addQuestionId: (questionId) =>
        set((state) => {
          const currentIds = state.examData.questionIds;
          if (currentIds.includes(questionId)) {
            return state;
          }
          return {
            examData: {
              ...state.examData,
              questionIds: [...currentIds, questionId],
            },
          };
        }),

      // Remove single question ID
      removeQuestionId: (questionId) =>
        set((state) => ({
          examData: {
            ...state.examData,
            questionIds: state.examData.questionIds.filter((id) => id !== questionId),
          },
        })),

      // Set exam details (Step 3)
      setExamDetails: (data) =>
        set((state) => ({
          examData: { ...state.examData, ...data },
        })),

      // Set current step
      setCurrentStep: (step) => set({ currentStep: step }),

      // Reset exam data
      resetExam: () =>
        set({
          examData: initialExamData,
          currentStep: 1,
        }),

      // Get exam data
      getExamData: () => get().examData,

      // Check if step is completed
      isStepCompleted: (step) => {
        const { examData } = get();
        switch (step) {
          case 1:
            return examData.matrixId !== null;
          case 2:
            return examData.questionIds.length > 0;
          case 3:
            return (
              examData.title.trim() !== "" &&
              examData.durationMinutes > 0 &&
              examData.examTypeId > 0
            );
          default:
            return false;
        }
      },
    }),
    {
      name: "exam-storage",
      partialize: (state) => ({ 
        examData: state.examData,
        currentStep: state.currentStep 
      }),
    }
  )
);