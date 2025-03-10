
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { CreditCard, Plus } from "lucide-react";
import { PaymentMethod } from "@/types/service";
import PaymentMethodCard from './PaymentMethodCard';

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const PaymentMethodList = ({ 
  paymentMethods, 
  onSetDefault, 
  onDelete, 
  onAddNew 
}: PaymentMethodListProps) => {
  return (
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <PaymentMethodCard 
            key={method.id}
            method={method}
            onSetDefault={onSetDefault}
            onDelete={onDelete}
          />
        ))}
        
        {paymentMethods.length === 0 && (
          <div className="col-span-2 text-center py-8 border rounded-lg">
            <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-4">Bạn chưa có phương thức thanh toán nào</p>
            <Button onClick={onAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm phương thức thanh toán
            </Button>
          </div>
        )}
      </div>

      {paymentMethods.length > 0 && (
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onAddNew}
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm phương thức thanh toán mới
          </Button>
        </div>
      )}
    </CardContent>
  );
};

export default PaymentMethodList;
