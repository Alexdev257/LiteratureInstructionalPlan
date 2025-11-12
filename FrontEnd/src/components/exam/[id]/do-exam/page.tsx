import { useParams } from "@tanstack/react-router";

import { useExam } from "@/hooks/useExam";
import { ExamTaking } from "./_components/ExamTaking";

export const TakeExamPage = () => {
  const { examId } = useParams({ from: "/exam/$examId" });
 const {useGetExamById} = useExam()
 const {data,isLoading,isError} = useGetExamById(Number(examId))
  const exam= data?.data
 if(isLoading){
    return <div>Loading...</div>;
 }
 if(isError || !exam){
    return <div>Error loading exam.</div>;
 }

 return <ExamTaking exam={exam} />;
   


  
};