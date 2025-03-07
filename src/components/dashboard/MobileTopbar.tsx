
import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";
import { Menu, X } from "lucide-react";

interface MobileTopbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const MobileTopbar = ({ isSidebarOpen, toggleSidebar }: MobileTopbarProps) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 z-50 w-full bg-background border-b p-4 flex items-center justify-between">
      <Logo />
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>
    </div>
  );
};

export default MobileTopbar;
