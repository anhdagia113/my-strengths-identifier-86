
import { useState, useEffect } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";
import { 
  LayoutDashboard, Users, Calendar, Settings, 
  User, LogOut, Menu, X, ChevronDown 
} from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

interface DashboardLayoutProps {
  requiredRole?: string;
}

const DashboardLayout = ({ requiredRole = "user" }: DashboardLayoutProps) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (isLoggedIn && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Check if current path matches link
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  // If still loading, show nothing
  if (isLoading) {
    return null;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If doesn't have required role, redirect to home
  if (requiredRole === "admin" && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-50 w-full bg-background border-b p-4 flex items-center justify-between">
        <Logo />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static top-0 left-0 z-40 h-full w-[280px] border-r bg-background transition-transform duration-300 lg:transition-none pt-16 lg:pt-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b">
            <Logo />
          </div>
          
          {/* Sidebar Links */}
          <div className="flex-1 py-6 space-y-1 overflow-y-auto">
            <Link 
              to="/dashboard" 
              className={`px-6 py-3 flex items-center space-x-3 ${
                isActiveLink("/dashboard") 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Tổng quan</span>
            </Link>
            
            {user.role === "admin" && (
              <Collapsible>
                <CollapsibleTrigger className="w-full px-6 py-3 flex items-center justify-between hover:bg-muted">
                  <div className="flex items-center space-x-3">
                    <Users size={20} />
                    <span>Quản lý người dùng</span>
                  </div>
                  <ChevronDown size={16} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Link 
                    to="/dashboard/users" 
                    className={`pl-14 pr-6 py-2 flex items-center space-x-3 ${
                      isActiveLink("/dashboard/users") 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <span>Danh sách người dùng</span>
                  </Link>
                  <Link 
                    to="/dashboard/roles" 
                    className={`pl-14 pr-6 py-2 flex items-center space-x-3 ${
                      isActiveLink("/dashboard/roles") 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <span>Phân quyền</span>
                  </Link>
                </CollapsibleContent>
              </Collapsible>
            )}
            
            <Link 
              to="/dashboard/bookings" 
              className={`px-6 py-3 flex items-center space-x-3 ${
                isActiveLink("/dashboard/bookings") 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              }`}
            >
              <Calendar size={20} />
              <span>Lịch đặt</span>
            </Link>
            
            <Link 
              to="/dashboard/profile" 
              className={`px-6 py-3 flex items-center space-x-3 ${
                isActiveLink("/dashboard/profile") 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              }`}
            >
              <User size={20} />
              <span>Thông tin cá nhân</span>
            </Link>
            
            <Link 
              to="/dashboard/settings" 
              className={`px-6 py-3 flex items-center space-x-3 ${
                isActiveLink("/dashboard/settings") 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              }`}
            >
              <Settings size={20} />
              <span>Cài đặt</span>
            </Link>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-6 border-t">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.email}</span>
                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 pt-16 lg:pt-0">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
