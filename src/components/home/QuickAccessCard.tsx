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
        <Link to={to} className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          {children}
        </Link>
      );
    }
    return (
      <div className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full bg-${iconColor}/10 group-hover:bg-${iconColor}/20 transition-colors`}>
          <Icon className={`text-${iconColor} w-8 h-8`} />
        </div>
        <h3 className="text-xl font-semibold ml-4 text-black">{title}</h3>
      </div>
      <p className="text-black text-lg mb-4">
        {description}
      </p>
      {action}
    </CardWrapper>
  );
};

export default QuickAccessCard;