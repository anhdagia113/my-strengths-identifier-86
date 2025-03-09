
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, Plus, Pencil, Trash2, Clock } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Service } from "@/types/service";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for services - In a real app this would come from an API
const initialServices: Service[] = [
  {
    id: "1",
    name: "Chăm sóc da cơ bản",
    description: "Làm sạch, tẩy tế bào chết và dưỡng ẩm chuyên sâu",
    price: 250000,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    duration: 60,
    category: "Chăm sóc da"
  },
  {
    id: "2",
    name: "Trị liệu chuyên sâu",
    description: "Điều trị mụn, thâm nám và các vấn đề da khác",
    price: 450000,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
    duration: 90,
    category: "Điều trị"
  },
  {
    id: "3",
    name: "Massage và thư giãn",
    description: "Massage mặt và cổ theo phương pháp truyền thống",
    price: 350000,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1",
    duration: 45,
    category: "Thư giãn"
  }
];

// Categories for services
const serviceCategories = [
  "Chăm sóc da",
  "Điều trị",
  "Thư giãn",
  "Trẻ hóa",
  "Làm đẹp",
  "Khác"
];

// Service form schema
const serviceFormSchema = z.object({
  name: z.string().min(3, "Tên dịch vụ phải có ít nhất 3 ký tự"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  price: z.coerce.number().min(1000, "Giá không hợp lệ"),
  image: z.string().url("URL hình ảnh không hợp lệ").optional(),
  duration: z.coerce.number().min(15, "Thời gian dịch vụ tối thiểu 15 phút").optional(),
  category: z.string().optional(),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const ServicesAdmin = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  
  // Set up forms
  const addForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      duration: 60,
      category: "Chăm sóc da",
    },
  });
  
  const editForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      duration: 60,
      category: "",
    },
  });

  // Filter services when search query or category changes
  useEffect(() => {
    let filtered = services;
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (categoryFilter) {
      filtered = filtered.filter(service => 
        service.category === categoryFilter
      );
    }
    
    setFilteredServices(filtered);
  }, [searchQuery, services, categoryFilter]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle add service
  const handleAddService = (data: ServiceFormValues) => {
    // Ensure name is required
    if (!data.name) {
      toast.error("Tên dịch vụ là bắt buộc!");
      return;
    }
    
    const newService: Service = {
      id: Date.now().toString(), // Generate a unique ID
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      duration: data.duration,
      category: data.category,
    };
    
    setServices([...services, newService]);
    toast.success("Dịch vụ đã được thêm thành công!");
    setIsAddDialogOpen(false);
    addForm.reset();
  };

  // Handle edit service
  const handleEditService = (data: ServiceFormValues) => {
    if (currentService && data.name) {
      const updatedServices = services.map(service => 
        service.id === currentService.id ? { 
          ...service, 
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          duration: data.duration,
          category: data.category,
        } : service
      );
      
      setServices(updatedServices);
      toast.success("Cập nhật dịch vụ thành công!");
      setIsEditDialogOpen(false);
      setCurrentService(null);
    }
  };

  // Handle delete service
  const handleDeleteService = () => {
    if (currentService) {
      const updatedServices = services.filter(service => service.id !== currentService.id);
      setServices(updatedServices);
      toast.success("Đã xóa dịch vụ!");
      setIsDeleteDialogOpen(false);
      setCurrentService(null);
    }
  };

  // Open edit dialog and populate form
  const openEditDialog = (service: Service) => {
    setCurrentService(service);
    editForm.reset({
      name: service.name,
      description: service.description,
      price: service.price,
      image: service.image,
      duration: service.duration,
      category: service.category,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (service: Service) => {
    setCurrentService(service);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý dịch vụ</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Thêm dịch vụ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-3">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm dịch vụ..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="col-span-1">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {serviceCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Tên dịch vụ</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow key={service.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {service.description}
                    </TableCell>
                    <TableCell>{service.category || "Chưa phân loại"}</TableCell>
                    <TableCell>
                      {service.duration ? `${service.duration} phút` : "N/A"}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openEditDialog(service)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openDeleteDialog(service)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    Không tìm thấy dịch vụ nào.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm dịch vụ mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi tiết để thêm dịch vụ mới vào hệ thống.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(handleAddService)} className="space-y-4">
              <FormField
                control={addForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên dịch vụ <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={addForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ) <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian (phút)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={addForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Hình ảnh (tùy chọn)</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Thêm dịch vụ</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Sửa thông tin dịch vụ</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin dịch vụ.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditService)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên dịch vụ <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VNĐ) <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian (phút)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Hình ảnh (tùy chọn)</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Lưu thay đổi</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa dịch vụ "{currentService?.name}"? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteService} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesAdmin;
