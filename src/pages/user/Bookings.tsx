
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Eye, Calendar, XCircle } from "lucide-react";
import { format } from "date-fns";

const userBookings = [
  {
    id: "1",
    service: "Chăm sóc da cơ bản",
    specialist: "Nguyễn Thị A",
    date: "2023-10-15T09:00:00",
    status: "upcoming",
    price: 450000,
  },
  {
    id: "2",
    service: "Trị mụn chuyên sâu",
    specialist: "Trần Văn B",
    date: "2023-10-10T15:30:00",
    status: "completed",
    price: 650000,
  },
  {
    id: "3",
    service: "Massage mặt",
    specialist: "Lê Thị C",
    date: "2023-09-28T11:00:00",
    status: "canceled",
    price: 350000,
  },
  {
    id: "4",
    service: "Tẩy trang chuyên sâu",
    specialist: "Phạm Văn D",
    date: "2023-11-05T14:00:00",
    status: "upcoming",
    price: 250000,
  },
];

const UserBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Sắp tới</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Hoàn thành</Badge>;
      case "canceled":
        return <Badge className="bg-red-500">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const filteredBookings = userBookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Lịch đặt của tôi</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Đặt lịch mới
        </Button>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          <TabsTrigger value="canceled">Đã hủy</TabsTrigger>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách lịch đặt</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>Chuyên viên</TableHead>
                    <TableHead>Ngày giờ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.service}</TableCell>
                        <TableCell>{booking.specialist}</TableCell>
                        <TableCell>
                          {format(new Date(booking.date), "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(booking.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Xem chi tiết"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {booking.status === "upcoming" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Hủy lịch"
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Không có lịch đặt nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBookings;
