import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type SkinType = "Dầu" | "Khô" | "Hỗn hợp" | "Thường";

// Define quiz questions
const questions = [
  {
    id: 1,
    question: "Làn da của bạn cảm thấy thế nào vào buổi sáng sau khi rửa mặt?",
    options: [
      { value: "Dầu", label: "Bóng nhờn, đặc biệt ở vùng chữ T" },
      { value: "Khô", label: "Căng và khô" },
      { value: "Hỗn hợp", label: "Vùng chữ T hơi bóng, má khô" },
      { value: "Thường", label: "Bình thường, không quá khô hay nhờn" }
    ]
  },
  {
    id: 2,
    question: "Lỗ chân lông của bạn như thế nào?",
    options: [
      { value: "Dầu", label: "Nổi rõ, đặc biệt ở vùng chữ T" },
      { value: "Khô", label: "Gần như không nhìn thấy" },
      { value: "Hỗn hợp", label: "Nổi rõ ở vùng chữ T, khó nhìn thấy ở má" },
      { value: "Thường", label: "Khó nhìn thấy" }
    ]
  },
  {
    id: 3,
    question: "Làn da của bạn phản ứng thế nào với ánh nắng mặt trời?",
    options: [
      { value: "Dầu", label: "Dễ bóng nhờn hơn" },
      { value: "Khô", label: "Dễ bị khô và bong tróc" },
      { value: "Hỗn hợp", label: "Vùng chữ T bóng nhờn, má khô hơn" },
      { value: "Thường", label: "Đều màu, ít thay đổi" }
    ]
  },
  {
    id: 4,
    question: "Bạn có thường xuyên bị mụn không?",
    options: [
      { value: "Dầu", label: "Thường xuyên, đặc biệt là vùng chữ T" },
      { value: "Khô", label: "Hiếm khi" },
      { value: "Hỗn hợp", label: "Đôi khi, chủ yếu ở vùng chữ T" },
      { value: "Thường", label: "Thỉnh thoảng" }
    ]
  },
  {
    id: 5,
    question: "Làn da của bạn có dễ bị đỏ, ngứa hoặc kích ứng không?",
    options: [
      { value: "Dầu", label: "Hiếm khi" },
      { value: "Khô", label: "Thường xuyên" },
      { value: "Hỗn hợp", label: "Đôi khi ở vùng má" },
      { value: "Thường", label: "Hiếm khi" }
    ]
  }
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [skinTypeResult, setSkinTypeResult] = useState<SkinType | null>(null);

  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (answers[currentQuestionIndex]) {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Calculate result
        calculateResult();
      }
    } else {
      toast.error("Vui lòng chọn một đáp án");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResult = () => {
    // Count occurrences of each skin type
    const counts: Record<SkinType, number> = {
      "Dầu": 0,
      "Khô": 0,
      "Hỗn hợp": 0,
      "Thường": 0
    };

    answers.forEach(answer => {
      counts[answer as SkinType] += 1;
    });

    // Find the skin type with the most occurrences
    let result: SkinType = "Thường";
    let maxCount = 0;

    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        result = type as SkinType;
      }
    });

    setSkinTypeResult(result);
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setSkinTypeResult(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">Trắc nghiệm loại da</h1>
        <div className="max-w-3xl mx-auto">
          {!showResult ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
                  </span>
                  <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                <CardTitle className="mt-4 text-xl">
                  {currentQuestion.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={answers[currentQuestionIndex]}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50"
                    >
                      <RadioGroupItem value={option.value} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Quay lại
                  </Button>
                  <Button onClick={goToNextQuestion}>
                    {currentQuestionIndex === totalQuestions - 1
                      ? "Xem kết quả"
                      : "Tiếp theo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Kết quả trắc nghiệm</CardTitle>
                <CardDescription className="text-center">
                  Dựa trên các câu trả lời của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Loại da của bạn:</h3>
                  <p className="text-3xl font-bold text-primary">Da {skinTypeResult}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Đặc điểm da {skinTypeResult}:</h3>
                  
                  {skinTypeResult === "Dầu" && (
                    <p>Da dầu thường bóng nhờn, lỗ chân lông to và dễ bị mụn. Cần chọn sản phẩm không dầu và sử dụng toner cân bằng độ pH.</p>
                  )}
                  
                  {skinTypeResult === "Khô" && (
                    <p>Da khô thường căng, có thể bong tróc và nhạy cảm. Cần sử dụng kem dưỡng ẩm đậm đặc và tránh các sản phẩm có cồn.</p>
                  )}
                  
                  {skinTypeResult === "Hỗn hợp" && (
                    <p>Da hỗn hợp thường dầu ở vùng chữ T và khô ở hai má. Cần phương pháp chăm sóc riêng cho từng vùng da.</p>
                  )}
                  
                  {skinTypeResult === "Thường" && (
                    <p>Da thường có độ ẩm cân bằng, ít gặp vấn đề và dễ chăm sóc. Cần duy trì chế độ chăm sóc đơn giản và đều đặn.</p>
                  )}

                  <h3 className="font-semibold">Các dịch vụ phù hợp:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {skinTypeResult === "Dầu" && (
                      <>
                        <li>Trị mụn chuyên sâu</li>
                        <li>Điều trị se khít lỗ chân lông</li>
                        <li>Làm sạch chuyên sâu</li>
                      </>
                    )}
                    
                    {skinTypeResult === "Khô" && (
                      <>
                        <li>Trẻ hóa da</li>
                        <li>Chăm sóc da cơ bản</li>
                        <li>Phục hồi da hư tổn</li>
                      </>
                    )}
                    
                    {skinTypeResult === "Hỗn hợp" && (
                      <>
                        <li>Cân bằng da</li>
                        <li>Trị mụn chuyên sâu</li>
                        <li>Chăm sóc da cơ bản</li>
                      </>
                    )}
                    
                    {skinTypeResult === "Thường" && (
                      <>
                        <li>Chăm sóc da cơ bản</li>
                        <li>Trẻ hóa da</li>
                        <li>Dưỡng ẩm chuyên sâu</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <Button onClick={restartQuiz} variant="outline">
                    Làm lại trắc nghiệm
                  </Button>
                  <Button asChild>
                    <Link to="/booking">Đặt lịch tư vấn ngay</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
