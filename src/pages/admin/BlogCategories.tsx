
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
import { Checkbox } from "@/components/ui/checkbox";

// Blog category schema
const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên danh mục phải có ít nhất 2 ký tự",
  }),
  slug: z.string().min(2, {
    message: "Slug phải có ít nhất 2 ký tự",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang",
  }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

// Example categories
const initialCategories = [
  {
    id: "1",
    name: "Làm đẹp",
    slug: "lam-dep",
    description: "Các bài viết về làm đẹp và chăm sóc da",
    isActive: true,
    postsCount: 5
  },
  {
    id: "2",
    name: "Sức khỏe",
    slug: "suc-khoe",
    description: "Các bài viết về sức khỏe và lối sống",
    isActive: true,
    postsCount: 3
  },
  {
    id: "3",
    name: "Trị liệu",
    slug: "tri-lieu",
    description: "Các bài viết về trị liệu và điều trị",
    isActive: true,
    postsCount: 2
  },
  {
    id: "4",
    name: "Tin tức",
    slug: "tin-tuc",
    description: "Các tin tức về ngành làm đẹp",
    isActive: true,
    postsCount: 7
  },
  {
    id: "5",
    name: "Khuyến mãi",
    slug: "khuyen-mai",
    description: "Các bài viết về chương trình khuyến mãi",
    isActive: false,
    postsCount: 0
  }
];

type Category = typeof initialCategories[0];

const BlogCategories = () => {
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
      slug: "",
      description: "",
      isActive: true,
    },
  });

  // Edit category form
  const editForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      isActive: true,
    },
  });

  // Auto-generate slug from name for add form
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
  };

  const watchAddName = addForm.watch("name");
  const watchAddSlug = addForm.watch("slug");

  if (watchAddName && !watchAddSlug) {
    const generatedSlug = generateSlug(watchAddName);
    addForm.setValue("slug", generatedSlug);
  }

  const handleAddCategory = (values: z.infer<typeof categoryFormSchema>) => {
    // Check if slug is already in use
    if (categories.some(cat => cat.slug === values.slug)) {
      addForm.setError("slug", { 
        type: "manual", 
        message: "Slug này đã được sử dụng, vui lòng chọn slug khác" 
      });
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: values.name,
      slug: values.slug,
      description: values.description || "",
      isActive: values.isActive,
      postsCount: 0
    };

    setCategories([...categories, newCategory]);
    toast.success("Danh mục blog mới đã được thêm thành công!");
    setIsAddDialogOpen(false);
    addForm.reset();
  };

  const handleEditCategory = (values: z.infer<typeof categoryFormSchema>) => {
    if (currentCategory) {
      // Check if slug is already in use (excluding the current category)
      if (
        values.slug !== currentCategory.slug && 
        categories.some(cat => cat.slug === values.slug)
      ) {
        editForm.setError("slug", { 
          type: "manual", 
          message: "Slug này đã được sử dụng, vui lòng chọn slug khác" 
        });
        return;
      }

      const updatedCategories = categories.map(category =>
        category.id === currentCategory.id ? {
          ...category,
          name: values.name,
          slug: values.slug,
          description: values.description || "",
          isActive: values.isActive,
        } : category
      );

      setCategories(updatedCategories);
      toast.success("Danh mục blog đã được cập nhật thành công!");
      setIsEditDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  const handleDeleteCategory = () => {
    if (currentCategory) {
      if (currentCategory.postsCount > 0) {
        toast.error(`Không thể xóa danh mục này vì có ${currentCategory.postsCount} bài viết đang sử dụng!`);
        setIsDeleteDialogOpen(false);
        return;
      }
      
      setCategories(categories.filter(category => category.id !== currentCategory.id));
      toast.success("Danh mục blog đã được xóa thành công!");
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
    }
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    editForm.reset({
      name: category.name,
      slug: category.slug,
      description: category.description,
      isActive: category.isActive,
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
        <h1 className="text-2xl font-bold">Quản lý danh mục blog</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm danh mục
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục blog</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Số bài viết</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <code className="bg-muted rounded px-1.5 py-0.5 text-sm">
                      {category.slug}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[300px] truncate">
                      {category.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      category.isActive 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {category.isActive ? "Hoạt động" : "Ẩn"}
                    </span>
                  </TableCell>
                  <TableCell>{category.postsCount}</TableCell>
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
            <DialogTitle>Thêm danh mục blog mới</DialogTitle>
            <DialogDescription>
              Tạo danh mục blog mới để phân loại các bài viết.
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="ten-danh-muc" {...field} />
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
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Hoạt động
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Danh mục sẽ hiển thị với người dùng
                      </p>
                    </div>
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
            <DialogTitle>Chỉnh sửa danh mục blog</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin của danh mục blog hiện tại.
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="ten-danh-muc" {...field} />
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
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Hoạt động
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Danh mục sẽ hiển thị với người dùng
                      </p>
                    </div>
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
              {currentCategory?.postsCount && currentCategory.postsCount > 0 ? 
                `Không thể xóa danh mục "${currentCategory.name}" vì có ${currentCategory.postsCount} bài viết đang sử dụng!` : 
                `Bạn có chắc chắn muốn xóa danh mục "${currentCategory?.name}"? Hành động này không thể hoàn tác.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCategory} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={currentCategory?.postsCount && currentCategory.postsCount > 0}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogCategories;
