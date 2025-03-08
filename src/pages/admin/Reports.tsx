import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingDown,
  Download,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const dailyData = [
  { name: "T2", bookings: 10, revenue: 1500000 },
  { name: "T3", bookings: 15, revenue: 2200000 },
  { name: "T4", bookings: 13, revenue: 1900000 },
  { name: "T5", bookings: 17, revenue: 2500000 },
  { name: "T6", bookings: 21, revenue: 3100000 },
  { name: "T7", bookings: 29, revenue: 4300000 },
  { name: "CN", bookings: 12, revenue: 1800000 },
];

const monthlyData = [
  { name: "Tháng 1", bookings: 80, revenue: 12000000 },
  { name: "Tháng 2", bookings: 95, revenue: 14250000 },
  { name: "Tháng 3", bookings: 120, revenue: 18000000 },
  { name: "Tháng 4", bookings: 105, revenue: 15750000 },
  { name: "Tháng 5", bookings: 115, revenue: 17250000 },
  { name: "Tháng 6", bookings: 140, revenue: 21000000 },
];

const pieData = [
  { name: "Chăm sóc da cơ bản", value: 30 },
  { name: "Trị mụn chuyên sâu", value: 25 },
  { name: "Trẻ hóa da", value: 20 },
  { name: "Massage mặt", value: 15 },
  { name: "Tẩy trang chuyên sâu", value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Reports = () => {
  const [isNewReportDialogOpen, setIsNewReportDialogOpen] = useState(false);
  
  const generateExcel = (type: string) => {
    // In a real application, this would generate and download an Excel file
    // For now, we'll simulate the process with a toast notification
    const reportTypes = {
      daily: "báo cáo theo ngày",
      monthly: "báo cáo theo tháng",
      services: "báo cáo theo dịch vụ"
    };
    
    toast.success(`Đã xuất ${reportTypes[type as keyof typeof reportTypes]} dưới dạng Excel`);
  };
  
  const handleCreateNewReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would collect form data and generate a custom report
    toast.success("Đã tạo báo cáo mới thành công");
    setIsNewReportDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Báo cáo & Thống kê</h1>
        <div className="space-x-2">
          <Dialog open={isNewReportDialogOpen} onOpenChange={setIsNewReportDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <BarChartIcon className="mr-2 h-4 w-4" />
                Tạo báo cáo mới
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo báo cáo mới</DialogTitle>
                <DialogDescription>
                  Tùy chỉnh báo cáo theo nhu cầu của bạn
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateNewReport} className="space-y-4">
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Tên báo cáo</Label>
                    <Input id="report-name" placeholder="Báo cáo tháng 7/2023" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-type">Loại báo cáo</Label>
                    <Select defaultValue="revenue">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại báo cáo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Doanh thu</SelectItem>
                        <SelectItem value="bookings">Lịch đặt</SelectItem>
                        <SelectItem value="services">Dịch vụ</SelectItem>
                        <SelectItem value="customers">Khách hàng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Từ ngày</Label>
                      <Input id="start-date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">Đến ngày</Label>
                      <Input id="end-date" type="date" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="report-format">Định dạng</Label>
                    <Select defaultValue="excel">
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn định dạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Tạo báo cáo</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng doanh thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(98350000)}
            </div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12.5% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Lịch đặt
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">655</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+8.2% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng mới
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+5.1% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tỷ lệ hủy lịch
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5%</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-1.2% so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Theo ngày</TabsTrigger>
          <TabsTrigger value="monthly">Theo tháng</TabsTrigger>
          <TabsTrigger value="services">Theo dịch vụ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Thống kê trong tuần</CardTitle>
                <CardDescription>
                  Biểu đồ lịch đặt và doanh thu theo ngày trong tuần
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => generateExcel("daily")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Xuất Excel
              </Button>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === "revenue") {
                        return [new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value as number), "Doanh thu"];
                      }
                      return [value, name === "bookings" ? "Lịch đặt" : name];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="bookings" name="Lịch đặt" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="revenue" name="Doanh thu" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Thống kê theo tháng</CardTitle>
                <CardDescription>
                  Biểu đồ lịch đặt và doanh thu theo tháng trong năm
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => generateExcel("monthly")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Xuất Excel
              </Button>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === "revenue") {
                        return [new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value as number), "Doanh thu"];
                      }
                      return [value, name === "bookings" ? "Lịch đặt" : name];
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="bookings" name="Lịch đặt" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="revenue" name="Doanh thu" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Phân bổ dịch vụ</CardTitle>
                <CardDescription>
                  Biểu đồ phân bổ lịch đặt theo dịch vụ
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => generateExcel("services")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Xuất Excel
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dịch vụ</TableHead>
                        <TableHead className="text-right">Số lượt đặt</TableHead>
                        <TableHead className="text-right">Doanh thu</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Chăm sóc da cơ bản</TableCell>
                        <TableCell className="text-right">125</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(18750000)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Trị mụn chuyên sâu</TableCell>
                        <TableCell className="text-right">104</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20800000)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Trẻ hóa da</TableCell>
                        <TableCell className="text-right">83</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(16600000)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Massage mặt</TableCell>
                        <TableCell className="text-right">62</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(9300000)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Tẩy trang chuyên sâu</TableCell>
                        <TableCell className="text-right">42</TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(6300000)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
