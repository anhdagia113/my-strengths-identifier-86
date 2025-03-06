
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-primary">
            BeautyCare
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/services" className="hover:text-primary transition-colors">
              Dịch vụ
            </Link>
            <Link to="/specialists" className="hover:text-primary transition-colors">
              Chuyên viên
            </Link>
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to="/quiz" className="hover:text-primary transition-colors">
              Trắc nghiệm da
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Đăng ký</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
