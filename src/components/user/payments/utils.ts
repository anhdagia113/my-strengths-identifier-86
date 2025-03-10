
import { Transaction } from "@/api/services/transaction.service";
import { Badge } from "@/components/ui/badge";
import React from "react";

export const getStatusBadge = (status: string): JSX.Element => {
  switch (status) {
    case "COMPLETED":
      return React.createElement(Badge, { className: "bg-green-500" }, "Thành công");
    case "PENDING":
      return React.createElement(Badge, { className: "bg-yellow-500" }, "Đang xử lý");
    case "FAILED":
      return React.createElement(Badge, { className: "bg-red-500" }, "Thất bại");
    case "REFUNDED":
      return React.createElement(Badge, { className: "bg-purple-500" }, "Hoàn tiền");
    default:
      return React.createElement(Badge, {}, "Không xác định");
  }
};
