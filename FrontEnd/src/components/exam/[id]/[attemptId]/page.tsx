import { useParams } from "@tanstack/react-router";

import { useExam } from "@/hooks/useExam";
import { ExamTaking } from "./_components/ExamTaking";

export const TakeExamPage = () => {
  const { examId, attemptId } = useParams({ from: "/exam/$examId/$attemptId" });
  const { useGetExamIdByStudent } = useExam();

  const {data: examResponse,isLoading,isError} = useGetExamIdByStudent(Number(examId),Number(attemptId));
  const exam = examResponse?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !exam) {
    return <div>Error loading exam.</div>;
  }

  return <ExamTaking exam={exam} attemptId={Number(attemptId)}  />;
};