
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AdminSettings = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "Beauty Spa",
    siteDescription: "Nơi chăm sóc sắc đẹp hoàn hảo",
    contactEmail: "contact@beautyspa.vn",
    contactPhone: "0901234567",
    address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
    enableBooking: true,
    enableRegistration: true,
    maintenanceMode: false,
  });

  const handleSiteSettingChange = (
    key: keyof typeof siteSettings,
    value: string | boolean
  ) => {
    setSiteSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSiteSettings = () => {
    toast.success("Cài đặt trang web đã được lưu");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mật khẩu đã được thay đổi thành công");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt hệ thống</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Tổng quan</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          <TabsTrigger value="backup">Sao lưu & Phục hồi</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt trang web</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Tên trang web</Label>
                  <Input
                    id="site-name"
                    value={siteSettings.siteName}
                    onChange={(e) =>
                      handleSiteSettingChange("siteName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email liên hệ</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={siteSettings.contactEmail}
                    onChange={(e) =>
                      handleSiteSettingChange("contactEmail", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Số điện thoại liên hệ</Label>
                  <Input
                    id="contact-phone"
                    value={siteSettings.contactPhone}
                    onChange={(e) =>
                      handleSiteSettingChange("contactPhone", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <Input
                    id="address"
                    value={siteSettings.address}
                    onChange={(e) =>
                      handleSiteSettingChange("address", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Mô tả trang web</Label>
                <Textarea
                  id="site-description"
                  value={siteSettings.siteDescription}
                  onChange={(e) =>
                    handleSiteSettingChange("siteDescription", e.target.value)
                  }
                />
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-booking" className="text-base">
                      Cho phép đặt lịch
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Người dùng có thể đặt lịch dịch vụ
                    </p>
                  </div>
                  <Switch
                    id="enable-booking"
                    checked={siteSettings.enableBooking}
                    onCheckedChange={(checked) =>
                      handleSiteSettingChange("enableBooking", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-registration" className="text-base">
                      Cho phép đăng ký
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Người dùng mới có thể đăng ký tài khoản
                    </p>
                  </div>
                  <Switch
                    id="enable-registration"
                    checked={siteSettings.enableRegistration}
                    onCheckedChange={(checked) =>
                      handleSiteSettingChange("enableRegistration", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode" className="text-base">
                      Chế độ bảo trì
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Kích hoạt chế độ bảo trì trang web
                    </p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={siteSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleSiteSettingChange("maintenanceMode", checked)
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveSiteSettings} className="mt-4">
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

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Thiết lập bảo mật</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor" className="text-base">
                    Xác thực hai yếu tố
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Tăng cường bảo mật tài khoản
                  </p>
                </div>
                <Switch id="two-factor" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="session-timeout" className="text-base">
                    Thời gian hết phiên
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Tự động đăng xuất sau thời gian không hoạt động
                  </p>
                </div>
                <select className="p-2 border rounded-md" defaultValue="30">
                  <option value="15">15 phút</option>
                  <option value="30">30 phút</option>
                  <option value="60">1 giờ</option>
                  <option value="120">2 giờ</option>
                </select>
              </div>
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

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Sao lưu & Phục hồi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Sao lưu dữ liệu</h3>
                <p className="text-sm text-muted-foreground">
                  Tạo bản sao lưu của tất cả dữ liệu trong hệ thống
                </p>
                <Button>Tạo bản sao lưu</Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Phục hồi dữ liệu</h3>
                <p className="text-sm text-muted-foreground">
                  Phục hồi hệ thống từ bản sao lưu trước đó
                </p>
                <div className="flex space-x-2">
                  <Input type="file" />
                  <Button variant="outline">Phục hồi</Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-red-500">Khu vực nguy hiểm</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-2">
                  Các hành động sau đây không thể hoàn tác, hãy cân nhắc kỹ
                </p>
                <div className="flex space-x-2">
                  <Button variant="destructive">Đặt lại cài đặt</Button>
                  <Button variant="destructive">Xóa tất cả dữ liệu</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
