
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, Save, Shield, Bell, Globe, Info, AlertCircle } from "lucide-react";

export default function UserSettings() {
  const handleBackupData = () => {
    // Create a downloadable JSON file with user data
    const userData = {
      profile: {
        name: "Nguyễn Thị Hoa",
        email: "nguyenthihoa@example.com",
        phone: "0901234567"
      },
      preferences: {
        notifications: true,
        language: "vi"
      },
      // Add more user data as needed
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `user-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast.success("Đã tải xuống bản sao lưu dữ liệu");
  };

  const handleSaveSettings = () => {
    toast.success("Cài đặt đã được lưu thành công!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cài đặt tài khoản</h3>
        <p className="text-sm text-muted-foreground">
          Quản lý cài đặt tài khoản và tùy chọn
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription>
                Quản lý thông tin hiển thị và tùy chọn ngôn ngữ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Tên hiển thị</Label>
                <Input id="display-name" defaultValue="Nguyễn Thị Hoa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <select id="language" className="w-full p-2 border rounded-md" defaultValue="vi">
                  <option value="vi">Tiếng Việt</option>
                  <option value="en">Tiếng Anh</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-profile">Hồ sơ công khai</Label>
                  <div className="text-sm text-muted-foreground">
                    Cho phép người khác xem thông tin hồ sơ của bạn
                  </div>
                </div>
                <Switch id="public-profile" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông báo</CardTitle>
              <CardDescription>
                Tùy chỉnh cách bạn nhận thông báo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Thông báo qua email</Label>
                  <div className="text-sm text-muted-foreground">
                    Nhận thông báo qua email
                  </div>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">Thông báo qua SMS</Label>
                  <div className="text-sm text-muted-foreground">
                    Nhận thông báo qua tin nhắn SMS
                  </div>
                </div>
                <Switch id="sms-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="app-notifications">Thông báo trên ứng dụng</Label>
                  <div className="text-sm text-muted-foreground">
                    Hiển thị thông báo trên ứng dụng
                  </div>
                </div>
                <Switch id="app-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Email quảng cáo</Label>
                  <div className="text-sm text-muted-foreground">
                    Nhận email về khuyến mãi và dịch vụ mới
                  </div>
                </div>
                <Switch id="marketing-emails" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật</CardTitle>
              <CardDescription>
                Quản lý cài đặt bảo mật tài khoản
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Xác thực hai yếu tố</Label>
                  <div className="text-sm text-muted-foreground">
                    Tăng cường bảo mật với xác thực hai yếu tố
                  </div>
                </div>
                <Switch id="two-factor" />
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Lưu ý</AlertTitle>
                <AlertDescription>
                  Việc thay đổi mật khẩu sẽ yêu cầu bạn đăng nhập lại trên tất cả các thiết bị.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={() => toast.success("Mật khẩu đã được cập nhật thành công!")}>
                Cập nhật mật khẩu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Nâng cao</CardTitle>
              <CardDescription>
                Cài đặt nâng cao và quản lý dữ liệu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sao lưu dữ liệu</Label>
                <div className="text-sm text-muted-foreground">
                  Tải xuống bản sao lưu dữ liệu của bạn
                </div>
                <Button className="mt-2" variant="outline" onClick={handleBackupData}>
                  <Download className="mr-2 h-4 w-4" />
                  Tải xuống bản sao lưu
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Xóa tài khoản</Label>
                <div className="text-sm text-muted-foreground">
                  Xóa vĩnh viễn tài khoản và tất cả dữ liệu của bạn
                </div>
                <Button className="mt-2" variant="destructive">
                  Xóa tài khoản
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
