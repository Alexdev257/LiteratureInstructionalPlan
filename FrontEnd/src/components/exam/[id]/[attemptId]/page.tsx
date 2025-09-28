import { useParams } from "@tanstack/react-router";
import { MultipleChoiceExam } from "./MultipleChoiceExam";
import { EssayExam } from "./EssayExam";
import { mockExamData } from "@/utils/mockAPi";

export const TakeExamPage = () => {
  const { examId } = useParams({ from: "/exam/$examId" });
  const { attemptId } = useParams({ from: "/exam/$examId/$attemptId" });

  // Vì examId từ params là string → cần ép sang number
  const exam = mockExamData.find(e => e.examId === Number(examId));


  if (!exam) {
    return <div>Không tìm thấy đề thi</div>;
  }

  // Render component theo examTypeId
    if(exam.examTypeId === 1) {
        return <MultipleChoiceExam examId={exam.examId.toString()} attemptId={attemptId} />;
    } else {
      return <EssayExam examId={exam.examId.toString()} attemptId={attemptId} />;
    }
};