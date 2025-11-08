"use client";

import { useMemo } from "react";
import { BaseHeader } from "@/components/layout/base/header";
import { StatsSection } from "./_components/StatsSection";
import { MatrixListSection } from "./_components/MatrixListSection";
import type { Matrix } from "@/utils/type";
import { useGradeLevel } from "@/hooks/useGradeLevel";

// Mock data - Trong thực tế sẽ fetch từ API
const mockMatrices: Matrix[] = [
	{
		matrixId: 1,
		title: "Ma Trận Đề Thi Văn Học 10 - Kỳ 1",
		description: "Đề thi giữa kỳ I cho lớp 10, bao gồm trắc nghiệm và tự luận",
		gradeLevelId: 1,
		createdByUserId: 1,
		createdAt: "2025-11-05",
		status: "active",
		totalQuestions: 45,
		totalPoints: 10,
		details: [
			{
				examMatrixDetailId: 1,
				lessonName: "Văn học hiện đại",
				questionType: "2",
				difficulty: "2",
				quantity: 35,
				scorePerQuestion: 0.2,
			},
			{
				examMatrixDetailId: 2,
				lessonName: "Văn học hiện đại",
				questionType: "3",
				difficulty: "3",
				quantity: 10,
				scorePerQuestion: 0.3,
			},
		],
	},
	{
		matrixId: 2,
		title: "Ma Trận Văn Học 11 - Kỳ 2",
		description: "Đề thi cuối kỳ II lớp 11, kiểm tra toàn bộ chương trình",
		gradeLevelId: 2,
		createdByUserId: 2,
		createdAt: "2025-11-03",
		status: "draft",
		totalQuestions: 50,
		totalPoints: 10,
		details: [],
	},
	{
		matrixId: 3,
		title: "Ma Trận Ôn Thi THPT Quốc Gia",
		description: "Ôn tập toàn bộ kiến thức Văn học cho kỳ thi THPT QG",
		gradeLevelId: 3,
		createdByUserId: 1,
		createdAt: "2025-11-01",
		status: "active",
		totalQuestions: 100,
		totalPoints: 20,
		details: [],
	},
	{
		matrixId: 4,
		title: "Ma Trận Tác Phẩm Hay - Phần I",
		description: "Kiểm tra kiến thức về các tác phẩm văn học nổi bật",
		gradeLevelId: 1,
		createdByUserId: 3,
		createdAt: "2025-10-28",
		status: "active",
		totalQuestions: 40,
		totalPoints: 10,
		details: [],
	},
];

export default function MatrixPage() {
	// Fetch Grade Levels
	const { useGetGradeLevels } = useGradeLevel();
	const { data: gradeLevelData, isLoading: isLoadingGradeLevels } = useGetGradeLevels({
		PageNumber: 1,
		PageSize: 100,
	});

	const gradeLevels = useMemo(() => {
		return gradeLevelData?.data?.items || [];
	}, [gradeLevelData?.data?.items]);

	// Merge Matrix với GradeLevel name
	const enrichedMatrices = useMemo(() => {
		return mockMatrices.map((matrix) => {
			const gradeLevel = gradeLevels.find((g) => g.gradeLevelId === matrix.gradeLevelId);

			return {
				...matrix,
				gradeLevel: gradeLevel?.name || `Lớp ${matrix.gradeLevelId}`,
			};
		});
	}, [gradeLevels]);

	// Calculate stats
	const totalMatrices = enrichedMatrices.length;
	const activeMatrices = enrichedMatrices.filter((m) => m.status === "active").length;
	const draftMatrices = enrichedMatrices.filter((m) => m.status === "draft").length;
	const totalQuestions = enrichedMatrices.reduce(
		(sum, m) => sum + (m.totalQuestions || 0),
		0
	);

	// Loading state
	if (isLoadingGradeLevels) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="space-y-6 p-3">
			<BaseHeader
				title="Ma Trận Đề Thi"
				description="Quản lý tất cả ma trận đề thi của bạn"
			/>

			<StatsSection
				totalMatrices={totalMatrices}
				activeMatrices={activeMatrices}
				draftMatrices={draftMatrices}
				totalQuestions={totalQuestions}
			/>

			<MatrixListSection
				matrices={enrichedMatrices}
				gradeLevels={gradeLevels}
			/>
		</div>
	);
}
