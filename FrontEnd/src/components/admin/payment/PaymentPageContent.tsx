"use client";
import { type Dispatch, type SetStateAction } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BasePagination } from "@/components/layout/base/pagination";
import { BaseHeader } from "@/components/layout/base/header";
import { StatsSection } from "./StatsSection";
import type { AdminPayment, PaymentFilterState } from "@/utils/type";
import { PaymentToolbar } from "./PaymentToolbar";
import { RenderResults } from "./RenderResults";

type PaginationData = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

interface PaymentPageContentProps {
  stats: {
    totalRevenue: number;
    totalTransactions: number;
    pendingTransactions: number;
  };
  payments: AdminPayment[];
  isLoading: boolean;
  isError: boolean;
  filters: PaymentFilterState;
  setFilters: Dispatch<SetStateAction<PaymentFilterState>>;
  paginationData: PaginationData;
}

export default function PaymentPageContent({
  stats,
  payments,
  isLoading,
  isError,
  filters,
  setFilters,
  paginationData,
}: PaymentPageContentProps) {

  const handlePageChange = (page: number) => {
    setFilters((prev: PaymentFilterState) => ({ ...prev, PageNumber: page }));
  };

  return (
    <div className="space-y-6">
      <BaseHeader
        title="Quản lý Thanh toán"
        description="Xem lịch sử giao dịch trên hệ thống"
        // Không có nút tạo
      />
      
      <StatsSection {...stats} />

      <Card>
        <CardHeader>
          <PaymentToolbar
            filters={filters}
            setFilters={setFilters}
          />
        </CardHeader>
        <CardContent>
          <RenderResults
            payments={payments}
            isLoading={isLoading}
            isError={isError}
          />
          {paginationData && paginationData.totalPages > 1 && !isLoading && (
            <div className="mt-4">
              <BasePagination
                currentPage={paginationData.currentPage}
                totalPages={paginationData.totalPages}
                onPageChange={handlePageChange}
                totalItems={paginationData.totalItems}
                itemsPerPage={paginationData.itemsPerPage}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}