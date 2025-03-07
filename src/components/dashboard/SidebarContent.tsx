
import React from "react";
import { useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Calendar, Settings, 
  User, ChevronDown 
} from "lucide-react";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import SidebarNavLink from "./SidebarNavLink";
import { Link } from "react-router-dom";

interface SidebarContentProps {
  user: any;
}

const SidebarContent = ({ user }: SidebarContentProps) => {
  const location = useLocation();
  
  // Check if current path matches link
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex-1 py-6 space-y-1 overflow-y-auto">
      <SidebarNavLink 
        to="/dashboard" 
        icon={<LayoutDashboard size={20} />} 
        isActive={isActiveLink("/dashboard")}
      >
        Tổng quan
      </SidebarNavLink>
      
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
      
      <SidebarNavLink 
        to="/dashboard/bookings" 
        icon={<Calendar size={20} />}
        isActive={isActiveLink("/dashboard/bookings")}
      >
        Lịch đặt
      </SidebarNavLink>
      
      <SidebarNavLink 
        to="/dashboard/profile" 
        icon={<User size={20} />}
        isActive={isActiveLink("/dashboard/profile")}
      >
        Thông tin cá nhân
      </SidebarNavLink>
      
      <SidebarNavLink 
        to="/dashboard/settings" 
        icon={<Settings size={20} />}
        isActive={isActiveLink("/dashboard/settings")}
      >
        Cài đặt
      </SidebarNavLink>
    </div>
  );
};

export default SidebarContent;
