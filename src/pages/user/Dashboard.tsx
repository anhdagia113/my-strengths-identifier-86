
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserDashboard = () => {
  // This would normally come from an API
  const userDashboardData = {
    upcomingBookings: [
      { id: 1, service: "Chăm sóc da cơ bản", specialist: "Nguyễn Thị Mai", date: "2023-07-15T09:00:00", status: "Đang chờ" },
      { id: 2, service: "Trị mụn chuyên sâu", specialist: "Trần Văn Minh", date: "2023-07-22T11:00:00", status: "Đang chờ" },
    ],
    pastBookings: [
      { id: 3, service: "Trẻ hóa da", specialist: "Lê Thị Hương", date: "2023-06-16T10:00:00", status: "Đã hoàn thành" },
      { id: 4, service: "Massage mặt", specialist: "Phạm Thanh Hà", date: "2023-06-05T14:00:00", status: "Đã hoàn thành" },
      { id: 5, service: "Tẩy trang chuyên sâu", specialist: "Ngô Quốc Anh", date: "2023-05-28T09:30:00", status: "Đã hủy" },
    ],
    recommendedServices: [
      { id: 1, name: "Chăm sóc da cơ bản", price: 300000, description: "Làm sạch và dưỡng ẩm cho da" },
      { id: 2, name: "Trị mụn chuyên sâu", price: 500000, description: "Điều trị mụn và vết thâm hiệu quả" },
      { id: 3, name: "Massage mặt", price: 350000, description: "Thư giãn và cải thiện tuần hoàn máu" },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tổng quan</h1>
        <Button asChild>
          <Link to="/booking">Đặt lịch mới</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Lịch sắp tới
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userDashboardData.upcomingBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Lịch hẹn trong 30 ngày tới
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Lịch đã đặt
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userDashboardData.pastBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              Lịch hẹn đã hoàn thành
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Dịch vụ đề xuất
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userDashboardData.recommendedServices.length}</div>
            <p className="text-xs text-muted-foreground">
              Dựa trên sở thích của bạn
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch sắp tới</CardTitle>
              <CardDescription>
                Các lịch hẹn sắp tới của bạn
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">Quản lý lịch hẹn</Button>
          </CardHeader>
          <CardContent>
            {userDashboardData.upcomingBookings.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>Chuyên viên</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userDashboardData.upcomingBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.service}</TableCell>
                      <TableCell>{booking.specialist}</TableCell>
                      <TableCell>
                        {new Date(booking.date).toLocaleDateString('vi-VN')} {' '}
                        {new Date(booking.date).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {booking.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Bạn không có lịch hẹn nào sắp tới</p>
                <Button variant="outline" className="mt-2" asChild>
                  <Link to="/booking">Đặt lịch ngay</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Lịch sử đặt lịch</CardTitle>
              <CardDescription>
                Các lịch hẹn đã hoàn thành
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead>Chuyên viên</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDashboardData.pastBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.service}</TableCell>
                    <TableCell>{booking.specialist}</TableCell>
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
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dịch vụ đề xuất cho bạn</CardTitle>
          <CardDescription>
            Dựa trên lịch sử đặt lịch của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userDashboardData.recommendedServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{service.description}</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                  </p>
                </CardContent>
                <div className="px-6 pb-4">
                  <Button className="w-full" asChild>
                    <Link to={`/booking?service=${service.id}`}>Đặt lịch</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
