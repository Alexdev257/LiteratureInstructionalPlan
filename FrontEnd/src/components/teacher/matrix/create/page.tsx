

import { BaseHeader } from "@/components/layout/base/header";
import { CreateMatrixForm } from "./_components/createMatrixForm";


export default function CreateMatrixPage() {
  return (
    <div className="space-y-6 p-3">
      <BaseHeader
        title="Tạo Ma Trận Đề Thi Mới"
        description="Tạo ma trận đề thi với thông tin chi tiết về câu hỏi và điểm số"
      />

      <CreateMatrixForm />
    </div>
  );
}