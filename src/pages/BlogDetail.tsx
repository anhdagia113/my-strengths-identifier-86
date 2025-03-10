
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data for now, would be fetched from API in real implementation
const blogDetails = [
  {
    id: "1",
    title: "Bí quyết chăm sóc da mụn hiệu quả tại nhà",
    author: "Trần Thị Hoa",
    date: "2023-04-15",
    category: "Chăm sóc da",
    content: `
      <p>Mụn là một vấn đề da liễu phổ biến mà hầu hết mọi người đều gặp phải ít nhất một lần trong đời. Đặc biệt là ở tuổi thanh thiếu niên, khi cơ thể trải qua những thay đổi nội tiết tố, mụn trở thành nỗi ám ảnh của nhiều người.</p>
      
      <h2>Nguyên nhân gây mụn</h2>
      <p>Có nhiều yếu tố góp phần vào việc hình thành mụn:</p>
      <ul>
        <li>Tăng tiết bã nhờn: Khi các tuyến dầu sản xuất quá nhiều dầu, nó có thể kết hợp với tế bào da chết và tắc nghẽn lỗ chân lông.</li>
        <li>Vi khuẩn: Vi khuẩn P. acnes sinh sống trên da và có thể gây viêm khi lỗ chân lông bị tắc.</li>
        <li>Viêm: Khi cơ thể phản ứng với vi khuẩn, nó gây ra viêm, dẫn đến đỏ và sưng.</li>
        <li>Hormone: Thay đổi hormone, đặc biệt là trong tuổi dậy thì, thai kỳ và chu kỳ kinh nguyệt, có thể kích thích sản xuất dầu.</li>
        <li>Chế độ ăn uống: Một số nghiên cứu gợi ý rằng thực phẩm có chỉ số đường huyết cao và sữa có thể làm trầm trọng thêm tình trạng mụn.</li>
      </ul>
      
      <h2>Bí quyết chăm sóc da mụn tại nhà</h2>
      <p>Để kiểm soát và điều trị mụn hiệu quả, bạn có thể áp dụng những bí quyết sau:</p>
      
      <h3>1. Làm sạch da đúng cách</h3>
      <p>Rửa mặt hai lần một ngày bằng sữa rửa mặt dịu nhẹ, không chứa cồn. Tránh chà xát mạnh vì có thể gây kích ứng và làm mụn trở nên tồi tệ hơn.</p>
      
      <h3>2. Không nặn mụn</h3>
      <p>Nặn mụn có thể đẩy vi khuẩn sâu hơn vào da, gây viêm nhiễm và để lại sẹo. Hãy để mụn tự lành hoặc tìm đến phương pháp điều trị chuyên nghiệp.</p>
      
      <h3>3. Sử dụng sản phẩm không gây mụn</h3>
      <p>Tìm kiếm các sản phẩm được dán nhãn "không gây mụn" (non-comedogenic) hoặc "không dầu" (oil-free) để tránh tắc nghẽn lỗ chân lông.</p>
      
      <h3>4. Áp dụng các thành phần điều trị mụn</h3>
      <p>Benzoyl peroxide, axit salicylic và retinoid là những thành phần hiệu quả trong việc điều trị mụn. Tuy nhiên, chúng có thể gây khô da, vì vậy hãy bắt đầu với nồng độ thấp và tăng dần.</p>
      
      <h3>5. Giữ ẩm cho da</h3>
      <p>Ngay cả da dầu cũng cần được giữ ẩm. Sử dụng kem dưỡng ẩm không dầu để ngăn da tiết quá nhiều dầu để bù đắp cho tình trạng khô.</p>
      
      <h3>6. Bảo vệ da khỏi ánh nắng mặt trời</h3>
      <p>Ánh nắng mặt trời có thể làm đậm màu vết thâm do mụn và một số thuốc trị mụn có thể làm da nhạy cảm hơn với ánh nắng. Sử dụng kem chống nắng không gây mụn hàng ngày.</p>
      
      <h3>7. Chế độ ăn uống cân bằng</h3>
      <p>Một số nghiên cứu cho thấy thực phẩm có chỉ số đường huyết thấp và ít sữa có thể giúp cải thiện tình trạng mụn. Bổ sung nhiều rau xanh, trái cây và các nguồn protein nạc.</p>
      
      <h3>8. Quản lý stress</h3>
      <p>Stress có thể làm tăng sản xuất hormone gây mụn. Thực hành các kỹ thuật giảm stress như yoga, thiền định hoặc hít thở sâu.</p>
      
      <h2>Khi nào nên gặp bác sĩ da liễu?</h2>
      <p>Nếu mụn của bạn nghiêm trọng, để lại sẹo hoặc không đáp ứng với các phương pháp điều trị tại nhà sau 4-6 tuần, hãy tham khảo ý kiến của bác sĩ da liễu. Họ có thể đề xuất các phương pháp điều trị mạnh hơn như thuốc kháng sinh, retinoid uống hoặc các thủ thuật khác.</p>
      
      <p>Nhớ rằng, kiên nhẫn là chìa khóa khi điều trị mụn. Hầu hết các phương pháp điều trị mất 4-8 tuần để thấy kết quả đáng kể. Duy trì thói quen chăm sóc da đều đặn và tránh thử quá nhiều sản phẩm khác nhau trong thời gian ngắn.</p>
    `,
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["mụn", "chăm sóc da", "skincare"],
  },
  {
    id: "2",
    title: "5 kiểu tóc trẻ trung cho phụ nữ tuổi 40+",
    author: "Nguyễn Văn Nam",
    date: "2023-03-28",
    category: "Tóc",
    content: `
      <p>Ở độ tuổi 40+, nhiều phụ nữ mong muốn một kiểu tóc vừa phù hợp với lứa tuổi vừa mang lại vẻ trẻ trung, hiện đại. Bài viết này sẽ giới thiệu 5 kiểu tóc giúp bạn trẻ hóa diện mạo mà không cần đến phẫu thuật thẩm mỹ.</p>
      
      <h2>1. Bob ngắn layer</h2>
      <p>Kiểu tóc bob ngắn với các lớp layer tạo độ phồng và chuyển động cho mái tóc. Kiểu tóc này phù hợp với nhiều dáng khuôn mặt và rất dễ định hình. Nó giúp che giấu những dấu hiệu lão hóa như nếp nhăn ở cổ và làm cho khuôn mặt trông thon gọn hơn.</p>
      
      <h2>2. Pixie hiện đại</h2>
      <p>Pixie là một kiểu tóc táo bạo nhưng cực kỳ trẻ trung. Nó giúp tôn lên các đường nét khuôn mặt và đặc biệt là đôi mắt. Kiểu tóc này cũng rất dễ chăm sóc, tiết kiệm thời gian vào buổi sáng và có thể được tạo kiểu nhanh chóng với một ít wax hoặc gel.</p>
      
      <h2>3. Lob (Long Bob) xoăn nhẹ</h2>
      <p>Lob là sự kết hợp hoàn hảo giữa tóc ngắn và dài. Độ dài thường ngang vai hoặc dài hơn một chút. Thêm vào đó những lọn xoăn nhẹ sẽ tạo ra một kiểu tóc trẻ trung, nữ tính mà vẫn giữ được sự chuyên nghiệp cần thiết.</p>
      
      <h2>4. Tóc thẳng với mái thưa</h2>
      <p>Mái thưa có khả năng "ăn gian" tuổi tác một cách đáng kinh ngạc. Kết hợp với tóc thẳng dài hoặc ngang vai, kiểu tóc này tạo ra vẻ ngoài trẻ trung, năng động mà không kém phần tinh tế.</p>
      
      <h2>5. Tóc uốn xoăn lớn</h2>
      <p>Những lọn xoăn lớn, bồng bềnh mang lại vẻ sang trọng, quyến rũ cho phụ nữ tuổi 40+. Kiểu tóc này đặc biệt phù hợp với những dịp đặc biệt và có thể được biến tấu với nhiều độ dài khác nhau.</p>
      
      <h2>Lời khuyên khi chọn kiểu tóc</h2>
      <p>Khi lựa chọn kiểu tóc ở độ tuổi 40+, bạn nên cân nhắc những yếu tố sau:</p>
      <ul>
        <li>Khuôn mặt: Mỗi dáng khuôn mặt sẽ phù hợp với các kiểu tóc khác nhau. Tham khảo ý kiến của stylist để chọn kiểu tóc tôn lên ưu điểm của bạn.</li>
        <li>Cấu trúc tóc: Tóc mỏng, tóc dày, tóc thẳng hay tóc xoăn sẽ ảnh hưởng đến việc tạo kiểu. Chọn kiểu tóc phù hợp với cấu trúc tóc tự nhiên sẽ giúp bạn dễ dàng chăm sóc và tạo kiểu hàng ngày.</li>
        <li>Lối sống: Nếu bạn có lịch trình bận rộn, một kiểu tóc dễ chăm sóc như pixie hoặc bob sẽ phù hợp hơn.</li>
        <li>Màu tóc: Màu tóc phù hợp cũng góp phần làm trẻ hóa diện mạo. Các tông màu ấm như nâu caramel, vàng mật ong thường mang lại vẻ tự nhiên và trẻ trung hơn.</li>
      </ul>
      
      <p>Cuối cùng, sự tự tin là yếu tố quan trọng nhất. Bất kể bạn chọn kiểu tóc nào, hãy yêu quý và tự tin với nó. Thái độ tích cực sẽ giúp bạn tỏa sáng ở bất kỳ độ tuổi nào.</p>
    `,
    image: "https://images.unsplash.com/photo-1595237603223-597b9673e752?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["tóc", "thời trang", "làm đẹp"],
  },
  {
    id: "3",
    title: "Những bước cơ bản để có một làn da khỏe mạnh",
    author: "Lê Thị Hương",
    date: "2023-05-02",
    category: "Chăm sóc da",
    content: `
      <p>Làn da khỏe mạnh không chỉ giúp bạn trông đẹp hơn mà còn là dấu hiệu của sức khỏe tốt. Bài viết này sẽ hướng dẫn bạn những bước cơ bản nhất để chăm sóc da hàng ngày, phù hợp với mọi loại da.</p>
      
      <h2>1. Làm sạch da đúng cách</h2>
      <p>Làm sạch da là bước đầu tiên và quan trọng nhất trong quy trình chăm sóc da. Hãy chọn sữa rửa mặt phù hợp với loại da của bạn:</p>
      <ul>
        <li>Da dầu/hỗn hợp: Sử dụng gel rửa mặt không chứa dầu có khả năng kiểm soát dầu.</li>
        <li>Da khô/nhạy cảm: Chọn sữa rửa mặt dịu nhẹ, có thành phần dưỡng ẩm.</li>
        <li>Da thường: Hầu hết các loại sữa rửa mặt đều phù hợp, nhưng nên tránh các sản phẩm chứa nhiều hóa chất mạnh.</li>
      </ul>
      <p>Rửa mặt hai lần mỗi ngày, sáng và tối. Không rửa mặt quá nhiều lần sẽ làm mất đi lớp dầu tự nhiên bảo vệ da.</p>
      
      <h2>2. Toner - Cân bằng độ pH</h2>
      <p>Sau khi làm sạch, toner giúp cân bằng độ pH của da và chuẩn bị da tốt hơn cho các bước dưỡng tiếp theo. Toner hiện đại không còn chứa cồn gây khô da mà thường có các thành phần dưỡng ẩm, làm dịu và chống oxy hóa.</p>
      
      <h2>3. Serum - Điều trị các vấn đề da</h2>
      <p>Serum chứa nồng độ cao các thành phần hoạt tính giúp điều trị các vấn đề da cụ thể:</p>
      <ul>
        <li>Vitamin C: Làm sáng da, chống oxy hóa</li>
        <li>Retinol: Chống lão hóa, kích thích tái tạo tế bào</li>
        <li>Axit hyaluronic: Cấp ẩm sâu</li>
        <li>Niacinamide: Kiểm soát dầu, làm đều màu da</li>
        <li>Axit salicylic: Trị mụn, thông thoáng lỗ chân lông</li>
      </ul>
      <p>Chọn serum phù hợp với nhu cầu da của bạn và thoa sau bước toner.</p>
      
      <h2>4. Dưỡng ẩm - Bảo vệ hàng rào da</h2>
      <p>Dưỡng ẩm là bước không thể thiếu, ngay cả với da dầu. Kem dưỡng ẩm giúp khóa ẩm, bảo vệ hàng rào da và ngăn ngừa mất nước qua da.</p>
      <ul>
        <li>Da dầu: Gel dưỡng ẩm hoặc lotion không dầu</li>
        <li>Da thường: Lotion hoặc kem dưỡng ẩm nhẹ</li>
        <li>Da khô: Kem dưỡng ẩm giàu dinh dưỡng</li>
        <li>Da nhạy cảm: Các sản phẩm không hương liệu, ít thành phần</li>
      </ul>
      
      <h2>5. Kem chống nắng - Bảo vệ tối ưu</h2>
      <p>Áp dụng kem chống nắng có chỉ số SPF ít nhất 30 mỗi ngày, ngay cả khi trời nhiều mây. Tia UV là nguyên nhân chính dẫn đến lão hóa sớm, đốm nâu và tăng nguy cơ ung thư da.</p>
      <p>Có hai loại kem chống nắng chính:</p>
      <ul>
        <li>Chống nắng vật lý: Chứa zinc oxide hoặc titanium dioxide, phản chiếu tia UV.</li>
        <li>Chống nắng hóa học: Hấp thụ tia UV và chuyển đổi thành nhiệt năng.</li>
      </ul>
      
      <h2>6. Tẩy tế bào chết - Đổi mới làn da</h2>
      <p>Tẩy tế bào chết 1-3 lần/tuần tùy loại da giúp loại bỏ tế bào chết, kích thích tái tạo tế bào mới và làm thông thoáng lỗ chân lông.</p>
      <ul>
        <li>Tẩy tế bào chết hóa học: Sử dụng các axit như AHA, BHA nhẹ nhàng hòa tan tế bào chết.</li>
        <li>Tẩy tế bào chết vật lý: Sử dụng các hạt mịn để loại bỏ tế bào chết. Nên dùng cho da không nhạy cảm.</li>
      </ul>
      
      <h2>7. Mặt nạ - Tăng cường dưỡng chất</h2>
      <p>Sử dụng mặt nạ 1-2 lần/tuần để cung cấp thêm dưỡng chất và giải quyết các vấn đề da cụ thể. Có nhiều loại mặt nạ như mặt nạ đất sét (kiểm soát dầu), mặt nạ sheet (cấp ẩm), mặt nạ ngủ (dưỡng ẩm qua đêm)...</p>
      
      <h2>Điều chỉnh theo mùa</h2>
      <p>Quy trình chăm sóc da nên được điều chỉnh theo mùa:</p>
      <ul>
        <li>Mùa đông: Tăng cường dưỡng ẩm, sử dụng sản phẩm dịu nhẹ hơn.</li>
        <li>Mùa hè: Sử dụng các sản phẩm nhẹ hơn, tăng cường chống nắng.</li>
      </ul>
      
      <h2>Lối sống lành mạnh cho làn da đẹp</h2>
      <p>Ngoài quy trình chăm sóc da, những yếu tố sau cũng ảnh hưởng đến sức khỏe làn da:</p>
      <ul>
        <li>Chế độ ăn giàu chất chống oxy hóa từ trái cây và rau quả.</li>
        <li>Uống đủ nước mỗi ngày.</li>
        <li>Hạn chế đồ uống có cồn và cafein.</li>
        <li>Ngủ đủ 7-8 tiếng mỗi đêm.</li>
        <li>Quản lý stress hiệu quả.</li>
        <li>Tập thể dục đều đặn.</li>
        <li>Không hút thuốc.</li>
      </ul>
      
      <p>Hãy nhớ rằng, một làn da khỏe đẹp cần thời gian và sự kiên trì. Kết quả không đến ngay lập tức, nhưng nếu bạn duy trì quy trình chăm sóc da đúng đắn, bạn sẽ thấy sự cải thiện rõ rệt sau vài tuần đến vài tháng.</p>
    `,
    image: "https://images.unsplash.com/photo-1674758419572-d6f92a734a26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["chăm sóc da", "skincare", "làm đẹp"],
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogDetails.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Bài viết không tồn tại</h2>
          <Link to="/blog">
            <Button className="mt-4">Quay lại trang blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-6">
          <Link to="/blog">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách bài viết
            </Button>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover w-full h-64 sm:h-96"
            />
          </div>
          <div className="p-6 sm:p-8">
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 text-sm font-medium rounded-full">
                {blog.category}
              </span>
              <div className="mt-2 text-sm text-muted-foreground">
                {new Date(blog.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" · "}
                {blog.author}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {blog.title}
            </h1>
            <div
              className="prose prose-sm sm:prose lg:prose-lg mx-auto text-foreground"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
