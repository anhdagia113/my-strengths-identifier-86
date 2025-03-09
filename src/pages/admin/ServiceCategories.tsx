
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Service category schema
const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên danh mục phải có ít nhất 2 ký tự",
  }),
  description: z.string().optional(),
  icon: z.string().optional(),
});

// Example categories
const initialCategories = [
  {
    id: "1",
    name: "Chăm sóc da",
    description: "Các dịch vụ chăm sóc da cơ bản và chuyên sâu",
    icon: "Sparkles",
    servicesCount: 5
  },
  {
    id: "2",
    name: "Điều trị",
    description: "Các dịch vụ điều trị da chuyên sâu",
    icon: "Syringe",
    servicesCount: 3
  },
  {
    id: "3",
    name: "Trẻ hóa",
    description: "Các dịch vụ trẻ hóa da và chống lão hóa",
    icon: "Clock",
    servicesCount: 2
  },
  {
    id: "4",
    name: "Massage",
    description: "Các dịch vụ massage mặt và cơ thể",
    icon: "Massage",
    servicesCount: 4
  },
  {
    id: "5",
    name: "Làm đẹp",
    description: "Các dịch vụ làm đẹp khác",
    icon: "Gem",
    servicesCount: 1
  }
];

type Category = typeof initialCategories[0];

const ServiceCategories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // Add category form
  const addForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
    },
  });

  // Edit category form
  const editForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
    },
  });

  const handleAddCategory = (values: z.infer<typeof categoryFormSchema>) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: values.name,
      description: values.description || "",
      icon: values.icon || "Folder",
      servicesCount: 0
    };

    setCategories([...categories, newCategory]);
    toast.success("Danh mục dịch vụ mới đã được thêm thành công!");
    setIsAddDialogOpen(false);
    addForm.reset();
  };

  const handleEditCategory = (values: z.infer<typeof categoryFormSchema>) => {
    if (currentCategory) {
      const updatedCategories = categories.map(category =>
        category.id === currentCategory.id ? {
          ...category,
          name: values.name,
          description: values.description || "",
          icon: values.icon || category.icon,
        } : category
      );

      setCategories(updatedCategories);
      toast.success("Danh mục dịch vụ đã được cập nhật thành công!");
      setIsEditDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  const handleDeleteCategory = () => {
    if (currentCategory) {
      if (currentCategory.servicesCount > 0) {
        toast.error(`Không thể xóa danh mục này vì có ${currentCategory.servicesCount} dịch vụ đang sử dụng!`);
        setIsDeleteDialogOpen(false);
        return;
      }
      
      setCategories(categories.filter(category => category.id !== currentCategory.id));
      toast.success("Danh mục dịch vụ đã được xóa thành công!");
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    editForm.reset({
      name: category.name,
      description: category.description,
      icon: category.icon,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý danh mục dịch vụ</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm danh mục
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục dịch vụ</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Số dịch vụ</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <div className="max-w-[300px] truncate">
                      {category.description}
                    </div>
                  </TableCell>
                  <TableCell>{category.icon}</TableCell>
                  <TableCell>{category.servicesCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(category)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Sửa
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => openDeleteDialog(category)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Xóa
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm danh mục dịch vụ mới</DialogTitle>
            <DialogDescription>
              Tạo danh mục dịch vụ mới để phân loại các dịch vụ.
            </DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(handleAddCategory)} className="space-y-4">
              <FormField
                control={addForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên danh mục</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên danh mục" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Mô tả danh mục này" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon (tùy chọn)</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên icon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Thêm danh mục</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục dịch vụ</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin của danh mục dịch vụ hiện tại.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditCategory)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên danh mục</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên danh mục" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Mô tả danh mục này" 
                        className="resize-none" 
                        {...field} 
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon (tùy chọn)</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên icon" {...field} value={field.value || ""} />
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

      {/* Delete Category Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa danh mục</AlertDialogTitle>
            <AlertDialogDescription>
              {currentCategory?.servicesCount && currentCategory.servicesCount > 0 ? 
                `Không thể xóa danh mục "${currentCategory.name}" vì có ${currentCategory.servicesCount} dịch vụ đang sử dụng!` : 
                `Bạn có chắc chắn muốn xóa danh mục "${currentCategory?.name}"? Hành động này không thể hoàn tác.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCategory} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={currentCategory?.servicesCount && currentCategory.servicesCount > 0}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServiceCategories;
