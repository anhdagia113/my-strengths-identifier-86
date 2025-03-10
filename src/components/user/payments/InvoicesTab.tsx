
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "@/api/services/transaction.service";

interface InvoicesTabProps {
  transactions: Transaction[] | undefined;
}

const InvoicesTab = ({ transactions }: InvoicesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hóa đơn</CardTitle>
        <CardDescription>
          Quản lý và tải xuống hóa đơn của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Số hóa đơn</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Tổng tiền</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.filter(t => t.status === "COMPLETED").length > 0 ? (
                transactions
                  .filter((t) => t.status === "COMPLETED")
                  .map((transaction, index) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        INV-{new Date().getFullYear()}-{(index + 1).toString().padStart(4, "0")}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(transaction.paymentDate),
                          "dd/MM/yyyy"
                        )}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(transaction.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Đã xuất</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Xem hóa đơn"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Tải xuống"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Bạn chưa có hóa đơn nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoicesTab;
