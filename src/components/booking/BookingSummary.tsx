
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { BookingData } from "@/pages/Booking";

interface BookingSummaryProps {
  bookingData: BookingData;
}

const BookingSummary = ({ bookingData }: BookingSummaryProps) => {
  // Format currency to VND
  const formatCurrency = (amount?: number) => {
    if (!amount) return "0 VNĐ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Format date
  const formatDate = (date?: Date) => {
    if (!date) return "Chưa chọn ngày";
    return format(date, "dd/MM/yyyy");
  };

  // Format time with date
  const formatDateTime = (date?: Date, time?: string) => {
    if (!date || !time) return "Chưa chọn thời gian";
    return `${formatDate(date)} - ${time}`;
  };

  // Get first service (for backward compatibility)
  const primaryService = bookingData.services && bookingData.services.length > 0 
    ? bookingData.services[0] 
    : undefined;

  // Calculate total price
  const totalPrice = bookingData.services?.reduce((sum, service) => sum + service.price, 0) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tóm Tắt Đặt Lịch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">Dịch vụ đã chọn</h3>
          <p className="text-muted-foreground">
            {primaryService ? primaryService.name : "Chưa chọn dịch vụ"}
          </p>
          {bookingData.services && bookingData.services.length > 0 && (
            <p className="text-sm font-medium text-primary">
              {formatCurrency(totalPrice)}
            </p>
          )}
        </div>
        <Separator />
        <div>
          <h3 className="font-medium">Chuyên viên</h3>
          <p className="text-muted-foreground">
            {bookingData.specialist ? bookingData.specialist.name : "Chưa chọn chuyên viên"}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium">Thời gian</h3>
          <p className="text-muted-foreground">
            {formatDateTime(bookingData.date, bookingData.time)}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium">Thông tin khách hàng</h3>
          {bookingData.customerName ? (
            <div className="space-y-1 mt-2">
              <p className="text-sm">{bookingData.customerName}</p>
              <p className="text-sm text-muted-foreground">{bookingData.customerPhone}</p>
              <p className="text-sm text-muted-foreground">{bookingData.customerEmail}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Chưa có thông tin</p>
          )}
        </div>
        <Separator />
        <div>
          <h3 className="font-medium">Tổng chi phí dự kiến</h3>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalPrice)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
