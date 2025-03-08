
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        
        // Redirect based on role
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Failed to parse user data", error);
        toast.error("Lỗi khi đọc thông tin người dùng");
        navigate("/login");
      }
    } else {
      toast.error("Bạn cần đăng nhập để truy cập trang này");
      navigate("/login");
    }
  }, [navigate]);

  // Loading state
  if (!user) {
    return <div className="flex items-center justify-center h-screen">Đang tải...</div>;
  }

  return null; // Actual rendering is handled by the redirect
};

export default Dashboard;
