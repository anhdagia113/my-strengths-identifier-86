
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Trash2 } from "lucide-react";
import { PaymentMethod } from "@/types/service";

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}

const PaymentMethodCard = ({ method, onSetDefault, onDelete }: PaymentMethodCardProps) => {
  return (
    <Card key={method.id} className="overflow-hidden">
      <div
        className={`p-6 ${
          method.isDefault
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span className="font-medium">{method.name}</span>
          </div>
          {method.isDefault && (
            <Badge variant="outline" className="bg-background text-foreground">
              Mặc định
            </Badge>
          )}
        </div>
        <div className="mt-2 text-sm">
          Hết hạn: {method.expiry}
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="space-x-2">
          {!method.isDefault && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onSetDefault(method.id)}
            >
              Đặt làm mặc định
            </Button>
          )}
        </div>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-destructive"
          onClick={() => onDelete(method.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default PaymentMethodCard;
