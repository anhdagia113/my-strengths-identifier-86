
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Clock, User } from "lucide-react";

// Blog post type definition
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
}

// Sample blog data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Bí quyết chăm sóc da mùa hanh khô",
    excerpt: "Làn da khô, bong tróc là nỗi lo thường trực trong mùa hanh khô. Hãy cùng khám phá những bí quyết giữ ẩm hiệu quả nhất.",
    content: "Mùa đông với không khí hanh khô luôn là thử thách lớn đối với làn da. Nhiệt độ thấp kết hợp với độ ẩm không khí giảm mạnh khiến da dễ bị khô, bong tróc và mất nước...",
    image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Bác sĩ Nguyễn Thị A",
    date: "2023-11-15",
    readTime: 5,
    category: "Chăm sóc da"
  },
  {
    id: "2",
    title: "Top 5 liệu trình chống lão hóa hiệu quả nhất",
    excerpt: "Khám phá những liệu trình chống lão hóa được các chuyên gia da liễu đánh giá cao và khuyên dùng.",
    content: "Lão hóa da là quá trình tự nhiên mà ai cũng phải trải qua. Tuy nhiên, với sự phát triển của khoa học công nghệ, chúng ta có thể làm chậm quá trình này...",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Chuyên gia Trần Văn B",
    date: "2023-10-20",
    readTime: 7,
    category: "Trẻ hóa da"
  },
  {
    id: "3",
    title: "Cách trị mụn hiệu quả tại nhà",
    excerpt: "Những phương pháp đơn giản giúp bạn loại bỏ mụn một cách hiệu quả mà không cần đến spa.",
    content: "Mụn là vấn đề phổ biến ảnh hưởng đến mọi lứa tuổi và loại da. Mặc dù có nhiều phương pháp điều trị tại các cơ sở thẩm mỹ, nhưng bạn cũng có thể áp dụng một số cách trị mụn hiệu quả tại nhà...",
    image: "https://images.unsplash.com/photo-1573461169001-478ce74c359e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Dược sĩ Phạm Thị C",
    date: "2023-09-05",
    readTime: 6,
    category: "Trị mụn"
  },
  {
    id: "4",
    title: "Các loại mặt nạ tự nhiên dưỡng da",
    excerpt: "Tận dụng những nguyên liệu tự nhiên có sẵn trong nhà bếp để làm đẹp da một cách an toàn và hiệu quả.",
    content: "Mặt nạ tự nhiên là lựa chọn an toàn và tiết kiệm để chăm sóc da. Với những nguyên liệu quen thuộc từ nhà bếp, bạn có thể tạo ra các loại mặt nạ phù hợp với từng loại da và giải quyết các vấn đề da khác nhau...",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Chuyên gia Lê Thị D",
    date: "2023-08-12",
    readTime: 4,
    category: "Chăm sóc da"
  },
  {
    id: "5",
    title: "Tác hại của tia UV và cách bảo vệ da",
    excerpt: "Tia UV là kẻ thù số một của làn da, gây ra nhiều vấn đề nghiêm trọng. Hãy tìm hiểu cách bảo vệ da hiệu quả.",
    content: "Tia UV từ mặt trời không chỉ gây ra cháy nắng, sạm da mà còn là nguyên nhân chính dẫn đến lão hóa sớm và thậm chí là ung thư da. Việc bảo vệ da khỏi tác hại của tia UV là vô cùng quan trọng...",
    image: "https://images.unsplash.com/photo-1638815752077-d1f7c1f7c4bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Bác sĩ Hoàng Văn E",
    date: "2023-07-18",
    readTime: 8,
    category: "Bảo vệ da"
  },
  {
    id: "6",
    title: "Chế độ ăn uống tốt cho làn da",
    excerpt: "Làn da khỏe đẹp bắt đầu từ bên trong. Khám phá những thực phẩm giúp nuôi dưỡng da từ gốc.",
    content: "Chế độ ăn uống đóng vai trò quan trọng trong việc duy trì làn da khỏe mạnh. Những thực phẩm giàu chất chống oxy hóa, vitamin và khoáng chất không chỉ tốt cho sức khỏe tổng thể mà còn giúp da sáng mịn, chống lại các dấu hiệu lão hóa...",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Chuyên gia dinh dưỡng Ngô Thị F",
    date: "2023-06-25",
    readTime: 5,
    category: "Dinh dưỡng"
  }
];

// Categories for filtering
const categories = ["Tất cả", "Chăm sóc da", "Trẻ hóa da", "Trị mụn", "Bảo vệ da", "Dinh dưỡng"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  useEffect(() => {
    let filtered = blogPosts;
    
    // Apply category filter
    if (activeCategory !== "Tất cả") {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
  }, [searchTerm, activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog làm đẹp & Chăm sóc da</h1>
        <p className="text-muted-foreground max-w-2xl">
          Khám phá những bài viết chuyên sâu về chăm sóc da, bí quyết làm đẹp và cách điều trị các vấn đề về da từ các chuyên gia hàng đầu.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.readTime} phút đọc</span>
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                  <span className="mx-2">•</span>
                  <User className="h-3 w-3 mr-1" />
                  <span>{post.author}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0">
                  <Link to={`/blog/${post.id}`}>Đọc tiếp</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">Không tìm thấy bài viết</h3>
          <p className="text-muted-foreground">Vui lòng thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
