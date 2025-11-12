import { useParams, Outlet, useLocation} from "@tanstack/react-router";
import { ExamDetail } from "./ExamDetail";



const DetailExamPage = () => {
    const { examId } = useParams({ from: "/exam/$examId" });
    const { pathname } = useLocation();

    return pathname.split('/')[3] ? <Outlet /> :<div className="mt-20"> <ExamDetail examId={examId} /></div>;
};

export default DetailExamPage;
