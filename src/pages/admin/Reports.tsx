
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  BarChart3, 
  Calendar as CalendarIcon, 
  Download, 
  FileText, 
  FilePlus, 
  Users, 
  DollarSign, 
  CalendarDays, 
  BarChart2,
  CircleHelp
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { utils, writeFile } from "xlsx";

// Mock data for reports
const revenueData = [
  { name: 'T1', revenue: 5000000, date: '2023-01-15' },
  { name: 'T2', revenue: 7200000, date: '2023-02-15' },
  { name: 'T3', revenue: 6800000, date: '2023-03-15' },
  { name: 'T4', revenue: 9200000, date: '2023-04-15' },
  { name: 'T5', revenue: 8700000, date: '2023-05-15' },
  { name: 'T6', revenue: 12000000, date: '2023-06-15' },
  { name: 'T7', revenue: 10500000, date: '2023-07-15' },
  { name: 'T8', revenue: 9800000, date: '2023-08-15' },
  { name: 'T9', revenue: 11200000, date: '2023-09-15' },
  { name: 'T10', revenue: 13500000, date: '2023-10-15' },
  { name: 'T11', revenue: 12800000, date: '2023-11-15' },
  { name: 'T12', revenue: 15000000, date: '2023-12-15' },
];

const serviceData = [
  { name: 'Chăm sóc da', value: 35, date: '2023-06-15' },
  { name: 'Trị liệu', value: 25, date: '2023-06-15' },
  { name: 'Massage', value: 20, date: '2023-06-15' },
  { name: 'Tẩy trang', value: 15, date: '2023-06-15' },
  { name: 'Khác', value: 5, date: '2023-06-15' },
];

