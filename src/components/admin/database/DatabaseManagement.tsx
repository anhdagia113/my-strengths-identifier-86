
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  AlertCircle, 
  CheckCircle2, 
  Database, 
  RefreshCw, 
  Download,
  Trash2,
  Upload
} from "lucide-react";
import { toast } from "sonner";
import DatabaseService from "@/api/services/database.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DatabaseManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClearingData, setClearingData] = useState(false);
  const [isExportingData, setExportingData] = useState(false);
  const [importData, setImportData] = useState("");

  const handleSeedDatabase = async () => {
    try {
      setIsLoading(true);
      const result = await DatabaseService.seedInitialData();
      
      if (result.success) {
        toast.success("Dữ liệu mẫu đã được tạo thành công!");
      } else {
        toast.error(`Lỗi khi tạo dữ liệu mẫu: ${result.message}`);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tạo dữ liệu mẫu.");
      console.error("Seed database error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearDatabase = async () => {
    try {
      setClearingData(true);
      const result = await DatabaseService.clearAllData();
      
      if (result.success) {
        toast.success("Đã xóa tất cả dữ liệu thành công!");
      } else {
        toast.error(`Lỗi khi xóa dữ liệu: ${result.message}`);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa dữ liệu.");
      console.error("Clear database error:", error);
    } finally {
      setClearingData(false);
    }
  };

  const handleExportData = async () => {
    try {
      setExportingData(true);
      const result = await DatabaseService.exportData();
      
      if (result.success && result.data) {
        // Create a blob from the data
        const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        
        // Create a link and trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'beauty_salon_data_export.json';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast.success("Đã xuất dữ liệu thành công!");
      } else {
        toast.error(`Lỗi khi xuất dữ liệu: ${result.message}`);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xuất dữ liệu.");
      console.error("Export data error:", error);
    } finally {
      setExportingData(false);
    }
  };

  const handleImportData = async () => {
    if (!importData.trim()) {
      toast.error("Vui lòng nhập dữ liệu để nhập");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Parse the JSON data
      let dataToImport;
      try {
        dataToImport = JSON.parse(importData);
      } catch (e) {
        toast.error("Dữ liệu JSON không hợp lệ");
        setIsLoading(false);
        return;
      }
      
      const result = await DatabaseService.importData(dataToImport);
      
      if (result.success) {
        toast.success("Dữ liệu đã được nhập thành công!");
        setImportData("");
      } else {
        toast.error(`Lỗi khi nhập dữ liệu: ${result.message}`);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi nhập dữ liệu.");
      console.error("Import data error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getExampleData = () => {
    // Return empty structure
    const exampleData = {
      paymentMethods: [],
      payments: []
    };
    setImportData(JSON.stringify(exampleData, null, 2));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <span>Quản lý cơ sở dữ liệu</span>
        </CardTitle>
        <CardDescription>
          Tạo dữ liệu mẫu, xuất/nhập và quản lý cơ sở dữ liệu của hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="seed">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seed">Dữ liệu mẫu</TabsTrigger>
            <TabsTrigger value="export">Xuất dữ liệu</TabsTrigger>
            <TabsTrigger value="import">Nhập dữ liệu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="seed" className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-start space-x-4">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Tạo dữ liệu mẫu</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tạo dữ liệu mẫu cho hệ thống bao gồm các phương thức thanh toán và lịch sử giao dịch.
                    Các dữ liệu đã tồn tại sẽ bị xóa và thay thế bằng dữ liệu mẫu mới.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      onClick={handleSeedDatabase}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        "Tạo dữ liệu mẫu"
                      )}
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleClearDatabase}
                      disabled={isClearingData}
                    >
                      {isClearingData ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Đang xóa...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa tất cả dữ liệu
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border p-4 bg-amber-50">
              <div className="flex items-start space-x-4">
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium">Lưu ý quan trọng</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Việc thêm hoặc xóa dữ liệu sẽ ảnh hưởng trực tiếp đến cơ sở dữ liệu. Không thực hiện thao tác này
                    trên môi trường sản xuất hoặc khi đã có dữ liệu thực từ người dùng.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-start space-x-4">
                <div className="mt-0.5">
                  <Download className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Xuất dữ liệu</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Xuất tất cả dữ liệu trong hệ thống để sao lưu hoặc chuyển sang môi trường khác.
                    Dữ liệu sẽ được xuất dưới định dạng JSON.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-3"
                    onClick={handleExportData}
                    disabled={isExportingData}
                  >
                    {isExportingData ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Đang xuất dữ liệu...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Xuất dữ liệu
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-start space-x-4">
                <div className="mt-0.5">
                  <Upload className="h-5 w-5 text-purple-500" />
                </div>
                <div className="w-full">
                  <h3 className="font-medium">Nhập dữ liệu</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Nhập dữ liệu vào hệ thống. Dữ liệu phải ở định dạng JSON và theo cấu trúc hợp lệ.
                  </p>
                  
                  <Textarea 
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Dán dữ liệu JSON vào đây..."
                    className="min-h-[200px] mb-3"
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleImportData}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Đang nhập dữ liệu...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Nhập dữ liệu
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      onClick={getExampleData}
                    >
                      Lấy dữ liệu mẫu
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Chú ý</AlertTitle>
              <AlertDescription>
                Dữ liệu nhập vào sẽ ghi đè lên dữ liệu hiện tại. Hãy đảm bảo bạn đã sao lưu
                dữ liệu quan trọng trước khi thực hiện thao tác này.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        Tính năng này chỉ có sẵn cho người dùng có quyền quản trị hệ thống.
      </CardFooter>
    </Card>
  );
}
