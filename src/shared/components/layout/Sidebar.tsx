import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, LucideIcon, Menu, X } from 'lucide-react';
import { useAppDispatch } from '@/shared/hooks';
import { logoutUser } from '@/features/auth/store/authThunks';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  userName: string;
  userAvatar?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ menuItems, userName, userAvatar, isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Overlay للموبايل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:sticky top-0 right-0 h-screen bg-card border-l border-border z-50
          transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0 w-64' : 'translate-x-full lg:translate-x-0 lg:w-20'}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between gap-3">
            {isOpen && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="lg:hidden"
                >
                  <X className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-right">
                    <h3 className="font-bold text-sm">{userName}</h3>
                    <p className="text-xs text-muted-foreground">مرحباً بك</p>
                  </div>
                </div>
              </>
            )}
            {!isOpen && (
              <div className="w-full flex justify-center">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full gap-3 transition-all
                    ${isOpen ? 'justify-end text-right px-4' : 'justify-center px-2'}
                  `}
                  title={!isOpen ? item.label : undefined}
                >
                  {isOpen && <span>{item.label}</span>}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            className={`
              w-full gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all
              ${isOpen ? 'justify-end text-right px-4' : 'justify-center px-2'}
            `}
            onClick={handleLogout}
            title={!isOpen ? 'تسجيل الخروج' : undefined}
          >
            {isOpen && <span>تسجيل الخروج</span>}
            <LogOut className="w-5 h-5 flex-shrink-0" />
          </Button>
        </div>
      </div>
    </>
  );
};
