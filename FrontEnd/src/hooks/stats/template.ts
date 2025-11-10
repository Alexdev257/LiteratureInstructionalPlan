import { useMemo } from "react"
import { useTemplate } from "../useTemplate"
import type { StatCard } from "@/components/layout/base/stats"
import { CheckCircle, FileText, Trash2 ,Download } from "lucide-react"




export function useTemplateStats() {
    const { useGetTemplates } = useTemplate()
    const { data, isLoading } = useGetTemplates({ PageSize: 1000 })

    const stats: StatCard[] = useMemo(() => {
        const templates = data?.data?.items || [];

        const totalTemplates = templates.length;
        const activeTemplates = templates.filter(t => t.isDeleted === false).length;
        const totalDownloads = templates.reduce((sum, t) => sum + (t.totalDownload || 0), 0);
        return [
            {
                label: "Tổng số mẫu đề",
                value: totalTemplates,
                icon: FileText,
                color: "text-blue-600",
                description: "Tất cả mẫu đề đã tạo"
            },
             {
                 label:"Tổng số lượng tải xuống",
                 value : totalDownloads,
                 icon: Download,
                 color: "text-purple-600",
                 description: "Tổng số lượt tải xuống của tất cả mẫu đề"
             },
            {
                label: "Mẫu đề đã hoạt động",
                value: activeTemplates,
                color: "text-green-600",
                icon: CheckCircle,
                description: "Các mẫu đề đang hoạt động"
            },
            {
                label: "Mẫu đề đã xóa",
                value: totalTemplates - activeTemplates,
                color: "text-red-600",
                icon: Trash2,
                description: "Các mẫu đề đã bị xóa"
            }
        ]
    }, [data])
    return { stats, isLoading }
}