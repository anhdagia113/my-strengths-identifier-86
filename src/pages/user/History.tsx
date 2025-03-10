
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Star, MessageCircle } from "lucide-react";
import { toast } from "sonner";

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
    feedback: "Dịch vụ rất tốt, nhân viên thân thiện"
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
    feedback: "Hiệu quả tốt nhưng giá hơi cao"
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
    feedback: ""
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
    feedback: "Dịch vụ xuất sắc"
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
    feedback: "Dịch vụ ổn"
  },
];

const UserHistory = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [history, setHistory] = useState(serviceHistory);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  
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

  const getRatingStars = (rating: number, interactive = false, itemId?: string) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= (interactive ? hoverRating || currentRating : rating) 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer" : ""}`}
            onClick={() => interactive && setCurrentRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  const openRatingDialog = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentRating(0);
    setHoverRating(0);
    setRatingDialogOpen(true);
  };

  const openFeedbackDialog = (serviceId: string) => {
    const service = history.find(item => item.id === serviceId);
    setSelectedService(serviceId);
    setFeedbackText(service?.feedback || "");
    setFeedbackDialogOpen(true);
  };

  const submitRating = () => {
    if (selectedService) {
      setHistory(prevHistory =>
        prevHistory.map(item =>
          item.id === selectedService
            ? { ...item, rated: true, rating: currentRating }
            : item
        )
      );
      setRatingDialogOpen(false);
      toast.success("Đánh giá của bạn đã được ghi nhận!");
    }
  };

  const submitFeedback = () => {
    if (selectedService) {
      setHistory(prevHistory =>
        prevHistory.map(item =>
          item.id === selectedService
            ? { ...item, feedback: feedbackText }
            : item
        )
      );
      setFeedbackDialogOpen(false);
      toast.success("Phản hồi của bạn đã được gửi!");
    }
  };

  const filteredHistory = history.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "rated") return item.rated;
    if (activeTab === "unrated") return !item.rated;
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
                    filteredHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.service}</TableCell>
                        <TableCell>{item.specialist}</TableCell>
                        <TableCell>
                          {format(new Date(item.date), "dd/MM/yyyy HH:mm")}
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </TableCell>
                        <TableCell>
                          {item.rated ? (
                            getRatingStars(item.rating)
                          ) : (
                            <span className="text-sm text-muted-foreground">Chưa đánh giá</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {!item.rated && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                                onClick={() => openRatingDialog(item.id)}
                              >
                                <Star className="h-4 w-4 mr-1" />
                                Đánh giá
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center"
                              onClick={() => openFeedbackDialog(item.id)}
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

      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đánh giá dịch vụ</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center space-y-4">
            <p className="text-center text-muted-foreground">Bạn đánh giá như thế nào về dịch vụ này?</p>
            <div className="flex justify-center">
              {getRatingStars(0, true)}
            </div>
            <Textarea 
              placeholder="Nhập phản hồi của bạn (tùy chọn)"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRatingDialogOpen(false)}>Hủy</Button>
            <Button onClick={submitRating} disabled={currentRating === 0}>Gửi đánh giá</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Phản hồi dịch vụ</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="Nhập phản hồi của bạn"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={6}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>Hủy</Button>
            <Button onClick={submitFeedback}>Gửi phản hồi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserHistory;
