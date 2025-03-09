
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Check, Edit, Plus, Shield, Trash } from "lucide-react";
import { toast } from "sonner";

// Mock data for roles
const initialRoles = [
  {
    id: "1",
    name: "Admin",
    description: "Quyền quản trị hệ thống",
    permissions: ["users.view", "users.create", "users.edit", "users.delete", "services.view", "services.create", "services.edit", "services.delete", "blogs.manage", "reports.view", "settings.edit"],
    userCount: 2,
  },
  {
    id: "2",
    name: "Quản lý",
    description: "Quản lý dịch vụ và nhân viên",
    permissions: ["services.view", "services.create", "services.edit", "blogs.view", "reports.view"],
    userCount: 3,
  },
  {
    id: "3",
    name: "Nhân viên",
    description: "Nhân viên cung cấp dịch vụ",
    permissions: ["services.view", "blogs.view"],
    userCount: 8,
  },
  {
    id: "4",
    name: "Khách hàng",
    description: "Người dùng thông thường",
    permissions: ["services.view", "blogs.view"],
    userCount: 45,
  }
];

// Available permissions grouped by module
const availablePermissions = [
  {
    module: "Người dùng",
    permissions: [
      { id: "users.view", label: "Xem danh sách người dùng" },
      { id: "users.create", label: "Tạo người dùng mới" },
      { id: "users.edit", label: "Chỉnh sửa người dùng" },
      { id: "users.delete", label: "Xóa người dùng" },
    ]
  },
  {
    module: "Dịch vụ",
    permissions: [
      { id: "services.view", label: "Xem danh sách dịch vụ" },
      { id: "services.create", label: "Tạo dịch vụ mới" },
      { id: "services.edit", label: "Chỉnh sửa dịch vụ" },
      { id: "services.delete", label: "Xóa dịch vụ" },
    ]
  },
  {
    module: "Blog",
    permissions: [
      { id: "blogs.view", label: "Xem blog" },
      { id: "blogs.create", label: "Tạo bài viết" },
      { id: "blogs.edit", label: "Chỉnh sửa bài viết" },
      { id: "blogs.delete", label: "Xóa bài viết" },
      { id: "blogs.manage", label: "Quản lý danh mục blog" },
    ]
  },
  {
    module: "Báo cáo",
    permissions: [
      { id: "reports.view", label: "Xem báo cáo" },
      { id: "reports.export", label: "Xuất báo cáo" },
    ]
  },
  {
    module: "Cài đặt",
    permissions: [
      { id: "settings.view", label: "Xem cài đặt" },
      { id: "settings.edit", label: "Chỉnh sửa cài đặt" },
    ]
  }
];

