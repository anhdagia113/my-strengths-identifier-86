
import { Transaction } from "@/api/services/transaction.service";
import { Badge } from "@/components/ui/badge";
import React from "react";

export const getStatusBadge = (status: string): JSX.Element => {
  switch (status) {
    case "COMPLETED":
      return <Badge className="bg-green-500">Thành công</Badge>;
    case "PENDING":
      return <Badge className="bg-yellow-500">Đang xử lý</Badge>;
    case "FAILED":
      return <Badge className="bg-red-500">Thất bại</Badge>;
    case "REFUNDED":
      return <Badge className="bg-purple-500">Hoàn tiền</Badge>;
    default:
      return <Badge>Không xác định</Badge>;
  }
};
