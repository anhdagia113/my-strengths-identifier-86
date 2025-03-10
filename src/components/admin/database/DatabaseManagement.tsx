
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Database, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import DatabaseService from "@/api/services/database.service";

export function DatabaseManagement() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSeedDatabase = async () => {
    try {
      setIsLoading(true);
      const result = await DatabaseService.seedInitialData();
      
      if (result.success) {
        toast.success("Dữ liệu mẫu đã được tạo thành công!");
      } else {
        toast.error(`Lỗi khi tạo dữ liệu mẫu: ${result.message}`);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tạo dữ liệu mẫu.");
      console.error("Seed database error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <span>Quản lý cơ sở dữ liệu</span>
        </CardTitle>
        <CardDescription>
          Tạo dữ liệu mẫu và quản lý cơ sở dữ liệu của hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border p-4">
          <div className="flex items-start space-x-4">
            <div className="mt-0.5">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">Tạo dữ liệu mẫu</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tạo dữ liệu mẫu cho hệ thống bao gồm các phương thức thanh toán và lịch sử giao dịch.
                Các dữ liệu đã tồn tại sẽ bị xóa và thay thế bằng dữ liệu mẫu mới.
              </p>
              <Button 
                variant="outline" 
                className="mt-3"
                onClick={handleSeedDatabase}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Tạo dữ liệu mẫu"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-4 bg-amber-50">
          <div className="flex items-start space-x-4">
            <div className="mt-0.5">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium">Lưu ý quan trọng</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Việc thêm dữ liệu mẫu sẽ xóa và tạo lại dữ liệu hiện tại. Không thực hiện thao tác này
                trên môi trường sản xuất hoặc khi đã có dữ liệu thực từ người dùng.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        Tính năng này chỉ có sẵn cho người dùng có quyền quản trị hệ thống.
      </CardFooter>
    </Card>
  );
}
