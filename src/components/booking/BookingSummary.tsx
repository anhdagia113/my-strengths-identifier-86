
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BookingSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tóm Tắt Đặt Lịch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium">Dịch vụ đã chọn</h3>
          <p className="text-muted-foreground">Chưa chọn dịch vụ</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium">Chuyên viên</h3>
          <p className="text-muted-foreground">Chưa chọn chuyên viên</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium">Thời gian</h3>
          <p className="text-muted-foreground">Chưa chọn thời gian</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium">Tổng chi phí dự kiến</h3>
          <p className="text-2xl font-bold text-primary">0 VNĐ</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
