"use client";
import type { AdminPayment, PaymentStatus } from "@/utils/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye } from "lucide-react";
import { TableCell, TableRow } from '@/components/ui/table';
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface PaymentRowProps {
  payment: AdminPayment;
}

const statusStyles: Record<PaymentStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Success: "bg-green-100 text-green-800 border-green-200",
  Failed: "bg-red-100 text-red-800 border-red-200",
};

export function PaymentRow({ payment }: PaymentRowProps) {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleString('vi-VN');
  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <TableRow className="hover:bg-muted/50">
      {/* [LƯU Ý]: DTO [cite: 13493-13499] không có Tên người dùng / Tên giáo án */}
      <TableCell>
        <div className="font-medium truncate">{payment.userName ?? "N/A"}</div>
        <div className="text-xs text-muted-foreground truncate">{payment.userEmail ?? "N/A"}</div>
      </TableCell>
      <TableCell>
        <div className="text-muted-foreground truncate" title={payment.templateTitle}>
          {payment.templateTitle ?? `(ID: ${payment.paymentId})`}
        </div>
      </TableCell>
      <TableCell>
        <span className="font-medium text-green-600">
          {formatCurrency(payment.amount)}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={`text-xs ${statusStyles[payment.status]}`}>
          {payment.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="text-muted-foreground text-sm">{formatDate(payment.createdAt)}</div>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}