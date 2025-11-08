import { BaseHeader } from "@/components/layout/base/header";
import { StatsSection } from "./_components/StatsSection";
import { TemplateListSection } from "./_components/TemplateListSection";



interface Template {
  id: number;
  stt: number;
  title: string;
  price: number;
  gradeLevel: string;
  created_at: string;
  luongMua: number;
  status: 'active' | 'draft' | 'archived';
}


const mockTemplates: Template[] = [
  {
    id: 1,
    stt: 1,
    title: 'Giáo án - Văn học hiện đại',
    price: 50000,
    gradeLevel: 'Lớp 10',
    created_at: '2025-01-15',
    luongMua: 145,
    status: 'active' as const,
  },
  {
    id: 2,
    stt: 2,
    title: 'Giáo án - Văn học cổ điển',
    price: 75000,
    gradeLevel: 'Lớp 11',
    created_at: '2025-02-20',
    luongMua: 289,
    status: 'active' as const,
  },
  {
    id: 3,
    stt: 3,
    title: 'Giáo án - Thơ ca đương đại',
    price: 30000,
    gradeLevel: 'Lớp 12',
    created_at: '2025-03-10',
    luongMua: 78,
    status: 'draft' as const,
  },
];

export default function TemplateManagementPage() {

  const templates = mockTemplates;

  const totalPurchases = templates.reduce((sum, t) => sum + t.luongMua, 0);
  const activeTemplates = templates.filter(t => t.status === 'active').length;

  return (
    <div className="space-y-6 p-3">
      <BaseHeader
        title="Quản lý Mẫu đề"
        description="Quản lý và tạo mẫu đề thi cho học sinh"
      />

      <StatsSection
        totalTemplates={templates.length}
        totalPurchases={totalPurchases}
        activeTemplates={activeTemplates}
      />

      <TemplateListSection templates={templates} />
    </div>
  );
}
