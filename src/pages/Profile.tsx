
import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, Mail, Phone, MapPin, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Nguyễn",
    lastName: "Thị Hoa",
    email: "nguyenthihoa@example.com",
    phone: "0901234567",
    dob: "1990-05-15",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    bio: "Tôi luôn quan tâm đến việc chăm sóc da và làm đẹp. Tôi thích thử nghiệm các phương pháp làm đẹp tự nhiên và tìm hiểu về các sản phẩm chăm sóc da mới.",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof typeof profileData,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    toast.success("Hồ sơ đã được cập nhật thành công!");
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes('image/')) {
      toast.error("Vui lòng tải lên file hình ảnh hợp lệ");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước file quá lớn. Vui lòng tải lên file nhỏ hơn 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
        toast.success("Đã tải ảnh lên thành công");
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Đã xóa ảnh đại diện");
  };

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Hồ sơ cá nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt="Avatar" />
                  ) : (
                    <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white" 
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-6 w-6" />
                  </Button>
                  {profileImage && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-white" 
                      onClick={removeProfileImage}
                    >
                      <Trash2 className="h-6 w-6" />
                    </Button>
                  )}
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <CardTitle className="text-center">
                {profileData.firstName} {profileData.lastName}
              </CardTitle>
              <p className="text-muted-foreground text-center">Khách hàng</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>
                    {profileData.firstName} {profileData.lastName}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{new Date(profileData.dob).toLocaleDateString("vi-VN")}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-1" />
                  <span>{profileData.address}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <Button className="w-full" variant="outline" onClick={triggerFileInput}>
                <Upload className="mr-2 h-4 w-4" />
                Thay đổi ảnh đại diện
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
              <TabsTrigger value="preferences">Tùy chọn</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Họ</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Tên</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Ngày sinh</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={profileData.dob}
                        onChange={(e) =>
                          handleInputChange("dob", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Giới thiệu</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                      />
                    </div>

                    <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                    <Button onClick={() => toast.success("Mật khẩu đã được cập nhật thành công!")}>
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Tùy chọn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Ngôn ngữ</Label>
                      <select
                        id="language"
                        className="w-full p-2 border rounded-md"
                        defaultValue="vi"
                      >
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">Tiếng Anh</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notification-email" defaultChecked />
                      <Label htmlFor="notification-email">Nhận thông báo qua email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="notification-sms" defaultChecked />
                      <Label htmlFor="notification-sms">Nhận thông báo qua SMS</Label>
                    </div>
                    <Button
                      onClick={() => toast.success("Tùy chọn đã được lưu thành công!")}
                    >
                      Lưu tùy chọn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
