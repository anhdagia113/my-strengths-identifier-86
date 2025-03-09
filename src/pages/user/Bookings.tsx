
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BOOKING_STATUSES } from "@/components/booking/constants";
import { Booking } from "@/types/service";

const userBookings: Booking[] = [
  {
    id: "1",
    service: "Chăm sóc da cơ bản",
    specialist: "Nguyễn Thị A",
    date: "2023-10-15T09:00:00",
    status: BOOKING_STATUSES.UPCOMING,
    price: 450000,
  },
  {
    id: "2",
    service: "Trị mụn chuyên sâu",
    specialist: "Trần Văn B",
    date: "2023-10-10T15:30:00",
    status: BOOKING_STATUSES.COMPLETED,
    price: 650000,
  },
  {
    id: "3",
    service: "Massage mặt",
    specialist: "Lê Thị C",
    date: "2023-09-28T11:00:00",
    status: BOOKING_STATUSES.CANCELED,
    price: 350000,
  },
  {
    id: "4",
    service: "Tẩy trang chuyên sâu",
    specialist: "Phạm Văn D",
    date: "2023-11-05T14:00:00",
    status: BOOKING_STATUSES.UPCOMING,
    price: 250000,
  },
];

const UserBookings = () => {
  const [activeTab, setActiveTab] = useState(BOOKING_STATUSES.UPCOMING);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case BOOKING_STATUSES.UPCOMING:
        return <Badge className="bg-blue-500">Sắp tới</Badge>;
      case BOOKING_STATUSES.COMPLETED:
        return <Badge className="bg-green-500">Hoàn thành</Badge>;
      case BOOKING_STATUSES.CANCELED:
        return <Badge className="bg-red-500">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const filteredBookings = userBookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCancelDialogOpen(true);
  };

  const confirmCancelBooking = () => {
    if (selectedBooking) {
      // Thực hiện logic hủy đặt lịch ở đây (trong thực tế sẽ gọi API)
      toast.success("Đã hủy lịch hẹn thành công");
      setIsCancelDialogOpen(false);
      
      // Cập nhật UI sau khi hủy
      // Trong thực tế, bạn sẽ làm mới dữ liệu từ API
      setTimeout(() => {
        setActiveTab(BOOKING_STATUSES.CANCELED);
      }, 300);
    }
  };

  const handleNewBooking = () => {
    navigate("/booking");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Lịch đặt của tôi</h1>
        <Button onClick={handleNewBooking}>
          <Calendar className="mr-2 h-4 w-4" />
          Đặt lịch mới
        </Button>
      </div>

      <Tabs defaultValue={BOOKING_STATUSES.UPCOMING} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value={BOOKING_STATUSES.UPCOMING}>Sắp tới</TabsTrigger>
          <TabsTrigger value={BOOKING_STATUSES.COMPLETED}>Hoàn thành</TabsTrigger>
          <TabsTrigger value={BOOKING_STATUSES.CANCELED}>Đã hủy</TabsTrigger>
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
                              onClick={() => handleViewBooking(booking)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {booking.status === BOOKING_STATUSES.UPCOMING && (
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Hủy lịch"
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                onClick={() => handleCancelBooking(booking)}
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

      {/* Dialog xem chi tiết lịch đặt */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết lịch đặt</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dịch vụ</p>
                  <p className="font-medium">{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Chuyên viên</p>
                  <p className="font-medium">{selectedBooking.specialist}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ngày giờ</p>
                  <p className="font-medium">
                    {format(new Date(selectedBooking.date), "dd/MM/yyyy HH:mm")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trạng thái</p>
                  <div className="pt-1">{getStatusBadge(selectedBooking.status)}</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Giá</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(selectedBooking.price)}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">Thông tin thêm</p>
                <p className="text-sm">
                  Vui lòng đến trước 10 phút để làm thủ tục. Nếu bạn cần thay đổi lịch, vui lòng liên hệ trước ít nhất 24 giờ.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận hủy lịch */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận hủy lịch</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn hủy lịch đặt này không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmCancelBooking}>
              Xác nhận hủy lịch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserBookings;
