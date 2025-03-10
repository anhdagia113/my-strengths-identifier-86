
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatabaseManagement } from "@/components/admin/database/DatabaseManagement";
import { Settings as SettingsIcon, Database, Shield } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <SettingsIcon className="mr-2 h-5 w-5" />
        <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="w-full bg-card mb-4">
          <TabsTrigger value="general" className="flex-1">
            Cài đặt chung
          </TabsTrigger>
          <TabsTrigger value="database" className="flex-1">
            Cơ sở dữ liệu
          </TabsTrigger>
          <TabsTrigger value="security" className="flex-1">
            Bảo mật
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin hệ thống</CardTitle>
              <CardDescription>
                Xem và quản lý thông tin cơ bản về hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="font-medium">Phiên bản</h3>
                  <p className="text-sm text-muted-foreground">1.0.0</p>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-medium">Thời gian hoạt động</h3>
                  <p className="text-sm text-muted-foreground">30 ngày</p>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-medium">Liên hệ hỗ trợ</h3>
                  <p className="text-sm text-muted-foreground">support@beautysalon.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <DatabaseManagement />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Bảo mật</span>
              </CardTitle>
              <CardDescription>
                Cài đặt bảo mật cho hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="font-medium">Chính sách mật khẩu</h3>
                  <p className="text-sm text-muted-foreground">
                    Yêu cầu mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường,
                    số và ký tự đặc biệt.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-medium">Xác thực hai yếu tố</h3>
                  <p className="text-sm text-muted-foreground">
                    Không bắt buộc, người dùng có thể bật tính năng này trong phần cài đặt tài khoản.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="font-medium">Thời gian hết hạn phiên đăng nhập</h3>
                  <p className="text-sm text-muted-foreground">
                    24 giờ kể từ lần đăng nhập gần nhất
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
