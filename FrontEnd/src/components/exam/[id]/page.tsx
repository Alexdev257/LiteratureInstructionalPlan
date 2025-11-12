import { useParams} from "@tanstack/react-router";
import { ExamDetail } from "./ExamDetail";
import { useExam } from "@/hooks/useExam";



const DetailExamPage = () => {
    const { examId } = useParams({ from: "/exam/$examId" })
    const {useGetExamIdByStudent} = useExam();
    const {data,isLoading,isError} = useGetExamIdByStudent(Number(examId));
    const examData = data?.data;
    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError || !examData){
        return <div>Error loading exam data.</div>
    }
    return(
        <div className="mt-20">
            <ExamDetail exam={examData} />
        </div>
    )
};

export default DetailExamPage;
