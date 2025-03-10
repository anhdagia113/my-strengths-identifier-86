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
  X,
  Plus
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

// Dummy data for bookings (keep existing bookingsData)
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

// Dummy data for services and specialists
const services = [
  { id: "1", name: "Chăm sóc da cơ bản", price: 450000 },
  { id: "2", name: "Trị mụn chuyên sâu", price: 650000 },
  { id: "3", name: "Massage mặt", price: 350000 },
  { id: "4", name: "Tẩy trang chuyên sâu", price: 250000 },
  { id: "5", name: "Trẻ hóa da", price: 800000 },
];

const specialists = [
  { id: "1", name: "Trần Thị B" },
  { id: "2", name: "Phạm Văn D" },
  { id: "3", name: "Ngô Thị F" },
  { id: "4", name: "Lý Thị H" },
  { id: "5", name: "Vũ Văn K" },
];

// Form schema for creating a new booking
const createBookingSchema = z.object({
  customerName: z.string().min(1, "Tên khách hàng là bắt buộc"),
  customerPhone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  service: z.string().min(1, "Vui lòng chọn dịch vụ"),
  specialist: z.string().min(1, "Vui lòng chọn chuyên viên"),
  date: z.date({
    required_error: "Vui lòng chọn ngày",
  }),
  time: z.string().min(1, "Vui lòng chọn giờ"),
});

type CreateBookingFormValues = z.infer<typeof createBookingSchema>;

// Available time slots
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

const AdminBookings = () => {
  const [bookings, setBookings] = useState(bookingsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<(typeof bookingsData)[0] | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Create booking form
  const createBookingForm = useForm<CreateBookingFormValues>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      service: "",
      specialist: "",
      time: "",
    },
  });

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

  const onCreateBookingSubmit = (data: CreateBookingFormValues) => {
    // Create new booking with the form data
    const newBooking = {
      id: (bookings.length + 1).toString(),
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      service: services.find(s => s.id === data.service)?.name || "",
      specialist: specialists.find(s => s.id === data.specialist)?.name || "",
      date: `${format(data.date, "yyyy-MM-dd")}T${data.time}:00`,
      status: "pending",
      price: services.find(s => s.id === data.service)?.price || 0,
    };

    // Add new booking to the list
    setBookings([newBooking, ...bookings]);
    
    // Reset form and close dialog
    createBookingForm.reset();
    setIsCreateDialogOpen(false);
    
    toast.success("Đã tạo lịch đặt mới thành công");
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
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tạo lịch đặt mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo lịch đặt mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin để tạo lịch đặt mới cho khách hàng
              </DialogDescription>
            </DialogHeader>
            <Form {...createBookingForm}>
              <form onSubmit={createBookingForm.handleSubmit(onCreateBookingSubmit)} className="space-y-4">
                <FormField
                  control={createBookingForm.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên khách hàng</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên khách hàng" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={createBookingForm.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số điện thoại" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={createBookingForm.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dịch vụ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn dịch vụ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(service.price)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={createBookingForm.control}
                  name="specialist"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chuyên viên</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn chuyên viên" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialists.map((specialist) => (
                            <SelectItem key={specialist.id} value={specialist.id}>
                              {specialist.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={createBookingForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Ngày</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd/MM/yyyy")
                                ) : (
                                  <span>Chọn ngày</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createBookingForm.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giờ</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giờ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIME_SLOTS.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="submit">Tạo lịch đặt</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
