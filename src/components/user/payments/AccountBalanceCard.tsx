
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Receipt, Wallet } from "lucide-react";
import { format } from "date-fns";

interface AccountBalanceCardProps {
  balance: number;
  onDeposit: () => void;
  onWithdraw: () => void;
}

const AccountBalanceCard = ({ balance, onDeposit, onWithdraw }: AccountBalanceCardProps) => {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center">
        <div className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Số dư tài khoản</CardTitle>
            <CardDescription>
              Số dư khả dụng và thông tin ví của bạn
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Số dư hiện tại
            </div>
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(balance)}
            </div>
            <div className="text-xs text-muted-foreground">
              Cập nhật lần cuối: {format(new Date(), "dd/MM/yyyy HH:mm")}
            </div>
            <div className="flex space-x-2 pt-2">
              <Button className="flex-1" onClick={onDeposit}>Nạp tiền</Button>
              <Button variant="outline" className="flex-1" onClick={onWithdraw}>
                Rút tiền
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center space-x-2 text-muted-foreground mb-4">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Lưu ý thanh toán</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Receipt className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span>
                  Số dư tài khoản có thể được sử dụng để thanh toán dịch vụ 
                  và có thể được hoàn lại khi hủy lịch
                </span>
              </li>
              <li className="flex items-start">
                <Receipt className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span>
                  Hoàn tiền sẽ được xử lý trong vòng 3-5 ngày làm việc
                </span>
              </li>
              <li className="flex items-start">
                <Receipt className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                <span>
                  Giữ liên hệ với chúng tôi nếu bạn có thắc mắc về thanh toán
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalanceCard;
