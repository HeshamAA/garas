import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronDown, Search, School } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks";

interface HeaderProps {
  showTabs?: boolean;
}

const Header = ({ showTabs = true }: HeaderProps) => {
  const location = useLocation();
  const { user } = useAppSelector(state => state.auth);

  const schoolName = user?.school?.name || user?.name || "اسم المدرسة";
  const schoolLogo = user?.profileImage || user?.avatar;
  console.log(user)
  const tabs = [
    { name: "أولياء الأمور", path: "/parents" },
    { name: "الطلاب", path: "/students" },
    { name: "المستلمون", path: "/receivers" },
    { name: "طلبات الاستلام", path: "/requests" },
    { name: "الأعدادات", path: "/school-profile" },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" className="rounded-full bg-card text-foreground hover:bg-card/90 border-0">
            <ChevronDown className="w-4 h-4 ml-2" />
            اختر آخر
          </Button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{schoolName}</h1>
            <Avatar className="w-12 h-12 border-2 border-primary-foreground/20">
              <AvatarImage src={schoolLogo} alt={schoolName} />
              <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">
                {schoolLogo ? <School className="w-6 h-6" /> : getInitials(schoolName)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="bg-card rounded-2xl p-2">
            <Bell className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="relative">
          <Input
            placeholder="ابحث عن اسم الطالب او ولي الأمر"
            className="w-full bg-card text-foreground border-0 rounded-full h-14 pr-14 text-right placeholder:text-right shadow-lg"
          />
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
        </div>
      </div>

      {showTabs && (
        <div className="bg-primary/90 border-t border-primary-foreground/10">
          <div className="container mx-auto px-6">
            <div className="flex gap-8 justify-start">
              {tabs.map((tab) => (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`py-4 text-sm font-medium transition-colors relative ${
                    location.pathname === tab.path
                      ? "text-primary-foreground"
                      : "text-primary-foreground/70 hover:text-primary-foreground"
                  }`}
                >
                  {tab.name}
                  {location.pathname === tab.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-foreground rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;