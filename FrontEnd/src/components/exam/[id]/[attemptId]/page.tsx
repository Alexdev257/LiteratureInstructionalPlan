import { useParams } from "@tanstack/react-router";

import { useExam } from "@/hooks/useExam";
import { ExamTaking } from "./_components/ExamTaking";

export const TakeExamPage = () => {
  const { examId, attemptId } = useParams({ from: "/exam/$examId/$attemptId" });
  const { useGetExamIdByStudent, useGetExamAttemptById } = useExam();

  const {data: examResponse,isLoading,isError} = useGetExamIdByStudent(Number(examId),Number(attemptId));

  const {
    data: attemptResponse,
    isLoading: isAttemptLoading,
    isError: isAttemptError,
  } = useGetExamAttemptById(Number(attemptId));

  const exam = examResponse?.data;
  const attempt = attemptResponse?.data;

  if (isLoading || isAttemptLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isAttemptError || !exam || !attempt) {
    return <div>Error loading exam.</div>;
  }

  return <ExamTaking exam={exam} attemptId={Number(attemptId)} attempt={attempt} />;
};