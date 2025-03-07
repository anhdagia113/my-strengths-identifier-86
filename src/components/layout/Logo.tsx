
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

const Logo = ({ className, iconOnly = false }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2 font-semibold text-primary", 
        className
      )}
    >
      <div className="bg-primary text-primary-foreground p-1.5 rounded-lg inline-flex items-center justify-center">
        <Sparkles className="h-5 w-5" />
      </div>
      
      {!iconOnly && (
        <span className="text-xl tracking-tight">BeautyCare</span>
      )}
    </Link>
  );
};

export default Logo;
