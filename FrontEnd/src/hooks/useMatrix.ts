import { matrixApi } from "@/lib/api/matrix/matrix";
import type { MatrixInput } from "@/schema/matrixSchema";

import { QUERY_KEY } from "@/utils/constants";
import type { MatrixQuery } from "@/utils/type"
import { useMutation, useQuery } from "@tanstack/react-query";




export const useMatrix = () => {
    const useGetMatrices = (filters: MatrixQuery) => {
        return useQuery({
            queryKey: [QUERY_KEY.matrix(filters)],
            queryFn: () => matrixApi.getMatrices(filters),
            staleTime: 5 * 60 * 1000,
        });
    }
    const useGetMatrixById = (id: number) => {
        return useQuery({
            queryKey: [QUERY_KEY.getMatrixById(id)],
            queryFn: () => matrixApi.getMatrixById(id),
            staleTime: 5 * 60 * 1000,
        });
    }
    const createMatrix = useMutation({
        mutationFn: async (data: MatrixInput) => {
            return await matrixApi.createMatrix(data);
        }
    });

    return { useGetMatrices, useGetMatrixById, createMatrix };

}