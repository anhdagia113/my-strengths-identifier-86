
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SidebarHeader from "@/components/dashboard/SidebarHeader";
import SidebarContent from "@/components/dashboard/SidebarContent";
import SidebarFooter from "@/components/dashboard/SidebarFooter";
import MobileTopbar from "@/components/dashboard/MobileTopbar";

interface DashboardLayoutProps {
  requiredRole?: string;
}

const DashboardLayout = ({ requiredRole = "user" }: DashboardLayoutProps) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      {/* Mobile Topbar */}
      <MobileTopbar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
      />

      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static top-0 left-0 z-40 h-full w-[280px] border-r bg-background transition-transform duration-300 lg:transition-none pt-16 lg:pt-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <SidebarHeader />
          
          {/* Sidebar Content/Navigation */}
          <SidebarContent user={user} />
          
          {/* Sidebar Footer */}
          <SidebarFooter user={user} onLogout={handleLogout} />
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
