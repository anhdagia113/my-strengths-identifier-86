
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const UserSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    promotional: false,
  });

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveNotifications = () => {
    toast.success("Cài đặt thông báo đã được lưu");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mật khẩu đã được thay đổi thành công");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
      </div>

      <Tabs defaultValue="notifications">
        <TabsList className="mb-4">
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-base">
                    Thông báo qua email
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo về lịch hẹn qua email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.email}
                  onCheckedChange={() => handleNotificationChange("email")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications" className="text-base">
                    Thông báo qua SMS
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo về lịch hẹn qua tin nhắn SMS
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notificationSettings.sms}
                  onCheckedChange={() => handleNotificationChange("sms")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotional-notifications" className="text-base">
                    Thông báo khuyến mãi
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông tin về khuyến mãi và dịch vụ mới
                  </p>
                </div>
                <Switch
                  id="promotional-notifications"
                  checked={notificationSettings.promotional}
                  onCheckedChange={() => handleNotificationChange("promotional")}
                />
              </div>

              <Button onClick={handleSaveNotifications} className="mt-4">
                Lưu thay đổi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Thay đổi mật khẩu</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input type="password" id="current-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input type="password" id="new-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                  <Input type="password" id="confirm-password" />
                </div>
                <Button type="submit" className="mt-2">
                  Cập nhật mật khẩu
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Giao diện</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Chế độ hiển thị</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    Sáng
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Tối
                  </Button>
                  <Button variant="default" className="justify-start">
                    Hệ thống
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ngôn ngữ</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="default" className="justify-start">
                    Tiếng Việt
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Tiếng Anh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
