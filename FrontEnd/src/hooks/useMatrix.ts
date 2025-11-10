import { matrixApi } from "@/lib/api/matrix/matrix";
import type { MatrixInput } from "@/schema/matrixSchema";

import { QUERY_KEY } from "@/utils/constants";
import type { MatrixQuery } from "@/utils/type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";




export const useMatrix = () => {
    const queryClient = useQueryClient();
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
    const usePostMatrix = useMutation({
        mutationFn: async (data: MatrixInput) => {
            return await matrixApi.createMatrix(data);
        }, onSuccess: async () => {
            const freshData = await matrixApi.getMatrices({ PageNumber: 1, PageSize: 10, search: '' });
            queryClient.setQueryData([QUERY_KEY.matrix({ PageNumber: 1, PageSize: 10, search: '' })], freshData);
        },
    });
    const useDeleteMatrix = useMutation({
        mutationFn: async (id: number) => {
            return await matrixApi.deleteMatrix(id);
        }, onSuccess: async () => {
            const freshData = await matrixApi.getMatrices({ PageNumber: 1, PageSize: 10, search: '' });
            queryClient.setQueryData([QUERY_KEY.matrix({ PageNumber: 1, PageSize: 10, search: '' })], freshData);
        },
    });
    const useRestoreMatrix = useMutation({
        mutationFn: async (id: number) => {
            return await matrixApi.restoreMatrix(id);
        }, onSuccess: async () => {
            const freshData = await matrixApi.getMatrices({ PageNumber: 1, PageSize: 10, search: '' });
            queryClient.setQueryData([QUERY_KEY.matrix({ PageNumber: 1, PageSize: 10, search: '' })], freshData);
        },
    });
    const useUpdateMatrix = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: MatrixInput }) => {
            return await matrixApi.updateMatrix(id, data);
        }, onSuccess: async (_res, variables) => {
            const { id } = variables;
            const freshList = await matrixApi.getMatrices({
                PageNumber: 1,
                PageSize: 10,
                search: "",
            });
            queryClient.setQueryData(
                [QUERY_KEY.matrix({ PageNumber: 1, PageSize: 10, search: "" })],
                freshList
            );

            const freshDetail = await matrixApi.getMatrixById(id);
            queryClient.setQueryData([QUERY_KEY.getMatrixById(id)], freshDetail);
        },
    });


    return { useGetMatrices, useGetMatrixById, usePostMatrix, useDeleteMatrix, useRestoreMatrix, useUpdateMatrix };

}