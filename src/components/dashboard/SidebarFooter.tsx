
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SidebarFooterProps {
  user: any;
  onLogout: () => void;
}

const SidebarFooter = ({ user, onLogout }: SidebarFooterProps) => {
  return (
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
      <Button variant="outline" className="w-full" onClick={onLogout}>
        <LogOut size={16} className="mr-2" />
        Đăng xuất
      </Button>
    </div>
  );
};

export default SidebarFooter;