const AdminRoles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<(typeof initialRoles)[0] | null>(null);
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  // Handle permission toggle
  const togglePermission = (permissionId: string, isAdd = true) => {
    if (isAdd) {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permissionId]
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(id => id !== permissionId)
      });
    }
  };

  // Check if permission is selected
  const isPermissionSelected = (permissionId: string) => {
    return newRole.permissions.includes(permissionId);
  };

  // Open add role dialog
  const openAddDialog = () => {
    setNewRole({
      name: "",
      description: "",
      permissions: [],
    });
    setIsAddDialogOpen(true);
  };

  // Open edit role dialog
  const openEditDialog = (role: typeof currentRole) => {
    if (role) {
      setCurrentRole(role);
      setNewRole({
        name: role.name,
        description: role.description,
        permissions: [...role.permissions],
      });
      setIsEditDialogOpen(true);
    }
  };

  // Open delete role dialog
  const openDeleteDialog = (role: typeof currentRole) => {
    setCurrentRole(role);
    setIsDeleteDialogOpen(true);
  };

  // Handle add role
  const handleAddRole = () => {
    if (!newRole.name) {
      toast.error("Vui lòng nhập tên vai trò!");
      return;
    }

    const role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      userCount: 0,
    };

    setRoles([...roles, role]);
    setIsAddDialogOpen(false);
    toast.success("Thêm vai trò mới thành công!");
  };

  // Handle edit role
  const handleEditRole = () => {
    if (!currentRole || !newRole.name) {
      toast.error("Dữ liệu không hợp lệ!");
      return;
    }

    const updatedRoles = roles.map(role => 
      role.id === currentRole.id 
        ? { 
            ...role, 
            name: newRole.name,
            description: newRole.description,
            permissions: newRole.permissions 
          } 
        : role
    );

    setRoles(updatedRoles);
    setIsEditDialogOpen(false);
    toast.success("Cập nhật vai trò thành công!");
  };

  // Handle delete role
  const handleDeleteRole = () => {
    if (currentRole) {
      if (currentRole.name === "Admin") {
        toast.error("Không thể xóa vai trò Admin!");
        setIsDeleteDialogOpen(false);
        return;
      }

      const updatedRoles = roles.filter(role => role.id !== currentRole.id);
      setRoles(updatedRoles);
      setIsDeleteDialogOpen(false);
      toast.success("Xóa vai trò thành công!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý phân quyền</h1>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm vai trò
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách vai trò</CardTitle>
          <CardDescription>Quản lý các vai trò và quyền hạn trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên vai trò</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số người dùng</TableHead>
                <TableHead>Quyền hạn</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>{role.userCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.length > 3 ? (
                        <>
                          <Badge variant="outline" className="bg-primary/10">
                            {role.permissions.length} quyền
                          </Badge>
                        </>
                      ) : (
                        role.permissions.map(permission => (
                          <Badge key={permission} variant="outline" className="bg-primary/10">
                            {permission.split('.')[0]}
                          </Badge>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openDeleteDialog(role)}
                        className="text-destructive hover:text-destructive"
                        disabled={role.name === "Admin"}
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

      {/* Add Role Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Thêm vai trò mới</DialogTitle>
            <DialogDescription>
              Tạo vai trò mới và thiết lập quyền hạn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Tên vai trò <span className="text-destructive">*</span></Label>
                <Input 
                  id="role-name" 
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  placeholder="Nhập tên vai trò" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Mô tả</Label>
                <Input 
                  id="role-description" 
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  placeholder="Mô tả ngắn về vai trò" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Quyền hạn</Label>
              <div className="space-y-6">
                {availablePermissions.map((module) => (
                  <div key={module.module} className="space-y-2">
                    <h4 className="font-medium text-sm">
                      <Shield className="h-4 w-4 inline mr-1" />
                      {module.module}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {module.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => togglePermission(permission.id, !isPermissionSelected(permission.id))}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm w-full
                              ${isPermissionSelected(permission.id) 
                                ? 'bg-primary/10 text-primary border border-primary/30' 
                                : 'bg-muted hover:bg-muted/80 border border-transparent'
                              }`}
                          >
                            <div className="w-4 h-4 flex items-center justify-center">
                              {isPermissionSelected(permission.id) && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>{permission.label}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={handleAddRole}>
              Thêm vai trò
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin và quyền hạn cho vai trò
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role-name">Tên vai trò <span className="text-destructive">*</span></Label>
                <Input 
                  id="edit-role-name" 
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  placeholder="Nhập tên vai trò" 
                  disabled={currentRole?.name === "Admin"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role-description">Mô tả</Label>
                <Input 
                  id="edit-role-description" 
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  placeholder="Mô tả ngắn về vai trò" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Quyền hạn</Label>
              <div className="space-y-6">
                {availablePermissions.map((module) => (
                  <div key={module.module} className="space-y-2">
                    <h4 className="font-medium text-sm">
                      <Shield className="h-4 w-4 inline mr-1" />
                      {module.module}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {module.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => togglePermission(permission.id, !isPermissionSelected(permission.id))}
                            disabled={currentRole?.name === "Admin" && permission.id.startsWith("users")}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm w-full
                              ${isPermissionSelected(permission.id) 
                                ? 'bg-primary/10 text-primary border border-primary/30' 
                                : 'bg-muted hover:bg-muted/80 border border-transparent'
                              } ${(currentRole?.name === "Admin" && permission.id.startsWith("users")) ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            <div className="w-4 h-4 flex items-center justify-center">
                              {isPermissionSelected(permission.id) && (
                                <Check className="h-3 w-3" />
                              )}
                            </div>
                            <span>{permission.label}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button type="button" onClick={handleEditRole}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa vai trò</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa vai trò "{currentRole?.name}"? Hành động này không thể hoàn tác.
              {currentRole?.userCount ? (
                <p className="mt-2 text-destructive">
                  Lưu ý: Hiện có {currentRole.userCount} người dùng đang được gán vai trò này.
                </p>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminRoles;
