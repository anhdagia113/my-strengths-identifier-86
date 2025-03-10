
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

const blogs = [
  {
    id: "1",
    title: "5 bước chăm sóc da cơ bản mỗi ngày",
    description: "Khám phá quy trình 5 bước đơn giản giúp làn da của bạn luôn khỏe mạnh và rạng rỡ mỗi ngày.",
    image: "https://images.unsplash.com/photo-1498843053639-170ff2122f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    date: "15/06/2023",
    author: "Thu Hà"
  },
  {
    id: "2",
    title: "Cách chọn serum phù hợp với từng loại da",
    description: "Hướng dẫn chi tiết giúp bạn lựa chọn loại serum phù hợp nhất với làn da của mình.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    date: "02/07/2023",
    author: "Minh Tâm"
  },
  {
    id: "3",
    title: "Điều trị mụn hiệu quả tại nhà",
    description: "Những phương pháp và sản phẩm hiệu quả giúp điều trị mụn tại nhà an toàn.",
    image: "https://images.unsplash.com/photo-1643841364380-e990c1abf72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    date: "25/07/2023",
    author: "Thanh Thảo"
  }
];

const FeaturedBlogs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bài Viết Nổi Bật</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chia sẻ kiến thức và bí quyết chăm sóc da từ các chuyên gia hàng đầu
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.author}</span>
                </div>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-3">
                  {blog.description}
                </CardDescription>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/blog/${blog.id}`}>Đọc tiếp</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/blog">Xem tất cả bài viết</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
