
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingData } from "@/pages/Booking";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface BookingSummaryProps {
  bookingData: BookingData;
}

const MultiServiceBookingSummary = ({ bookingData }: BookingSummaryProps) => {
  const totalPrice = bookingData.services?.reduce((sum, service) => sum + service.price, 0) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin đặt lịch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Dịch vụ đã chọn</h3>
          <ul className="space-y-2">
            {bookingData.services && bookingData.services.length > 0 ? (
              bookingData.services.map((service) => (
                <li key={service.id} className="flex justify-between">
                  <span>{service.name}</span>
                  <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}</span>
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">Chưa chọn dịch vụ</li>
            )}
          </ul>
          {totalPrice > 0 && (
            <div className="flex justify-between font-bold mt-2 pt-2 border-t">
              <span>Tổng cộng</span>
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Chuyên viên</h3>
          <p>{bookingData.specialist?.name || "Chưa chọn chuyên viên"}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Thời gian</h3>
          <p>
            {bookingData.date 
              ? `${format(bookingData.date, 'EEEE, dd/MM/yyyy', { locale: vi })}` 
              : "Chưa chọn ngày"
            }
            {bookingData.time ? ` - ${bookingData.time}` : ""}
          </p>
        </div>
        
        {(bookingData.customerName || bookingData.customerPhone || bookingData.customerEmail) && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Thông tin khách hàng</h3>
            {bookingData.customerName && <p className="mb-1">{bookingData.customerName}</p>}
            {bookingData.customerPhone && <p className="mb-1">{bookingData.customerPhone}</p>}
            {bookingData.customerEmail && <p className="mb-1">{bookingData.customerEmail}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MultiServiceBookingSummary;
