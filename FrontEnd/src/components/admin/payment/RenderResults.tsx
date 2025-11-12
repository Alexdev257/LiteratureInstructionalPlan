"use client";
import type { AdminPayment } from "@/utils/type";
import { PaymentRow } from "./PaymentRow";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow as UiTableRow } from '@/components/ui/table';

type RenderResultsProps = {
  payments: AdminPayment[];
  isLoading: boolean;
  isError: boolean;
};

export function RenderResults({ payments, isLoading, isError }: RenderResultsProps) {
  const headers = ["Người Dùng (Email)", "Giáo Án", "Số Tiền", "Trạng Thái", "Ngày Tạo", "Hành Động"];

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">Đang tải dữ liệu...</div>;
  }
  if (isError) {
     return <div className="p-6 text-center text-destructive">Lỗi tải dữ liệu.</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <UiTableRow className="bg-muted/50">
            <TableHead>{headers[0]}</TableHead>
            <TableHead>{headers[1]}</TableHead>
            <TableHead>{headers[2]}</TableHead>
            <TableHead>{headers[3]}</TableHead>
            <TableHead>{headers[4]}</TableHead>
            <TableHead className="text-right w-20">{headers[5]}</TableHead>
          </UiTableRow>
        </TableHeader>
        <TableBody>
          {payments.length === 0 ? (
            <UiTableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                Không tìm thấy thanh toán nào.
              </TableCell>
            </UiTableRow>
          ) : (
            payments.map((p) => (
              <PaymentRow
                key={p.paymentId}
                payment={p}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}