
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary transition-colors font-medium">
              Trang chủ
            </Link>
            <Link to="/services" className="hover:text-primary transition-colors font-medium">
              Dịch vụ
            </Link>
            <Link to="/specialists" className="hover:text-primary transition-colors font-medium">
              Chuyên viên
            </Link>
            <Link to="/booking" className="hover:text-primary transition-colors font-medium">
              Đặt lịch
            </Link>
            <Link to="/quiz" className="hover:text-primary transition-colors font-medium">
              Trắc nghiệm da
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/login">Đăng nhập</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Đăng ký</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 border-t mt-3 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-primary transition-colors px-2 py-1.5 rounded font-medium">
                Trang chủ
              </Link>
              <Link to="/services" className="hover:text-primary transition-colors px-2 py-1.5 rounded font-medium">
                Dịch vụ
              </Link>
              <Link to="/specialists" className="hover:text-primary transition-colors px-2 py-1.5 rounded font-medium">
                Chuyên viên
              </Link>
              <Link to="/booking" className="hover:text-primary transition-colors px-2 py-1.5 rounded font-medium">
                Đặt lịch
              </Link>
              <Link to="/quiz" className="hover:text-primary transition-colors px-2 py-1.5 rounded font-medium">
                Trắc nghiệm da
              </Link>
            </div>
            <div className="pt-2 flex gap-2">
              <Button variant="outline" asChild className="flex-1">
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/register">Đăng ký</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
