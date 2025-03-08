
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { format } from "date-fns";
import { Star, MessageCircle } from "lucide-react";

const serviceHistory = [
  {
    id: "1",
    service: "Chăm sóc da cơ bản",
    specialist: "Nguyễn Thị A",
    date: "2023-09-15T09:00:00",
    status: "completed",
    price: 450000,
    rated: true,
    rating: 5,
  },
  {
    id: "2",
    service: "Trị mụn chuyên sâu",
    specialist: "Trần Văn B",
    date: "2023-08-10T15:30:00",
    status: "completed",
    price: 650000,
    rated: true,
    rating: 4,
  },
  {
    id: "3",
    service: "Massage mặt",
    specialist: "Lê Thị C",
    date: "2023-07-28T11:00:00",
    status: "completed",
    price: 350000,
    rated: false,
    rating: 0,
  },
  {
    id: "4",
    service: "Trẻ hóa da",
    specialist: "Phạm Văn D",
    date: "2023-06-05T14:00:00",
    status: "completed",
    price: 850000,
    rated: true,
    rating: 5,
  },
  {
    id: "5",
    service: "Tẩy trang chuyên sâu",
    specialist: "Hoàng Thị E",
    date: "2023-05-20T10:30:00",
    status: "completed",
    price: 250000,
    rated: true,
    rating: 3,
  },
];

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Hoàn thành</Badge>;
      case "canceled":
        return <Badge className="bg-red-500">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredHistory = serviceHistory.filter((history) => {
    if (activeTab === "all") return true;
    if (activeTab === "rated") return history.rated;
    if (activeTab === "unrated") return !history.rated;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Lịch sử dịch vụ</h1>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="rated">Đã đánh giá</TabsTrigger>
          <TabsTrigger value="unrated">Chưa đánh giá</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử sử dụng dịch vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>Chuyên viên</TableHead>
                    <TableHead>Ngày giờ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Đánh giá</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((history) => (
                      <TableRow key={history.id}>
                        <TableCell className="font-medium">{history.service}</TableCell>
                        <TableCell>{history.specialist}</TableCell>
                        <TableCell>
                          {format(new Date(history.date), "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell>{getStatusBadge(history.status)}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(history.price)}
                        </TableCell>
                        <TableCell>
                          {history.rated ? (
                            getRatingStars(history.rating)
                          ) : (
                            <span className="text-sm text-muted-foreground">Chưa đánh giá</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {!history.rated && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                              >
                                <Star className="h-4 w-4 mr-1" />
                                Đánh giá
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center"
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Phản hồi
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        Không có lịch sử dịch vụ nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserHistory;
