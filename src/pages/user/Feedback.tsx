
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Star, MessageSquare, PenLine, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock data for past services
const pastServices = [
  {
    id: "1",
    service: "Chăm sóc da cơ bản",
    specialist: "Nguyễn Thị A",
    date: new Date(2023, 8, 15, 9, 0, 0),
    status: "completed",
    rated: true,
    rating: 5,
    feedback: "Dịch vụ rất tốt, nhân viên chuyên nghiệp."
  },
  {
    id: "2",
    service: "Trị mụn chuyên sâu",
    specialist: "Trần Văn B",
    date: new Date(2023, 8, 10, 15, 30, 0),
    status: "completed",
    rated: true,
    rating: 4,
    feedback: "Hiệu quả tốt, nhưng giá hơi cao."
  },
  {
    id: "3",
    service: "Massage mặt",
    specialist: "Lê Thị C",
    date: new Date(2023, 8, 28, 11, 0, 0),
    status: "completed",
    rated: false,
    rating: 0,
    feedback: ""
  }
];

// Mock data for user feedback history
const feedbackHistory = [
  {
    id: "1",
    service: "Chăm sóc da cơ bản",
    date: new Date(2023, 8, 15, 9, 0, 0),
    rating: 5,
    feedback: "Dịch vụ rất tốt, nhân viên chuyên nghiệp.",
    response: "Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. Chúng tôi rất vui khi bạn hài lòng!"
  },
  {
    id: "2",
    service: "Trị mụn chuyên sâu",
    date: new Date(2023, 8, 10, 15, 30, 0),
    rating: 4,
    feedback: "Hiệu quả tốt, nhưng giá hơi cao.",
    response: "Cảm ơn góp ý của quý khách. Chúng tôi sẽ xem xét chính sách giá phù hợp hơn."
  }
];

const UserFeedback = () => {
  const [services, setServices] = useState(pastServices);
  const [feedback, setFeedback] = useState(feedbackHistory);
  const [selectedService, setSelectedService] = useState<(typeof pastServices)[0] | null>(null);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isRating, setIsRating] = useState(false);

  // Submit rating and feedback
  const handleSubmitFeedback = () => {
    if (!selectedService) return;
    
    if (rating === 0) {
      toast.error("Vui lòng chọn số sao đánh giá!");
      return;
    }

    // Update service
    const updatedServices = services.map(service => 
      service.id === selectedService.id 
        ? { ...service, rated: true, rating, feedback: feedbackText } 
        : service
    );
    
    // Add to feedback history
    const newFeedback = {
      id: selectedService.id,
      service: selectedService.service,
      date: selectedService.date,
      rating,
      feedback: feedbackText,
      response: ""
    };
    
    setServices(updatedServices);
    setFeedback([...feedback, newFeedback]);
    setSelectedService(null);
    setRating(0);
    setFeedbackText("");
    setIsRating(false);
    
    toast.success("Cảm ơn bạn đã đánh giá dịch vụ của chúng tôi!");
  };

  // Start rating process
  const startRating = (service: typeof selectedService) => {
    setSelectedService(service);
    setRating(0);
    setFeedbackText("");
    setIsRating(true);
  };

  // Cancel rating
  const cancelRating = () => {
    setSelectedService(null);
    setRating(0);
    setFeedbackText("");
    setIsRating(false);
  };

  // Render stars for rating display
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  // Get services that need rating
  const getUnratedServices = () => {
    return services.filter(service => !service.rated && service.status === "completed");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Đánh giá & Phản hồi</h1>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            <Clock className="mr-2 h-4 w-4" />
            Chờ đánh giá
          </TabsTrigger>
          <TabsTrigger value="history">
            <MessageSquare className="mr-2 h-4 w-4" />
            Lịch sử đánh giá
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {isRating && selectedService ? (
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá dịch vụ</CardTitle>
                <CardDescription>
                  Hãy chia sẻ trải nghiệm của bạn về dịch vụ {selectedService.service}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Thông tin dịch vụ</Label>
                  <div className="rounded-md bg-muted p-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Dịch vụ:</span> {selectedService.service}
                      </div>
                      <div>
                        <span className="font-medium">Chuyên viên:</span> {selectedService.specialist}
                      </div>
                      <div>
                        <span className="font-medium">Ngày:</span> {format(selectedService.date, "dd/MM/yyyy")}
                      </div>
                      <div>
                        <span className="font-medium">Giờ:</span> {format(selectedService.date, "HH:mm")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Đánh giá</Label>
                  <RadioGroup 
                    className="flex space-x-2"
                    value={rating.toString()}
                    onValueChange={(value) => setRating(parseInt(value))}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center">
                        <RadioGroupItem
                          value={value.toString()}
                          id={`rating-${value}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`rating-${value}`}
                          className="flex flex-col items-center space-y-1 rounded-md p-2 hover:bg-muted peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary cursor-pointer"
                        >
                          <div className="flex space-x-0.5">
                            {Array(value).fill(0).map((_, i) => (
                              <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                            ))}
                            {Array(5 - value).fill(0).map((_, i) => (
                              <Star key={i + value} className="h-8 w-8 text-gray-300" />
                            ))}
                          </div>
                          <span className="text-xs font-medium">
                            {
                              value === 1 ? "Rất tệ" :
                              value === 2 ? "Tệ" :
                              value === 3 ? "Bình thường" :
                              value === 4 ? "Tốt" : "Tuyệt vời"
                            }
                          </span>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Nhận xét của bạn</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này..."
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={cancelRating}>
                    Hủy
                  </Button>
                  <Button onClick={handleSubmitFeedback}>
                    Gửi đánh giá
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Dịch vụ chờ đánh giá</CardTitle>
              </CardHeader>
              <CardContent>
                {getUnratedServices().length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dịch vụ</TableHead>
                        <TableHead>Chuyên viên</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Giờ</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getUnratedServices().map((service) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.service}</TableCell>
                          <TableCell>{service.specialist}</TableCell>
                          <TableCell>{format(service.date, "dd/MM/yyyy")}</TableCell>
                          <TableCell>{format(service.date, "HH:mm")}</TableCell>
                          <TableCell className="text-right">
                            <Button onClick={() => startRating(service)}>
                              <PenLine className="mr-2 h-4 w-4" />
                              Đánh giá
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-10">
                    <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground opacity-20" />
                    <p className="mt-2 text-muted-foreground">Bạn không có dịch vụ nào cần đánh giá</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử đánh giá</CardTitle>
            </CardHeader>
            <CardContent>
              {feedback.length > 0 ? (
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{item.service}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(item.date, "dd/MM/yyyy HH:mm")}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-3">
                        <div className="bg-muted p-3 rounded-md">
                          <p className="text-sm font-medium mb-1">Đánh giá của bạn:</p>
                          <p className="text-sm">{item.feedback}</p>
                        </div>
                        
                        {item.response && (
                          <div className="bg-primary/5 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">Phản hồi:</p>
                            <p className="text-sm">{item.response}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground opacity-20" />
                  <p className="mt-2 text-muted-foreground">Bạn chưa có đánh giá nào</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserFeedback;
