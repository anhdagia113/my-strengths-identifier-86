
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  MoreHorizontal, 
  UserPlus, 
  Edit, 
  Trash, 
  Star 
} from "lucide-react";
import { toast } from "sonner";

// Dummy data for specialists
const staffData = [
  {
    id: "1",
    name: "Nguyễn Thị A",
    specialty: "Chăm sóc da",
    email: "nguyenthia@example.com",
    phone: "0901234567",
    experience: "5 năm",
    rating: 4.8,
    status: "active",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: "2",
    name: "Trần Văn B",
    specialty: "Trị mụn",
    email: "tranvanb@example.com",
    phone: "0912345678",
    experience: "3 năm",
    rating: 4.5,
    status: "active",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
  },
  {
    id: "3",
    name: "Lê Thị C",
    specialty: "Massage mặt",
    email: "lethic@example.com",
    phone: "0923456789",
    experience: "7 năm",
    rating: 4.9,
    status: "active",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
  },
  {
    id: "4",
    name: "Phạm Văn D",
    specialty: "Trẻ hóa da",
    email: "phamvand@example.com",
    phone: "0934567890",
    experience: "4 năm",
    rating: 4.6,
    status: "inactive",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
];

const AdminStaff = () => {
  const [staff, setStaff] = useState(staffData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  const [isEditStaffDialogOpen, setIsEditStaffDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<(typeof staffData)[0] | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredStaff = staff.filter((member) => {
    const query = searchQuery.toLowerCase();
    return (
      member.name.toLowerCase().includes(query) ||
      member.specialty.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.phone.includes(query)
    );
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newStaff = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      specialty: formData.get("specialty") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      experience: formData.get("experience") as string,
      rating: 0,
      status: "active",
      image: formData.get("image") as string || "https://via.placeholder.com/150",
    };
    
    setStaff([...staff, newStaff]);
    toast.success("Đã thêm chuyên viên mới thành công");
    setIsAddStaffDialogOpen(false);
    form.reset();
  };

  const handleEditStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStaff) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      setStaff(staff.map(member => 
        member.id === selectedStaff.id 
          ? { 
              ...member, 
              name: formData.get("name") as string,
              specialty: formData.get("specialty") as string,
              email: formData.get("email") as string,
              phone: formData.get("phone") as string,
              experience: formData.get("experience") as string,
              image: formData.get("image") as string || member.image,
            } 
          : member
      ));
      
      toast.success(`Đã cập nhật thông tin chuyên viên ${selectedStaff.name} thành công`);
      setIsEditStaffDialogOpen(false);
      setSelectedStaff(null);
    }
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaff(staff.filter(member => member.id !== staffId));
    toast.success("Đã xóa chuyên viên thành công");
  };

  const openEditDialog = (member: (typeof staffData)[0]) => {
    setSelectedStaff(member);
    setIsEditStaffDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? <Badge className="bg-green-500">Đang làm việc</Badge>
      : <Badge className="bg-gray-500">Nghỉ việc</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý chuyên viên</h1>
        <Dialog open={isAddStaffDialogOpen} onOpenChange={setIsAddStaffDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Thêm chuyên viên
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Thêm chuyên viên mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin để thêm chuyên viên mới vào hệ thống
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên đầy đủ</Label>
                    <Input id="name" name="name" placeholder="Nguyễn Văn A" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Chuyên môn</Label>
                    <Input id="specialty" name="specialty" placeholder="Chăm sóc da" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="example@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" name="phone" placeholder="0901234567" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm</Label>
                    <Input id="experience" name="experience" placeholder="5 năm" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Hình ảnh URL</Label>
                    <Input id="image" name="image" placeholder="https://example.com/image.jpg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Tiểu sử</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    placeholder="Thông tin chi tiết về chuyên viên..." 
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Thêm chuyên viên</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách chuyên viên</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên, chuyên môn, email hoặc số điện thoại..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Chuyên môn</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Số điện thoại</TableHead>
                  <TableHead>Kinh nghiệm</TableHead>
                  <TableHead>Đánh giá</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="h-8 w-8 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                            }}
                          />
                          <span>{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{member.specialty}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.experience}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                          <span>{member.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openEditDialog(member)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteStaff(member.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Không tìm thấy chuyên viên nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditStaffDialogOpen} onOpenChange={setIsEditStaffDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin chuyên viên</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin của {selectedStaff?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <form onSubmit={handleEditStaff} className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Tên đầy đủ</Label>
                    <Input 
                      id="edit-name" 
                      name="name" 
                      defaultValue={selectedStaff.name} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-specialty">Chuyên môn</Label>
                    <Input 
                      id="edit-specialty" 
                      name="specialty" 
                      defaultValue={selectedStaff.specialty} 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input 
                      id="edit-email" 
                      name="email" 
                      type="email" 
                      defaultValue={selectedStaff.email} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Số điện thoại</Label>
                    <Input 
                      id="edit-phone" 
                      name="phone" 
                      defaultValue={selectedStaff.phone} 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-experience">Kinh nghiệm</Label>
                    <Input 
                      id="edit-experience" 
                      name="experience" 
                      defaultValue={selectedStaff.experience} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Hình ảnh URL</Label>
                    <Input 
                      id="edit-image" 
                      name="image" 
                      defaultValue={selectedStaff.image} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-bio">Tiểu sử</Label>
                  <Textarea 
                    id="edit-bio" 
                    name="bio" 
                    placeholder="Thông tin chi tiết về chuyên viên..." 
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Lưu thay đổi</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStaff;
