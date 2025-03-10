
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
        
        // Redirect based on role only once, not in an infinite loop
        if (userData.role === "admin" && window.location.pathname === "/dashboard") {
          navigate("/admin");
        } else if (userData.role === "user" && window.location.pathname !== "/dashboard") {
          // Only redirect to dashboard if we're not already there
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

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold">Chào mừng, {user.firstName || 'Người dùng'}!</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard content here */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Thông tin tài khoản</h2>
          <p className="mt-2">Email: {user.email}</p>
          <p className="mt-1">Vai trò: {user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
