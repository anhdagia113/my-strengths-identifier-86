
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle,
  Settings,
  FileDown,
  FileUp,
  RefreshCcw,
  DatabaseBackup,
  Languages,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  Lock,
  Save,
  X
} from "lucide-react";
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
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "noreply@beautyspa.vn",
    smtpPassword: "●●●●●●●●●●"
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);

  const handleSiteSettingChange = (
    key: keyof typeof siteSettings,
    value: string | boolean
  ) => {
    setSiteSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSiteSettings = () => {
    toast.success("Cài đặt trang web đã được lưu");
  };

  const handleSaveEmailSettings = () => {
    toast.success("Cài đặt email đã được lưu");
  };

  const handleBackupData = () => {
    toast.success("Bản sao lưu đã được tạo thành công");
  };

  const handleResetSettings = () => {
    toast.success("Cài đặt đã được đặt lại về mặc định");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (!passwordData.current) {
      toast.error("Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    
    if (passwordData.new !== passwordData.confirm) {
      toast.error("Mật khẩu mới không khớp");
      return;
    }
    
    toast.success("Mật khẩu đã được thay đổi thành công");
    
    // Reset form
    setPasswordData({
      current: '',
      new: '',
      confirm: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt hệ thống</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Tổng quan</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          <TabsTrigger value="backup">Sao lưu & Phục hồi</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt trang web</CardTitle>
              <CardDescription>
                Thiết lập thông tin cơ bản cho trang web
              </CardDescription>
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

              <Button onClick={handleSaveSiteSettings} className="mt-4 gap-2">
                <Save size={16} />
                Lưu thay đổi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt email</CardTitle>
              <CardDescription>
                Cấu hình SMTP server để gửi email thông báo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input
                    id="smtp-host"
                    value={siteSettings.smtpHost}
                    onChange={(e) => handleSiteSettingChange("smtpHost", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={siteSettings.smtpPort}
                    onChange={(e) => handleSiteSettingChange("smtpPort", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">SMTP Username</Label>
                  <Input
                    id="smtp-user"
                    value={siteSettings.smtpUser}
                    onChange={(e) => handleSiteSettingChange("smtpUser", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <div className="relative">
                    <Input
                      id="smtp-password"
                      type={showSmtpPassword ? "text" : "password"}
                      value={siteSettings.smtpPassword}
                      onChange={(e) => handleSiteSettingChange("smtpPassword", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showSmtpPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={() => toast.success("Email gửi thử thành công!")}>
                  Gửi email thử
                </Button>
                <Button onClick={handleSaveEmailSettings} className="gap-2">
                  <Save size={16} />
                  Lưu cài đặt
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Thay đổi mật khẩu</CardTitle>
              <CardDescription>
                Cập nhật mật khẩu quản trị viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input 
                    type="password" 
                    id="current-password" 
                    value={passwordData.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input 
                    type="password" 
                    id="new-password" 
                    value={passwordData.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                  <Input 
                    type="password" 
                    id="confirm-password" 
                    value={passwordData.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  />
                </div>
                <Button type="submit" className="mt-2 gap-2">
                  <Lock size={16} />
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

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="login-attempts" className="text-base">
                    Giới hạn đăng nhập thất bại
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Khóa tài khoản sau nhiều lần đăng nhập thất bại
                  </p>
                </div>
                <select className="p-2 border rounded-md" defaultValue="5">
                  <option value="3">3 lần</option>
                  <option value="5">5 lần</option>
                  <option value="10">10 lần</option>
                </select>
              </div>

              <Button className="gap-2">
                <Shield size={16} />
                Lưu thiết lập bảo mật
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Giao diện</CardTitle>
              <CardDescription>
                Tùy chỉnh giao diện và ngôn ngữ hệ thống
              </CardDescription>
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

              <div className="space-y-2">
                <Label>Màu chủ đạo</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="h-10 bg-purple-500 rounded-md cursor-pointer border-2 border-transparent hover:border-gray-400"></div>
                  <div className="h-10 bg-blue-500 rounded-md cursor-pointer border-2 border-transparent hover:border-gray-400"></div>
                  <div className="h-10 bg-green-500 rounded-md cursor-pointer border-2 border-transparent hover:border-gray-400"></div>
                  <div className="h-10 bg-pink-500 rounded-md cursor-pointer border-2 border-gray-400 hover:border-gray-600"></div>
                </div>
              </div>

              <Button className="mt-4 gap-2">
                <Settings size={16} />
                Lưu cài đặt giao diện
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Sao lưu & Phục hồi</CardTitle>
              <CardDescription>
                Tạo bản sao lưu hoặc khôi phục dữ liệu từ bản sao lưu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Sao lưu dữ liệu</h3>
                <p className="text-sm text-muted-foreground">
                  Tạo bản sao lưu của tất cả dữ liệu trong hệ thống
                </p>
                <div className="flex items-center gap-4">
                  <Button onClick={handleBackupData} className="gap-2">
                    <DatabaseBackup className="h-4 w-4" />
                    Tạo bản sao lưu
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <FileDown className="h-4 w-4" />
                    Tải xuống bản sao lưu
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Phục hồi dữ liệu</h3>
                <p className="text-sm text-muted-foreground">
                  Phục hồi hệ thống từ bản sao lưu trước đó
                </p>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input type="file" className="border p-2" />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <FileUp className="h-4 w-4" />
                    Phục hồi
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Bản sao lưu gần đây</h3>
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-3 flex justify-between items-center">
                    <span className="font-medium">Tên file</span>
                    <span className="font-medium">Ngày tạo</span>
                  </div>
                  <div className="divide-y">
                    <div className="p-3 flex justify-between items-center hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <DatabaseBackup className="h-4 w-4 text-blue-500" />
                        <span>backup_20230915_120000.zip</span>
                      </div>
                      <Badge variant="outline">15/09/2023 12:00</Badge>
                    </div>
                    <div className="p-3 flex justify-between items-center hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <DatabaseBackup className="h-4 w-4 text-blue-500" />
                        <span>backup_20230908_093045.zip</span>
                      </div>
                      <Badge variant="outline">08/09/2023 09:30</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-red-500 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Khu vực nguy hiểm
                </h3>
                <p className="text-sm text-muted-foreground mt-1 mb-2">
                  Các hành động sau đây không thể hoàn tác, hãy cân nhắc kỹ
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-red-200 text-red-500 hover:bg-red-50 gap-2" onClick={handleResetSettings}>
                    <RefreshCcw className="h-4 w-4" />
                    Đặt lại cài đặt
                  </Button>
                  <Button variant="destructive" className="gap-2">
                    <X className="h-4 w-4" />
                    Xóa tất cả dữ liệu
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

export default AdminSettings;
