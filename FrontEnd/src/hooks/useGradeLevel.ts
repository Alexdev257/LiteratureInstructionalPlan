import { gradeLevelApi } from "@/lib/api/gradeLevel/gradeLevel";
import { QUERY_KEY } from "@/utils/constants";
import type { GradeLevelQuery } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";





export const useGradeLevel = () => {
    const useGetGradeLevels = (filters: GradeLevelQuery, options?: { enabled?: boolean }) => {
        return useQuery({
            queryKey: [QUERY_KEY.gradeLevel(filters)],
            queryFn: () => gradeLevelApi.getGradeLevels(filters),
            staleTime: 5 * 60 * 1000,
            enabled: options?.enabled ?? true,
        });
    }
    const useGetGradeLevelById = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.gradeLevelById(id)],
            queryFn: () => gradeLevelApi.getGradeLevelById(id),
            staleTime: 5 * 60 * 1000,

        });
    }
    return { useGetGradeLevels, useGetGradeLevelById };
};