
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, CreditCard as CreditCardIcon } from "lucide-react";

interface AddPaymentMethodDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newPayment: {
    type: string;
    cardNumber: string;
    cardName: string;
    expiry: string;
    cvv: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTypeChange: (type: string) => void;
}

const AddPaymentMethodDialog = ({
  isOpen,
  onOpenChange,
  newPayment,
  onChange,
  onSubmit,
  onTypeChange
}: AddPaymentMethodDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm phương thức thanh toán</DialogTitle>
          <DialogDescription>
            Nhập thông tin thẻ của bạn để thêm phương thức thanh toán mới
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Loại phương thức</Label>
            <div className="flex space-x-2">
              <Button 
                type="button"
                variant={newPayment.type === "credit_card" ? "default" : "outline"}
                onClick={() => onTypeChange("credit_card")}
                className="flex-1"
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Thẻ tín dụng
              </Button>
              <Button 
                type="button"
                variant={newPayment.type === "bank" ? "default" : "outline"}
                onClick={() => onTypeChange("bank")}
                className="flex-1"
              >
                <Building className="mr-2 h-4 w-4" />
                Tài khoản ngân hàng
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-number">
              {newPayment.type === "credit_card" ? "Số thẻ" : "Số tài khoản"}
            </Label>
            <Input 
              id="card-number"
              name="cardNumber"
              value={newPayment.cardNumber}
              onChange={onChange}
              placeholder={newPayment.type === "credit_card" ? "1234 5678 9012 3456" : "0123456789"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-name">Tên chủ thẻ</Label>
            <Input 
              id="card-name"
              name="cardName"
              value={newPayment.cardName}
              onChange={onChange}
              placeholder="NGUYEN VAN A"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Ngày hết hạn</Label>
              <Input 
                id="expiry"
                name="expiry"
                value={newPayment.expiry}
                onChange={onChange}
                placeholder="MM/YY"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">Mã bảo mật (CVV)</Label>
              <Input 
                id="cvv"
                name="cvv"
                value={newPayment.cvv}
                onChange={onChange}
                placeholder="123"
                type="password"
                maxLength={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
            <Button type="submit">Thêm phương thức thanh toán</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentMethodDialog;
