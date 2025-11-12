import { BaseHeader } from "@/components/layout/base/header";
import CreateQuestionForm from "./_components/createQuestionForm";




export default function CreateQuestionPage() {
    return (
        <div className="space-y-6 p-6 ">
            <BaseHeader
                title="Tạo Câu Hỏi Mới"
                description="Tạo câu hỏi với thông tin chi tiết và các lựa chọn"
            />

            <CreateQuestionForm />
        </div>
    )
}