const bookingData = [
  { 
    id: "B123456",
    customerName: "Nguyễn Văn A", 
    service: "Chăm sóc da chuyên sâu", 
    date: subDays(new Date(), 2),
    amount: 450000, 
    status: "completed"
  },
  { 
    id: "B123457",
    customerName: "Trần Thị B", 
    service: "Trị liệu mụn", 
    date: subDays(new Date(), 3),
    amount: 650000, 
    status: "completed"
  },
  { 
    id: "B123458",
    customerName: "Lê Văn C", 
    service: "Massage mặt", 
    date: subDays(new Date(), 4),
    amount: 350000, 
    status: "cancelled"
  },
  { 
    id: "B123459",
    customerName: "Phạm Thị D", 
    service: "Tẩy trang chuyên sâu", 
    date: subDays(new Date(), 5),
    amount: 250000, 
    status: "completed"
  },
  { 
    id: "B123460",
    customerName: "Hoàng Văn E", 
    service: "Chăm sóc da cơ bản", 
    date: subDays(new Date(), 6),
    amount: 350000, 
    status: "completed"
  },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminReports = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const [filteredRevenueData, setFilteredRevenueData] = useState(revenueData);
  const [filteredServiceData, setFilteredServiceData] = useState(serviceData);
  const [filteredBookingData, setFilteredBookingData] = useState(bookingData);

  // Apply date filtering when dateRange changes
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      // Filter revenue data
      const filteredRevenue = revenueData.filter(item => {
        const itemDate = parseISO(item.date);
        return isWithinInterval(itemDate, {
          start: dateRange.from,
          end: dateRange.to
        });
      });
      setFilteredRevenueData(filteredRevenue.length > 0 ? filteredRevenue : revenueData);

      // Filter service data
      const filteredService = serviceData.filter(item => {
        const itemDate = parseISO(item.date);
        return isWithinInterval(itemDate, {
          start: dateRange.from,
          end: dateRange.to
        });
      });
      setFilteredServiceData(filteredService.length > 0 ? filteredService : serviceData);

      // Filter booking data
      const filteredBooking = bookingData.filter(item => 
        isWithinInterval(item.date, {
          start: dateRange.from,
          end: dateRange.to
        })
      );
      setFilteredBookingData(filteredBooking.length > 0 ? filteredBooking : bookingData);
    }
  }, [dateRange]);

  const handleExportExcel = (reportType: string) => {
    let dataToExport: any[] = [];
    let sheetName = '';
    let fileName = '';

    switch (reportType) {
      case 'revenue':
        sheetName = 'Doanh thu';
        fileName = `bao-cao-doanh-thu-${format(new Date(), 'dd-MM-yyyy')}`;
        dataToExport = filteredRevenueData.map(item => ({
          'Tháng': item.name,
          'Doanh Thu (VNĐ)': item.revenue.toLocaleString('vi-VN')
        }));
        break;
      case 'service':
        sheetName = 'Dịch vụ';
        fileName = `bao-cao-dich-vu-${format(new Date(), 'dd-MM-yyyy')}`;
        dataToExport = filteredServiceData.map(item => ({
          'Dịch vụ': item.name,
          'Tỷ lệ (%)': item.value
        }));
        break;
      case 'booking':
        sheetName = 'Đặt lịch';
        fileName = `bao-cao-dat-lich-${format(new Date(), 'dd-MM-yyyy')}`;
        dataToExport = filteredBookingData.map(item => ({
          'Mã đặt lịch': item.id,
          'Khách hàng': item.customerName,
          'Dịch vụ': item.service,
          'Ngày': format(item.date, 'dd/MM/yyyy'),
          'Số tiền (VNĐ)': item.amount.toLocaleString('vi-VN'),
          'Trạng thái': item.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'
        }));
        break;
      default:
        toast.error('Loại báo cáo không hợp lệ');
        return;
    }

    // Create workbook and worksheet
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(dataToExport);

    // Add worksheet to workbook
    utils.book_append_sheet(workbook, worksheet, sheetName);

    // Write workbook and download
    writeFile(workbook, `${fileName}.xlsx`);
    
    toast.success(`Đã xuất báo cáo ${sheetName} thành công!`);
  };

  // Export to CSV
  const handleExportCSV = (reportType: string) => {
    let dataToExport: any[] = [];
    let fileName = '';

    switch (reportType) {
      case 'revenue':
        fileName = `bao-cao-doanh-thu-${format(new Date(), 'dd-MM-yyyy')}`;
        dataToExport = filteredRevenueData.map(item => ({
          'Tháng': item.name,
          'Doanh Thu (VNĐ)': item.revenue.toLocaleString('vi-VN')
        }));
        break;
      case 'service':
        fileName = `bao-cao-dich-vu-${format(new Date(), 'dd-MM-yyyy')}`;
        dataToExport = filteredServiceData.map(item => ({
          'Dịch vụ': item.name,
          'Tỷ lệ (%)': item.value
        }));
        break;
      case 'booking':
        fileName = `bao-cao-dat-lich-${format(new Date(), 'dd-MM-yyyy')}`;
        dataToExport = filteredBookingData.map(item => ({
          'Mã đặt lịch': item.id,
          'Khách hàng': item.customerName,
          'Dịch vụ': item.service,
          'Ngày': format(item.date, 'dd/MM/yyyy'),
          'Số tiền (VNĐ)': item.amount.toLocaleString('vi-VN'),
          'Trạng thái': item.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'
        }));
        break;
      default:
        toast.error('Loại báo cáo không hợp lệ');
        return;
    }

    // Create workbook and worksheet
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(dataToExport);

    // Add worksheet to workbook
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write workbook and download as CSV
    writeFile(workbook, `${fileName}.csv`, { bookType: 'csv' });
    
    toast.success(`Đã xuất báo cáo CSV thành công!`);
  };

  // Manually create a simple PDF-like export
  const handleExportPDF = (reportType: string) => {
    // In a real application, you would use a library like jsPDF
    // For now, just show a toast
    toast.success(`Tính năng xuất PDF đang được phát triển`);
  };

  const handleDateRangeApply = () => {
    toast.success(`Đã áp dụng bộ lọc từ ngày ${format(dateRange.from, 'dd/MM/yyyy')} đến ngày ${dateRange.to ? format(dateRange.to, 'dd/MM/yyyy') : format(dateRange.from, 'dd/MM/yyyy')}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Báo cáo thống kê</h1>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                      {format(dateRange.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Chọn khoảng thời gian</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
              <div className="p-3 border-t border-border">
                <Button size="sm" className="w-full" onClick={handleDateRangeApply}>
                  Áp dụng
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">
            <BarChart3 className="h-4 w-4 mr-2" />
            Doanh thu
          </TabsTrigger>
          <TabsTrigger value="service">
            <BarChart2 className="h-4 w-4 mr-2" />
            Dịch vụ
          </TabsTrigger>
          <TabsTrigger value="booking">
            <CalendarDays className="h-4 w-4 mr-2" />
            Đặt lịch
          </TabsTrigger>
          <TabsTrigger value="custom">
            <FilePlus className="h-4 w-4 mr-2" />
            Báo cáo tùy chỉnh
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng doanh thu
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(filteredRevenueData.reduce((sum, item) => sum + item.revenue, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% so với năm trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Người dùng mới
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 trong tháng này
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Đặt lịch mới
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{filteredBookingData.length}</div>
                <p className="text-xs text-muted-foreground">
                  +19% so với tháng trước
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Doanh thu trung bình
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                    .format(filteredRevenueData.length > 0 
                      ? filteredRevenueData.reduce((sum, item) => sum + item.revenue, 0) / filteredRevenueData.length 
                      : 0
                    )}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12% so với tháng trước
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>Biểu đồ doanh thu năm {new Date().getFullYear()}</CardDescription>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleExportExcel('revenue')}>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('revenue')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Xuất CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('revenue')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Xuất PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredRevenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => {
                        return `${(value / 1000000).toFixed(0)}Tr`;
                      }}
                    />
                    <Tooltip 
                      formatter={(value: any) => {
                        return [
                          new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value),
                          "Doanh thu"
                        ];
                      }}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích dịch vụ</CardTitle>
              <CardDescription>Tỷ lệ sử dụng các dịch vụ</CardDescription>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleExportExcel('service')}>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('service')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Xuất CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('service')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Xuất PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredServiceData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {filteredServiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value}%`, 'Tỷ lệ']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Báo cáo đặt lịch</CardTitle>
              <CardDescription>Danh sách đặt lịch trong khoảng thời gian đã chọn</CardDescription>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleExportExcel('booking')}>
                  <Download className="mr-2 h-4 w-4" />
                  Xuất Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('booking')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Xuất CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('booking')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Xuất PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đặt lịch</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookingData.length > 0 ? (
                    filteredBookingData.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.customerName}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{format(booking.date, "dd/MM/yyyy")}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                            .format(booking.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={booking.status === 'completed' ? 'default' : 'destructive'}>
                            {booking.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        Không tìm thấy giao dịch nào trong khoảng thời gian đã chọn
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Tạo báo cáo tùy chỉnh</CardTitle>
              <CardDescription>Xây dựng báo cáo theo yêu cầu cụ thể của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="report-type" className="text-sm font-medium">Loại báo cáo</label>
                    <select id="report-type" className="w-full p-2 border rounded-md">
                      <option value="revenue">Doanh thu</option>
                      <option value="service">Dịch vụ</option>
                      <option value="booking">Đặt lịch</option>
                      <option value="user">Người dùng</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="report-format" className="text-sm font-medium">Định dạng xuất</label>
                    <select id="report-format" className="w-full p-2 border rounded-md">
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Chọn dữ liệu hiển thị</label>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-date" defaultChecked />
                      <label htmlFor="field-date">Ngày tháng</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-service" defaultChecked />
                      <label htmlFor="field-service">Dịch vụ</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-revenue" defaultChecked />
                      <label htmlFor="field-revenue">Doanh thu</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-customer" defaultChecked />
                      <label htmlFor="field-customer">Khách hàng</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-staff" defaultChecked />
                      <label htmlFor="field-staff">Nhân viên</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="field-status" defaultChecked />
                      <label htmlFor="field-status">Trạng thái</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bộ lọc</label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="filter-date-from" className="text-xs">Từ ngày</label>
                      <Input 
                        type="date" 
                        id="filter-date-from" 
                        defaultValue={format(subDays(new Date(), 30), "yyyy-MM-dd")} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="filter-date-to" className="text-xs">Đến ngày</label>
                      <Input 
                        type="date" 
                        id="filter-date-to" 
                        defaultValue={format(new Date(), "yyyy-MM-dd")} 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="report-title" className="text-sm font-medium">Tiêu đề báo cáo</label>
                  <Input 
                    type="text" 
                    id="report-title" 
                    placeholder="Nhập tiêu đề báo cáo" 
                    defaultValue={`Báo cáo tổng hợp - ${format(new Date(), 'dd/MM/yyyy')}`}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button onClick={() => toast.success("Đã tạo báo cáo tùy chỉnh!")}>
                    <Download className="mr-2 h-4 w-4" />
                    Tạo và tải báo cáo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
