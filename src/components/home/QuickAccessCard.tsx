import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickAccessCardProps {
  to?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  action?: React.ReactNode;
}

const QuickAccessCard = ({ to, icon: Icon, title, description, iconColor = "primary", action }: QuickAccessCardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (to) {
      return (
        <Link to={to} className="block">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/90 border border-gray-100">
            {children}
          </div>
        </Link>
      );
    }
    return (
      <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/90 border border-gray-100">
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-${iconColor}/10 group-hover:bg-${iconColor}/20 transition-colors`}>
            <Icon className={`w-6 h-6 text-${iconColor} group-hover:scale-110 transition-transform`} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
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