
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Transaction } from "@/api/services/transaction.service";

interface TransactionDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  getStatusBadge: (status: string) => JSX.Element;
}

const TransactionDetailDialog = ({ 
  isOpen, 
  onOpenChange, 
  transaction, 
  getStatusBadge 
}: TransactionDetailDialogProps) => {
  if (!transaction) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết giao dịch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID Giao dịch</p>
              <p className="font-medium">{transaction.transactionId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ngày</p>
              <p className="font-medium">
                {format(new Date(transaction.paymentDate), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Dịch vụ</p>
              <p className="font-medium">{transaction.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phương thức</p>
              <p className="font-medium">{transaction.paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Số tiền</p>
              <p className="font-medium">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(transaction.amount)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Trạng thái</p>
              <div className="pt-1">{getStatusBadge(transaction.status)}</div>
            </div>
          </div>
          <div className="border-t pt-4 mt-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">Thông tin giao dịch</p>
            <p className="text-sm">
              Mọi thắc mắc về giao dịch, vui lòng liên hệ với chúng tôi qua số hotline 1900-1234 hoặc gửi email về support@beautyspa.vn
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailDialog;
