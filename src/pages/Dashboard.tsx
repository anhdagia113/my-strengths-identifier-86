
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
  // This would normally come from an API
  const dashboardData = {
    totalBookings: 237,
    pendingBookings: 42,
    totalCustomers: 195,
    totalRevenue: 15780000,
    recentBookings: [
      { id: 1, name: "Nguyễn Văn A", service: "Chăm sóc da cơ bản", date: "2023-06-15T09:00:00" },
      { id: 2, name: "Trần Thị B", service: "Trị mụn chuyên sâu", date: "2023-06-15T11:00:00" },
      { id: 3, name: "Lê Văn C", service: "Trẻ hóa da", date: "2023-06-16T10:00:00" },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số lịch đặt
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
              Lịch đặt chờ xử lý
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.pendingBookings}</div>
            <p className="text-xs text-muted-foreground">
              +4% so với tháng trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Khách hàng
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +18% so với tháng trước
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
          <CardHeader>
            <CardTitle>Lịch đặt gần đây</CardTitle>
            <CardDescription>
              Danh sách các lịch đặt mới nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentBookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{booking.name}</p>
                    <p className="text-sm text-muted-foreground">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {new Date(booking.date).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.date).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Thống kê dịch vụ</CardTitle>
            <CardDescription>
              Số lượng đặt lịch theo dịch vụ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Chăm sóc da cơ bản</p>
                  <p className="text-sm font-medium">42%</p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Trị mụn chuyên sâu</p>
                  <p className="text-sm font-medium">28%</p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Trẻ hóa da</p>
                  <p className="text-sm font-medium">30%</p>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
