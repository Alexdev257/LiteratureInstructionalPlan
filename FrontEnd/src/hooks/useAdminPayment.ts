"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  GetAllPaymentQuery,
  PaymentGetResponseDTO,
  ResponseData,
} from "@/utils/type";
import { paymentAdminApi } from "@/lib/api/admin/paymentApi"; // Import API mới

const PAYMENT_QUERY_KEY = "adminPayments"; // Key riêng

export const useAdminPayment = () => {
  const queryClient = useQueryClient();

  // Query: Lấy danh sách
  const useGetPayments = (filters: GetAllPaymentQuery) => {
    return useQuery<ResponseData<PaymentGetResponseDTO[]>, Error>({
      queryKey: [PAYMENT_QUERY_KEY, filters],
      queryFn: () => paymentAdminApi.getPayments(filters),
      placeholderData: (previousData) => previousData,
    });
  };

  // Query: Lấy 1
  const useGetPaymentById = (id: number, options = { enabled: true }) => {
    return useQuery<ResponseData<PaymentGetResponseDTO>, Error>({
      queryKey: [PAYMENT_QUERY_KEY, 'detail', id],
      queryFn: () => paymentAdminApi.getPaymentById(id),
      enabled: options.enabled && !!id,
    });
  };
  

  return {
    useGetPayments,
    useGetPaymentById,
  };
};