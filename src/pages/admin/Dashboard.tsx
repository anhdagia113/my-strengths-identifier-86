
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Clock, DollarSign, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // This would normally come from an API
  const dashboardData = {
    totalUsers: 195,
    totalServices: 25,
    totalSpecialists: 12,
    totalBookings: 237,
    pendingBookings: 42,
    totalRevenue: 15780000,
    recentBookings: [
      { id: 1, name: "Nguyễn Văn A", service: "Chăm sóc da cơ bản", date: "2023-06-15T09:00:00", status: "Đã hoàn thành" },
      { id: 2, name: "Trần Thị B", service: "Trị mụn chuyên sâu", date: "2023-06-15T11:00:00", status: "Đang chờ" },
      { id: 3, name: "Lê Văn C", service: "Trẻ hóa da", date: "2023-06-16T10:00:00", status: "Đã hoàn thành" },
      { id: 4, name: "Phạm Thị D", service: "Massage mặt", date: "2023-06-16T14:00:00", status: "Đã hủy" },
      { id: 5, name: "Hoàng Văn E", service: "Tẩy trang chuyên sâu", date: "2023-06-17T09:30:00", status: "Đang chờ" },
    ],
    popularServices: [
      { id: 1, name: "Chăm sóc da cơ bản", bookings: 42, revenue: 4200000 },
      { id: 2, name: "Trị mụn chuyên sâu", bookings: 28, revenue: 5600000 },
      { id: 3, name: "Trẻ hóa da", bookings: 30, revenue: 6000000 },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý hệ thống</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Người dùng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +18% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Dịch vụ
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalServices}</div>
            <p className="text-xs text-muted-foreground">
              +5% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Chuyên viên
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalSpecialists}</div>
            <p className="text-xs text-muted-foreground">
              +2 người mới
            </p>
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
            <div className="text-2xl font-bold">{dashboardData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              +12% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dashboardData.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch đặt gần đây</CardTitle>
              <CardDescription>
                Danh sách các lịch đặt mới nhất
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/bookings">Xem tất cả</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.name}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>
                      {new Date(booking.date).toLocaleDateString('vi-VN')} {' '}
                      {new Date(booking.date).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Đã hoàn thành' 
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'Đang chờ'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Dịch vụ phổ biến</CardTitle>
              <CardDescription>
                Dịch vụ được đặt nhiều nhất
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/services">Quản lý dịch vụ</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên dịch vụ</TableHead>
                  <TableHead className="text-right">Số lượt đặt</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.popularServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="text-right">{service.bookings}</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.revenue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-y-2">
              {dashboardData.popularServices.map((service) => (
                <div key={service.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{service.name}</p>
                    <p className="text-sm font-medium">{Math.round((service.bookings / dashboardData.totalBookings) * 100)}%</p>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full" 
                      style={{ width: `${Math.round((service.bookings / dashboardData.totalBookings) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
