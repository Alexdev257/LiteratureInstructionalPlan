"use client";
import { useState, useMemo } from "react";
import { useAdminPayment } from "@/hooks/useAdminPayment";
import type { PaymentFilterState, GetAllPaymentQuery, AdminPayment } from "@/utils/type";
import PaymentPageContent from "./PaymentPageContent";
import { StatsSection } from "./StatsSection"; 

export default function AdminPaymentPage() {
  
  const [filters, setFilters] = useState<PaymentFilterState>({
    PageNumber: 1,
    PageSize: 10,
    status: "All",
    search: "",
  });

  const apiFilters: GetAllPaymentQuery = {};

  const { useGetPayments } = useAdminPayment();
  const { data: paymentResponse, isLoading, isError } = useGetPayments(apiFilters);
  
  const allPayments = paymentResponse?.data ?? [];

  const { paginatedPayments, totalPages, totalItems } = useMemo(() => {
    let filtered: AdminPayment[] = allPayments as AdminPayment[]; // Ép kiểu tạm thời

    if (filters.status && filters.status !== "All") {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.userEmail?.toLowerCase().includes(search) ||
        p.userName?.toLowerCase().includes(search) ||
        p.templateTitle?.toLowerCase().includes(search)
      );
    }

    // Pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / filters.PageSize!);
    const startIndex = (filters.PageNumber! - 1) * filters.PageSize!;
    const paginatedPayments = filtered.slice(startIndex, startIndex + filters.PageSize!);

    return { paginatedPayments, totalPages, totalItems };
  }, [allPayments, filters.status, filters.search, filters.PageNumber, filters.PageSize]);
  
  const pagination = {
    currentPage: filters.PageNumber ?? 1,
    totalPages: totalPages,
    totalItems: totalItems,
    itemsPerPage: filters.PageSize ?? 10,
  };

  // Tính Stats
  const stats = useMemo(() => {
    const totalRevenue = allPayments
      .filter(p => p.status === 'Success')
      .reduce((sum, p) => sum + p.amount, 0);
    const totalTransactions = allPayments.length;
    const pendingTransactions = allPayments.filter(p => p.status === 'Pending').length;
    return { totalRevenue, totalTransactions, pendingTransactions };
  }, [allPayments]);

  return (
    <PaymentPageContent
      stats={stats}
      payments={paginatedPayments}
      isLoading={isLoading}
      isError={isError}
      filters={filters}
      setFilters={setFilters}
      paginationData={pagination}
    />
  );
}