
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Thông tin công ty */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">BeautyCare</h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi cung cấp các dịch vụ chăm sóc da chuyên nghiệp, được thực hiện bởi đội ngũ 
              chuyên viên giàu kinh nghiệm và trang thiết bị hiện đại.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link to="/specialists" className="text-gray-600 hover:text-primary transition-colors">
                  Chuyên viên
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-600 hover:text-primary transition-colors">
                  Trắc nghiệm da
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-600 hover:text-primary transition-colors">
                  Đặt lịch
                </Link>
              </li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Chăm sóc da cơ bản
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Trị liệu chuyên sâu
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Massage và thư giãn
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Điều trị nám và tàn nhang
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-primary transition-colors">
                  Trẻ hóa da
                </Link>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-600">
                  (028) 3123 4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-600">
                  info@beautycare.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BeautyCare. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
