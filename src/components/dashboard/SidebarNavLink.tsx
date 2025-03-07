
import React from "react";
import { Link } from "react-router-dom";

interface SidebarNavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive: boolean;
}

const SidebarNavLink = ({ to, icon, children, isActive }: SidebarNavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={`px-6 py-3 flex items-center space-x-3 ${
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-muted"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default SidebarNavLink;
