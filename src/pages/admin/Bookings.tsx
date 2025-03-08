import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Filter, 
  Search, 
  Eye, 
  Check, 
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "sonner";

// Dummy data for bookings
const bookingsData = [
  {
    id: "1",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    service: "Chăm sóc da cơ bản",
    specialist: "Trần Thị B",
    date: "2023-10-15T09:00:00",
    status: "pending",
    price: 450000,
  },
  {
    id: "2",
    customerName: "Lê Thị C",
    customerPhone: "0912345678",
    service: "Trị mụn chuyên sâu",
    specialist: "Phạm Văn D",
    date: "2023-10-10T15:30:00",
    status: "confirmed",
    price: 650000,
  },
  {
    id: "3",
    customerName: "Hoàng Văn E",
    customerPhone: "0923456789",
    service: "Massage mặt",
    specialist: "Ngô Thị F",
    date: "2023-09-28T11:00:00",
    status: "completed",
    price: 350000,
  },
  {
    id: "4",
    customerName: "Trịnh Văn G",
    customerPhone: "0934567890",
    service: "Tẩy trang chuyên sâu",
    specialist: "Lý Thị H",
    date: "2023-11-05T14:00:00",
    status: "canceled",
    price: 250000,
  },
  {
    id: "5",
    customerName: "Đinh Thị I",
    customerPhone: "0945678901",
    service: "Trẻ hóa da",
    specialist: "Vũ Văn K",
    date: "2023-10-20T10:00:00",
    status: "pending",
    price: 800000,
  },
];

const AdminBookings = () => {
  const [bookings, setBookings] = useState(bookingsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<(typeof bookingsData)[0] | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) => {
    // Filter by tab
    if (activeTab !== "all" && booking.status !== activeTab) {
      return false;
    }
    
    // Filter by search query
    const query = searchQuery.toLowerCase();
    return (
      booking.customerName.toLowerCase().includes(query) ||
      booking.customerPhone.includes(query) ||
      booking.service.toLowerCase().includes(query) ||
      booking.specialist.toLowerCase().includes(query)
    );
  });

  const handleViewDetails = (booking: (typeof bookingsData)[0]) => {
    setSelectedBooking(booking);
    setIsDetailsDialogOpen(true);
  };

  const handleConfirmBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "confirmed" } 
        : booking
    ));
    toast.success("Đã xác nhận lịch đặt thành công");
  };

  const handleCompleteBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "completed" } 
        : booking
    ));
    toast.success("Đã hoàn thành lịch đặt");
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: "canceled" } 
        : booking
    ));
    toast.success("Đã hủy lịch đặt");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Chờ xác nhận</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-500">Đã xác nhận</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Hoàn thành</Badge>;
      case "canceled":
        return <Badge className="bg-red-500">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý lịch đặt</h1>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Tạo lịch đặt mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách lịch đặt</CardTitle>
              <CardDescription>
                Quản lý tất cả các lịch đặt dịch vụ
              </CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
                <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
                <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                <TabsTrigger value="canceled">Đã hủy</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <TabsContent value={activeTab} className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Khách hàng</TableHead>
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
                          <TableCell className="font-medium">
                            {booking.customerName}
                            <div className="text-xs text-muted-foreground">{booking.customerPhone}</div>
                          </TableCell>
                          <TableCell>{booking.service}</TableCell>
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
                                onClick={() => handleViewDetails(booking)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {booking.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Xác nhận"
                                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-100"
                                  onClick={() => handleConfirmBooking(booking.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {booking.status === "confirmed" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Hoàn thành"
                                  className="text-green-500 hover:text-green-700 hover:bg-green-100"
                                  onClick={() => handleCompleteBooking(booking.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {(booking.status === "pending" || booking.status === "confirmed") && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Hủy lịch"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center p-4">
                          Không tìm thấy lịch đặt nào
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết lịch đặt</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về lịch đặt
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Mã lịch đặt</p>
                  <p className="text-sm">{selectedBooking.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Trạng thái</p>
                  <p>{getStatusBadge(selectedBooking.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Giá</p>
                  <p className="text-sm font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedBooking.price)}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Khách hàng</p>
                <p className="text-sm">{selectedBooking.customerName}</p>
                <p className="text-sm text-muted-foreground">{selectedBooking.customerPhone}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Dịch vụ</p>
                <p className="text-sm">{selectedBooking.service}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Chuyên viên</p>
                <p className="text-sm">{selectedBooking.specialist}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Thời gian</p>
                <p className="text-sm">
                  {format(new Date(selectedBooking.date), "EEEE, dd/MM/yyyy 'lúc' HH:mm", { locale: vi })}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <div className="flex gap-2">
              {selectedBooking?.status === "pending" && (
                <>
                  <Button 
                    variant="default"
                    onClick={() => {
                      handleConfirmBooking(selectedBooking.id);
                      setIsDetailsDialogOpen(false);
                    }}
                  >
                    Xác nhận
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleCancelBooking(selectedBooking.id);
                      setIsDetailsDialogOpen(false);
                    }}
                  >
                    Hủy lịch
                  </Button>
                </>
              )}
              {selectedBooking?.status === "confirmed" && (
                <>
                  <Button 
                    variant="default"
                    onClick={() => {
                      handleCompleteBooking(selectedBooking.id);
                      setIsDetailsDialogOpen(false);
                    }}
                  >
                    Hoàn thành
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleCancelBooking(selectedBooking.id);
                      setIsDetailsDialogOpen(false);
                    }}
                  >
                    Hủy lịch
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
