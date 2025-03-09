
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
import { Edit, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

// Mock data for blog categories
const initialCategories = [
  {
    id: "1",
    name: "Chăm sóc da",
    slug: "cham-soc-da",
    postCount: 12,
  },
  {
    id: "2",
    name: "Làm đẹp",
    slug: "lam-dep",
    postCount: 8,
  },
  {
    id: "3",
    name: "Trị liệu",
    slug: "tri-lieu",
    postCount: 5,
  },
  {
    id: "4",
    name: "Xu hướng",
    slug: "xu-huong",
    postCount: 10,
  },
];

const BlogCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<(typeof initialCategories)[0] | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
  });

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handle name change and auto-generate slug
  const handleNameChange = (name: string) => {
    setNewCategory({
      ...newCategory,
      name,
      slug: generateSlug(name),
    });
  };

  // Open add category dialog
  const openAddDialog = () => {
    setNewCategory({
      name: "",
      slug: "",
    });
    setIsAddDialogOpen(true);
  };

  // Open edit category dialog
  const openEditDialog = (category: typeof currentCategory) => {
    if (category) {
      setCurrentCategory(category);
      setNewCategory({
        name: category.name,
        slug: category.slug,
      });
      setIsEditDialogOpen(true);
    }
  };

  // Open delete category dialog
  const openDeleteDialog = (category: typeof currentCategory) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  // Handle add category
  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast.error("Vui lòng nhập tên danh mục!");
      return;
    }

    const category = {
      id: Date.now().toString(),
      name: newCategory.name,
      slug: newCategory.slug || generateSlug(newCategory.name),
      postCount: 0,
    };

    setCategories([...categories, category]);
    setIsAddDialogOpen(false);
    toast.success("Thêm danh mục mới thành công!");
  };

  // Handle edit category
  const handleEditCategory = () => {
    if (!currentCategory || !newCategory.name) {
      toast.error("Dữ liệu không hợp lệ!");
      return;
    }

    const updatedCategories = categories.map(category => 
      category.id === currentCategory.id 
        ? { 
            ...category, 
            name: newCategory.name,
            slug: newCategory.slug || generateSlug(newCategory.name)
          } 
        : category
    );

    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    toast.success("Cập nhật danh mục thành công!");
  };

  // Handle delete category
  const handleDeleteCategory = () => {
    if (currentCategory) {
      if (currentCategory.postCount > 0) {
        toast.error(`Không thể xóa danh mục đang có ${currentCategory.postCount} bài viết!`);
        setIsDeleteDialogOpen(false);
        return;
      }

      const updatedCategories = categories.filter(category => category.id !== currentCategory.id);
      setCategories(updatedCategories);
      setIsDeleteDialogOpen(false);
      toast.success("Xóa danh mục thành công!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý danh mục blog</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Số bài viết</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                  <TableCell>{category.postCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openDeleteDialog(category)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
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
            <DialogTitle>Thêm danh mục mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Tên danh mục <span className="text-destructive">*</span></Label>
              <Input 
                id="category-name" 
                value={newCategory.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Nhập tên danh mục" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-slug">Slug</Label>
              <Input 
                id="category-slug" 
                value={newCategory.slug}
                onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                placeholder="slug-danh-muc" 
              />
              <p className="text-xs text-muted-foreground">
                Định danh dùng trong URL. Tự động tạo từ tên danh mục.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={handleAddCategory}>
              Thêm danh mục
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category-name">Tên danh mục <span className="text-destructive">*</span></Label>
              <Input 
                id="edit-category-name" 
                value={newCategory.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Nhập tên danh mục" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category-slug">Slug</Label>
              <Input 
                id="edit-category-slug" 
                value={newCategory.slug}
                onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                placeholder="slug-danh-muc" 
              />
              <p className="text-xs text-muted-foreground">
                Định danh dùng trong URL. Tự động tạo từ tên danh mục.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={handleEditCategory}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa danh mục</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa danh mục "{currentCategory?.name}"? Hành động này không thể hoàn tác.
              {currentCategory?.postCount > 0 && (
                <p className="mt-2 text-destructive">
                  Lưu ý: Hiện có {currentCategory.postCount} bài viết thuộc danh mục này. Vui lòng chuyển các bài viết sang danh mục khác trước khi xóa.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogCategories;
