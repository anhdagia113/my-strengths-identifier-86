
import { useState } from "react";
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
} from "lucide-react";
import { format } from "date-fns";

// Sample data for payment methods and transactions
const paymentMethods = [
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
  },
];

const transactions = [
  {
    id: "TX12345",
    date: "2023-06-15T09:30:00",
    service: "Chăm sóc da cơ bản",
    amount: 450000,
    status: "completed",
    paymentMethod: "Visa ****1234",
  },
  {
    id: "TX12346",
    date: "2023-05-20T14:00:00",
    service: "Trị mụn chuyên sâu",
    amount: 650000,
    status: "completed",
    paymentMethod: "Mastercard ****5678",
  },
  {
    id: "TX12347",
    date: "2023-04-10T10:15:00",
    service: "Trẻ hóa da",
    amount: 850000,
    status: "completed",
    paymentMethod: "Visa ****1234",
  },
  {
    id: "TX12348",
    date: "2023-03-05T16:30:00",
    service: "Massage mặt",
    amount: 350000,
    status: "failed",
    paymentMethod: "Mastercard ****5678",
  },
  {
    id: "TX12349",
    date: "2023-02-18T11:00:00",
    service: "Tẩy trang chuyên sâu",
    amount: 250000,
    status: "refunded",
    paymentMethod: "Visa ****1234",
  },
];

const UserPayments = () => {
  const [activeTab, setActiveTab] = useState("payment_methods");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Thành công</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Đang xử lý</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Thất bại</Badge>;
      case "refunded":
        return <Badge className="bg-purple-500">Hoàn tiền</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Thanh toán</h1>
        <div className="space-x-2">
          <Button>
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
                          <Badge className="bg-background text-foreground">
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
                          <Button size="sm" variant="outline">
                            Đặt làm mặc định
                          </Button>
                        )}
                      </div>
                      <Button size="sm" variant="ghost" className="text-red-500">
                        Xóa
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Thêm phương thức thanh toán mới
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử giao dịch</CardTitle>
              <CardDescription>
                Xem lại tất cả các giao dịch thanh toán của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.id}
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(transaction.date),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </TableCell>
                        <TableCell>{transaction.service}</TableCell>
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
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
                    {transactions
                      .filter((t) => t.status === "completed")
                      .map((transaction, index) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            INV-{2023}-{(index + 1).toString().padStart(4, "0")}
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(transaction.date),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell>{transaction.service}</TableCell>
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
                      ))}
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
                  <Button className="flex-1">Nạp tiền</Button>
                  <Button variant="outline" className="flex-1">
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
    </div>
  );
};

export default UserPayments;
