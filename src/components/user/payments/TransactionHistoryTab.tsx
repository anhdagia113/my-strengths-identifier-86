
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
import { AlertCircle, Eye, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { Transaction } from "@/api/services/transaction.service";

interface TransactionHistoryTabProps {
  transactions: Transaction[] | undefined;
  transactionsLoading: boolean;
  transactionsError: boolean;
  onRefetch: () => void;
  onViewTransaction: (transaction: Transaction) => void;
  getStatusBadge: (status: string) => JSX.Element;
}

const TransactionHistoryTab = ({
  transactions,
  transactionsLoading,
  transactionsError,
  onRefetch,
  onViewTransaction,
  getStatusBadge
}: TransactionHistoryTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Lịch sử giao dịch</CardTitle>
          <CardDescription>
            Xem lại tất cả các giao dịch thanh toán của bạn
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefetch}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Làm mới
        </Button>
      </CardHeader>
      <CardContent>
        {transactionsLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Đang tải dữ liệu...</span>
          </div>
        ) : transactionsError ? (
          <div className="text-center py-10">
            <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-2" />
            <p className="text-lg font-medium text-destructive">Không thể tải dữ liệu</p>
            <p className="text-muted-foreground mb-4">Đã xảy ra lỗi khi tải giao dịch</p>
            <Button onClick={onRefetch}>Thử lại</Button>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Giao dịch</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions && transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.transactionId}
                      </TableCell>
                      <TableCell>
                        {format(
                          new Date(transaction.paymentDate),
                          "dd/MM/yyyy HH:mm"
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
                        {getStatusBadge(transaction.status)}
                      </TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Xem chi tiết"
                          onClick={() => onViewTransaction(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      Bạn chưa có giao dịch nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistoryTab;
