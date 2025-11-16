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
          transition-all duration-300 ease-in-out flex flex-col justify-between
          ${isOpen ? 'translate-x-0 w-64' : 'translate-x-full lg:translate-x-0 lg:w-20'}
        `}
      >
        {/* Header */}
       

        {/* Navigation */}
        <nav className="flex flex-col p-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path} className=''>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full gap-3 transition-all
                    ${isOpen ? 'justify-start text-right px-4' : 'justify-center px-2'}
                  `}
                  title={!isOpen ? item.label : undefined}
                >
                   <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className='text-right'>{item.label}</span>}
                 
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
              ${isOpen ? 'justify-start text-right px-4' : 'justify-center px-2'}
            `}
            onClick={handleLogout}
            title={!isOpen ? 'تسجيل الخروج' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span>تسجيل الخروج</span>}
            
          </Button>
        </div>
      </div>
    </>
  );
};
