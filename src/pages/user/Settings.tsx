
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { toast } from "sonner";
import { 
  UserCircle, 
  Bell, 
  Shield, 
  Languages, 
  Mail, 
  Phone, 
  MapPin, 
  Upload,
  Lock
} from "lucide-react";

const UserSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
    bio: "Tôi là khách hàng thường xuyên sử dụng dịch vụ spa."
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    promotional: false,
    reminder: true,
    newsletter: false,
  });

  const handleProfileChange = (key: keyof typeof profileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveProfile = () => {
    toast.success("Thông tin cá nhân đã được cập nhật");
  };

  const handleSaveNotifications = () => {
    toast.success("Cài đặt thông báo đã được lưu");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mật khẩu đã được thay đổi thành công");
  };

  const handleUploadAvatar = () => {
    toast.success("Ảnh đại diện đã được cập nhật");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt tài khoản</h1>
      </div>

      <Tabs defaultValue="profile" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780" />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">Ảnh đại diện</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleUploadAvatar}>
                      <Upload className="h-4 w-4 mr-2" />
                      Tải lên
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <div className="flex">
                    <UserCircle className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex">
                    <Mail className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="flex">
                    <Phone className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ</Label>
                  <div className="flex">
                    <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleProfileChange("address", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveProfile}>
                Lưu thay đổi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>
                Quản lý cách bạn nhận thông báo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email-notifications" className="text-base">
                      Thông báo qua email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo về lịch hẹn qua email
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.email}
                  onCheckedChange={() => handleNotificationChange("email")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="sms-notifications" className="text-base">
                      Thông báo qua SMS
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo về lịch hẹn qua tin nhắn SMS
                    </p>
                  </div>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notificationSettings.sms}
                  onCheckedChange={() => handleNotificationChange("sms")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="reminder-notifications" className="text-base">
                      Nhắc nhở lịch hẹn
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo nhắc nhở trước lịch hẹn 24 giờ
                    </p>
                  </div>
                </div>
                <Switch
                  id="reminder-notifications"
                  checked={notificationSettings.reminder}
                  onCheckedChange={() => handleNotificationChange("reminder")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="promotional-notifications" className="text-base">
                      Thông báo khuyến mãi
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông tin về khuyến mãi và dịch vụ mới
                    </p>
                  </div>
                </div>
                <Switch
                  id="promotional-notifications"
                  checked={notificationSettings.promotional}
                  onCheckedChange={() => handleNotificationChange("promotional")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="newsletter-notifications" className="text-base">
                      Bản tin
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận bản tin định kỳ với mẹo chăm sóc sắc đẹp
                    </p>
                  </div>
                </div>
                <Switch
                  id="newsletter-notifications"
                  checked={notificationSettings.newsletter}
                  onCheckedChange={() => handleNotificationChange("newsletter")}
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
              <CardDescription>
                Cập nhật mật khẩu để bảo vệ tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  </div>
                  <Input type="password" id="current-password" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="new-password">Mật khẩu mới</Label>
                  </div>
                  <Input type="password" id="new-password" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                  </div>
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
              <CardTitle>Bảo mật tài khoản</CardTitle>
              <CardDescription>
                Cài đặt bảo mật bổ sung cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="two-factor" className="text-base">
                      Xác thực hai yếu tố
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Tăng cường bảo mật bằng xác thực hai yếu tố
                    </p>
                  </div>
                </div>
                <Switch id="two-factor" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="login-alerts" className="text-base">
                      Cảnh báo đăng nhập
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Nhận thông báo khi có đăng nhập mới
                    </p>
                  </div>
                </div>
                <Switch id="login-alerts" checked={true} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Giao diện</CardTitle>
              <CardDescription>
                Tùy chỉnh giao diện và ngôn ngữ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <Label className="text-base">Chế độ hiển thị</Label>
                </div>
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
                <div className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <Label className="text-base">Ngôn ngữ</Label>
                </div>
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
