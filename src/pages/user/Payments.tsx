
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/api/services/transaction.service";
import TransactionService from "@/api/services/transaction.service";
import { PaymentMethod } from "@/types/service";

// Import refactored components
import PaymentMethodList from "@/components/user/payments/PaymentMethodList";
import AddPaymentMethodDialog from "@/components/user/payments/AddPaymentMethodDialog";
import AccountBalanceCard from "@/components/user/payments/AccountBalanceCard";
import TransactionHistoryTab from "@/components/user/payments/TransactionHistoryTab";
import InvoicesTab from "@/components/user/payments/InvoicesTab";
import TransactionDetailDialog from "@/components/user/payments/TransactionDetailDialog";
import { getStatusBadge } from "@/components/user/payments/utils";

const UserPayments = () => {
  const [activeTab, setActiveTab] = useState("payment_methods");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] = useState(false);
  
  const [newPayment, setNewPayment] = useState({
    type: "credit_card",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const { 
    data: transactions, 
    isLoading: transactionsLoading, 
    isError: transactionsError,
    refetch: refetchTransactions
  } = useQuery({
    queryKey: ['userTransactions'],
    queryFn: TransactionService.getUserTransactions
  });

  // Placeholder for payment methods (to be replaced with actual API)
  useEffect(() => {
    const loadPaymentMethods = () => {
      // Temporarily using static data until payment methods API is ready
      setPaymentMethods([
        {
          id: "1",
          type: "credit_card",
          name: "Visa ****1234",
          expiry: "05/25",
          isDefault: true,
        },
        {
          id: "2",
          type: "credit_card",
          name: "Mastercard ****5678",
          expiry: "08/24",
          isDefault: false,
        }
      ]);
    };
    
    loadPaymentMethods();
  }, []);

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDetailOpen(true);
  };

  const handleNewPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPayment({
      ...newPayment,
      [name]: value
    });
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newPayment.cardNumber || !newPayment.cardName || !newPayment.expiry) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    // Create masked card number
    const last4 = newPayment.cardNumber.slice(-4);
    const cardType = newPayment.type === "credit_card" ? "Visa" : "Building";
    const maskedNumber = `${cardType} ****${last4}`;
    
    // Create new payment method
    const newMethod: PaymentMethod = {
      id: (paymentMethods.length + 1).toString(),
      type: newPayment.type,
      name: maskedNumber,
      expiry: newPayment.expiry,
      isDefault: paymentMethods.length === 0
    };
    
    // Add to list
    setPaymentMethods([...paymentMethods, newMethod]);
    
    // Reset form and close dialog
    setNewPayment({
      type: "credit_card",
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    });
    
    setIsAddPaymentDialogOpen(false);
    toast.success("Thêm phương thức thanh toán thành công");
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    
    setPaymentMethods(updatedMethods);
    toast.success("Đã đặt làm phương thức thanh toán mặc định");
  };

  const handleDeletePaymentMethod = (id: string) => {
    // Check if it's the default method
    const isDefault = paymentMethods.find(m => m.id === id)?.isDefault;
    
    // Filter out the method
    const updatedMethods = paymentMethods.filter(m => m.id !== id);
    
    // If we removed the default method and there are other methods, make the first one default
    if (isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true;
    }
    
    setPaymentMethods(updatedMethods);
    toast.success("Đã xóa phương thức thanh toán");
  };

  const handleDeposit = () => {
    toast.success("Nạp tiền thành công");
  };

  const handleWithdraw = () => {
    toast.success("Yêu cầu rút tiền đã được gửi");
  };

  const handleChangePaymentType = (type: string) => {
    setNewPayment({...newPayment, type});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Thanh toán</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsAddPaymentDialogOpen(true)}>
            <CreditCard className="mr-2 h-4 w-4" />
            Thêm phương thức thanh toán
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="payment_methods"
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="payment_methods">
            Phương thức thanh toán
          </TabsTrigger>
          <TabsTrigger value="transactions">Lịch sử giao dịch</TabsTrigger>
          <TabsTrigger value="invoices">Hóa đơn</TabsTrigger>
        </TabsList>

        <TabsContent value="payment_methods">
          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>
                Quản lý các phương thức thanh toán của bạn
              </CardDescription>
            </CardHeader>
            <PaymentMethodList
              paymentMethods={paymentMethods}
              onSetDefault={handleSetDefaultPaymentMethod}
              onDelete={handleDeletePaymentMethod}
              onAddNew={() => setIsAddPaymentDialogOpen(true)}
            />
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionHistoryTab
            transactions={transactions}
            transactionsLoading={transactionsLoading}
            transactionsError={transactionsError}
            onRefetch={refetchTransactions}
            onViewTransaction={handleViewTransaction}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoicesTab transactions={transactions} />
        </TabsContent>
      </Tabs>

      {activeTab === "payment_methods" && (
        <AccountBalanceCard 
          balance={350000}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
        />
      )}

      {/* Add Payment Method Dialog */}
      <AddPaymentMethodDialog
        isOpen={isAddPaymentDialogOpen}
        onOpenChange={setIsAddPaymentDialogOpen}
        newPayment={newPayment}
        onChange={handleNewPaymentChange}
        onSubmit={handleAddPaymentMethod}
        onTypeChange={handleChangePaymentType}
      />

      {/* Transaction Detail Dialog */}
      <TransactionDetailDialog
        isOpen={isTransactionDetailOpen}
        onOpenChange={setIsTransactionDetailOpen}
        transaction={selectedTransaction}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};

export default UserPayments;
