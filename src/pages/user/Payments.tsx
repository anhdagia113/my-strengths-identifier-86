
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Download,
  Eye,
  Wallet,
  Receipt,
  AlertCircle,
  Plus,
  Trash2,
  CreditCard as CreditCardIcon,
  Building,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/api/services/transaction.service";
import TransactionService from "@/api/services/transaction.service";
import { PaymentMethod } from "@/types/service";

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

  const getStatusBadge = (status: string) => {
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
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {paymentMethods.map((method) => (
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
                            onClick={() => handleSetDefaultPaymentMethod(method.id)}
                          >
                            Đặt làm mặc định
                          </Button>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-destructive"
                        onClick={() => handleDeletePaymentMethod(method.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {paymentMethods.length === 0 && (
                  <div className="col-span-2 text-center py-8 border rounded-lg">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground mb-4">Bạn chưa có phương thức thanh toán nào</p>
                    <Button onClick={() => setIsAddPaymentDialogOpen(true)}>
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
                    onClick={() => setIsAddPaymentDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm phương thức thanh toán mới
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
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
                onClick={() => refetchTransactions()}
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
                  <Button onClick={() => refetchTransactions()}>Thử lại</Button>
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
                                onClick={() => handleViewTransaction(transaction)}
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
        </TabsContent>

        <TabsContent value="invoices">
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
        </TabsContent>
      </Tabs>

      {activeTab === "payment_methods" && (
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
                  }).format(350000)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Cập nhật lần cuối: {format(new Date(), "dd/MM/yyyy HH:mm")}
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1" onClick={handleDeposit}>Nạp tiền</Button>
                  <Button variant="outline" className="flex-1" onClick={handleWithdraw}>
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
      )}

      {/* Dialog thêm phương thức thanh toán */}
      <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm phương thức thanh toán</DialogTitle>
            <DialogDescription>
              Nhập thông tin thẻ của bạn để thêm phương thức thanh toán mới
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPaymentMethod} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Loại phương thức</Label>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  variant={newPayment.type === "credit_card" ? "default" : "outline"}
                  onClick={() => setNewPayment({...newPayment, type: "credit_card"})}
                  className="flex-1"
                >
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  Thẻ tín dụng
                </Button>
                <Button 
                  type="button"
                  variant={newPayment.type === "bank" ? "default" : "outline"}
                  onClick={() => setNewPayment({...newPayment, type: "bank"})}
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
                onChange={handleNewPaymentChange}
                placeholder={newPayment.type === "credit_card" ? "1234 5678 9012 3456" : "0123456789"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">Tên chủ thẻ</Label>
              <Input 
                id="card-name"
                name="cardName"
                value={newPayment.cardName}
                onChange={handleNewPaymentChange}
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
                  onChange={handleNewPaymentChange}
                  placeholder="MM/YY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">Mã bảo mật (CVV)</Label>
                <Input 
                  id="cvv"
                  name="cvv"
                  value={newPayment.cvv}
                  onChange={handleNewPaymentChange}
                  placeholder="123"
                  type="password"
                  maxLength={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>Hủy</Button>
              <Button type="submit">Thêm phương thức thanh toán</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog chi tiết giao dịch */}
      <Dialog open={isTransactionDetailOpen} onOpenChange={setIsTransactionDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết giao dịch</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID Giao dịch</p>
                  <p className="font-medium">{selectedTransaction.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ngày</p>
                  <p className="font-medium">
                    {format(new Date(selectedTransaction.paymentDate), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dịch vụ</p>
                  <p className="font-medium">{selectedTransaction.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phương thức</p>
                  <p className="font-medium">{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Số tiền</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedTransaction.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trạng thái</p>
                  <div className="pt-1">{getStatusBadge(selectedTransaction.status)}</div>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">Thông tin giao dịch</p>
                <p className="text-sm">
                  Mọi thắc mắc về giao dịch, vui lòng liên hệ với chúng tôi qua số hotline 1900-1234 hoặc gửi email về support@beautyspa.vn
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserPayments;
