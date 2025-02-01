import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAccessCardProps {
  to?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  action?: React.ReactNode;
  delay?: number;
}

const QuickAccessCard = ({ 
  to, 
  icon: Icon, 
  title, 
  description, 
  iconColor = "primary", 
  action,
  delay = 0 
}: QuickAccessCardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (to) {
      return (
        <Link to={to} className="block">
          <div className="group relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/60 border border-white/50 overflow-hidden animate-slide-in" style={{ animationDelay: `${delay}ms` }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {children}
          </div>
        </Link>
      );
    }
    return (
      <div className="group relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/60 border border-white/50 overflow-hidden animate-slide-in" style={{ animationDelay: `${delay}ms` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-${iconColor}/20 group-hover:bg-${iconColor}/30 transition-colors duration-300`}>
            <Icon className={`w-6 h-6 text-${iconColor}-600 group-hover:scale-110 transition-transform duration-300 animate-float`} />
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-all duration-300">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
        {action && (
          <div className="pt-4">
            {action}
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default QuickAccessCard;