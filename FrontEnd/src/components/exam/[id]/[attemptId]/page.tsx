import { useParams } from "@tanstack/react-router";
import { MultipleChoiceExam } from "./MultipleChoiceExam";
import { EssayExam } from "./EssayExam";
import { MixedExam } from "./Mixed";
import { mockExamData } from "@/utils/mockAPi";

export const TakeExamPage = () => {
  const { examId } = useParams({ from: "/exam/$examId" });
  const { attemptId } = useParams({ from: "/exam/$examId/$attemptId" });

  const exam = mockExamData.find(e => e.examId === Number(examId));

  if (!exam) {
    return <div>Không tìm thấy đề thi</div>;
  }

  // Kiểm tra loại đề thi dựa vào questionType trong ma trận
  if (exam.matrix.questionType === "multiple-choice") {
    return <MultipleChoiceExam exam={exam} attemptId={attemptId} />;
  } else if (exam.matrix.questionType === "essay") {
    return <EssayExam exam={exam} attemptId={attemptId} />;
  } else {
    // Đề thi hỗn hợp (mixed)
    return <MixedExam exam={exam} attemptId={attemptId} />;
  }
};