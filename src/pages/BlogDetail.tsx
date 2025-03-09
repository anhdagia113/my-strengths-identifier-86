
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react";

// Import the blog post type and sample data from Blog.tsx
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

// Sample blog data (same as in Blog.tsx)
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Bí quyết chăm sóc da mùa hanh khô",
    excerpt: "Làn da khô, bong tróc là nỗi lo thường trực trong mùa hanh khô. Hãy cùng khám phá những bí quyết giữ ẩm hiệu quả nhất.",
    content: `
    <p>Mùa đông với không khí hanh khô luôn là thử thách lớn đối với làn da. Nhiệt độ thấp kết hợp với độ ẩm không khí giảm mạnh khiến da dễ bị khô, bong tróc và mất nước.</p>
    
    <h2>Nguyên nhân khiến da khô trong mùa đông</h2>
    
    <p>Có nhiều yếu tố khiến da bị khô trong mùa đông:</p>
    <ul>
      <li>Không khí lạnh có độ ẩm thấp</li>
      <li>Sử dụng máy sưởi làm giảm độ ẩm trong không khí</li>
      <li>Tắm nước nóng làm mất đi lớp dầu tự nhiên trên da</li>
      <li>Thiếu nước uống</li>
    </ul>
    
    <h2>Các bước chăm sóc da cơ bản trong mùa đông</h2>
    
    <h3>1. Làm sạch nhẹ nhàng</h3>
    <p>Trong mùa đông, bạn nên chọn các sản phẩm làm sạch dịu nhẹ, không chứa sulfate và có độ pH cân bằng. Tránh sử dụng nước quá nóng khi rửa mặt vì sẽ làm mất đi lớp dầu tự nhiên của da.</p>
    
    <h3>2. Dưỡng ẩm chuyên sâu</h3>
    <p>Sử dụng kem dưỡng ẩm dạng kem (cream) thay vì lotion. Các thành phần như ceramide, hyaluronic acid, glycerin và các loại dầu tự nhiên (như dầu jojoba, dầu argan) là lựa chọn tuyệt vời để khóa ẩm cho da.</p>
    
    <h3>3. Tẩy tế bào chết đúng cách</h3>
    <p>Tẩy tế bào chết là bước quan trọng để loại bỏ lớp da chết, giúp các sản phẩm dưỡng da thẩm thấu tốt hơn. Tuy nhiên, trong mùa đông, bạn nên giảm tần suất tẩy da xuống 1-2 lần/tuần và chọn các sản phẩm dịu nhẹ.</p>
    
    <h3>4. Sử dụng serum dưỡng ẩm</h3>
    <p>Serum với thành phần hyaluronic acid, vitamin B5, ceramide giúp tăng cường độ ẩm cho da. Sử dụng serum trước khi thoa kem dưỡng ẩm để đạt hiệu quả tối ưu.</p>
    
    <h3>5. Không quên kem chống nắng</h3>
    <p>Tia UV vẫn có hại cho da ngay cả trong mùa đông. Sử dụng kem chống nắng hàng ngày để bảo vệ da khỏi tác hại của ánh nắng mặt trời.</p>
    
    <h2>Các mẹo bổ sung</h2>
    
    <p>Ngoài chăm sóc da từ bên ngoài, bạn nên:</p>
    <ul>
      <li>Uống đủ nước (2-3 lít mỗi ngày)</li>
      <li>Sử dụng máy tạo độ ẩm trong phòng</li>
      <li>Bổ sung omega-3 và vitamin E trong chế độ ăn</li>
      <li>Tránh tắm quá lâu với nước nóng</li>
      <li>Sử dụng mặt nạ dưỡng ẩm 1-2 lần/tuần</li>
    </ul>
    
    <p>Với những bí quyết trên, hy vọng bạn sẽ có được làn da khỏe mạnh, mềm mại suốt mùa đông này!</p>
    `,
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
    content: `
    <p>Lão hóa da là quá trình tự nhiên mà ai cũng phải trải qua. Tuy nhiên, với sự phát triển của khoa học công nghệ, chúng ta có thể làm chậm quá trình này và duy trì làn da tươi trẻ lâu hơn.</p>
    
    <h2>Các dấu hiệu lão hóa da phổ biến</h2>
    <p>Trước khi tìm hiểu về các liệu trình chống lão hóa, hãy nhận biết các dấu hiệu lão hóa da:</p>
    <ul>
      <li>Nếp nhăn và đường chân chim</li>
      <li>Da chảy xệ, mất độ đàn hồi</li>
      <li>Sạm nám, đốm nâu</li>
      <li>Da khô, thiếu độ ẩm</li>
      <li>Lỗ chân lông to</li>
      <li>Vết đỏ, mao mạch nổi</li>
    </ul>
    
    <h2>Top 5 liệu trình chống lão hóa hiệu quả</h2>
    
    <h3>1. Liệu trình Retinol</h3>
    <p>Retinol (dẫn xuất từ vitamin A) được coi là "vàng" trong việc chống lão hóa. Thành phần này giúp tăng sản sinh collagen, đẩy nhanh quá trình tái tạo tế bào da, làm mờ nếp nhăn và cải thiện kết cấu da.</p>
    <p><strong>Hiệu quả:</strong> Giảm nếp nhăn, cải thiện độ đều màu da, làm mờ đốm nâu và thu nhỏ lỗ chân lông.</p>
    <p><strong>Lưu ý:</strong> Bắt đầu với nồng độ thấp (0.25-0.3%) và tăng dần theo thời gian. Sử dụng vào buổi tối và luôn bôi kem chống nắng vào ban ngày.</p>
    
    <h3>2. Liệu trình Vitamin C</h3>
    <p>Vitamin C là chất chống oxy hóa mạnh, giúp bảo vệ da khỏi tác hại của gốc tự do, kích thích sản sinh collagen và làm sáng da.</p>
    <p><strong>Hiệu quả:</strong> Làm sáng da, giảm nám, tăng độ đàn hồi và bảo vệ da khỏi tác hại của tia UV.</p>
    <p><strong>Lưu ý:</strong> Sử dụng vào buổi sáng trước khi bôi kem chống nắng. Bảo quản sản phẩm nơi tối, mát để vitamin C không bị oxy hóa.</p>
    
    <h3>3. Liệu trình Peptide</h3>
    <p>Peptide là chuỗi axit amin ngắn giúp kích thích sản sinh collagen và elastin, hai protein quan trọng duy trì độ đàn hồi và săn chắc của da.</p>
    <p><strong>Hiệu quả:</strong> Giảm nếp nhăn, tăng độ đàn hồi, cải thiện kết cấu da.</p>
    <p><strong>Lưu ý:</strong> Có thể sử dụng cả sáng và tối, kết hợp tốt với hầu hết các thành phần dưỡng da khác.</p>
    
    <h3>4. Liệu trình AHA/BHA</h3>
    <p>Alpha Hydroxy Acids (AHA) như glycolic acid và Beta Hydroxy Acids (BHA) như salicylic acid giúp tẩy tế bào chết, thúc đẩy tái tạo tế bào da và cải thiện kết cấu da.</p>
    <p><strong>Hiệu quả:</strong> Làm mịn bề mặt da, giảm vết thâm, cải thiện kết cấu da và giảm nếp nhăn mịn.</p>
    <p><strong>Lưu ý:</strong> Sử dụng vào buổi tối, bắt đầu với nồng độ thấp (5-7%) và tăng dần. Luôn bôi kem chống nắng vào ban ngày.</p>
    
    <h3>5. Liệu trình Hyaluronic Acid</h3>
    <p>Hyaluronic Acid (HA) là thành phần giữ ẩm tự nhiên, có khả năng giữ nước gấp 1000 lần trọng lượng của nó, giúp da căng mọng, đầy đặn.</p>
    <p><strong>Hiệu quả:</strong> Dưỡng ẩm sâu, làm đầy nếp nhăn, tăng độ đàn hồi cho da.</p>
    <p><strong>Lưu ý:</strong> Có thể sử dụng cả sáng và tối, hiệu quả tốt nhất khi thoa lên da ẩm.</p>
    
    <h2>Lời khuyên cho liệu trình chống lão hóa hiệu quả</h2>
    <ul>
      <li>Kiên trì và nhất quán: Kết quả thường thấy rõ sau 8-12 tuần sử dụng.</li>
      <li>Kết hợp nhiều phương pháp: Phối hợp các thành phần chống lão hóa để đạt hiệu quả tối ưu.</li>
      <li>Chống nắng mỗi ngày: Tia UV là nguyên nhân hàng đầu gây lão hóa sớm.</li>
      <li>Chế độ ăn uống lành mạnh: Bổ sung thực phẩm giàu chất chống oxy hóa.</li>
      <li>Ngủ đủ giấc: Da tái tạo tốt nhất trong giấc ngủ.</li>
    </ul>
    
    <p>Hãy nhớ rằng, mỗi người có loại da và vấn đề da khác nhau. Tham khảo ý kiến bác sĩ da liễu hoặc chuyên gia da liễu để có liệu trình phù hợp nhất với làn da của bạn.</p>
    `,
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

// Sample related posts data
const getRelatedPosts = (currentPostId: string, category: string) => {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, 3);
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foundPost = blogPosts.find(post => post.id === id);
      setPost(foundPost || null);
      
      if (foundPost) {
        setRelatedPosts(getRelatedPosts(foundPost.id, foundPost.category));
      }
    }
  }, [id]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
        <p className="mb-8">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại trang Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại trang Blog
        </Link>
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="flex items-center mr-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} phút đọc</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
          />
        </div>
        
        <div className="flex justify-between mb-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Chia sẻ
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Lưu
            </Button>
          </div>
        </div>
        
        <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title} 
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline">{relatedPost.category}</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{relatedPost.readTime} phút đọc</span>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h3>
                    <Button asChild variant="link" className="px-0">
                      <Link to={`/blog/${relatedPost.id}`}>Đọc tiếp</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
