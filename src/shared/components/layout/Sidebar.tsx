import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { logoutUser } from '@/features/auth/store/authThunks';
import { getMenuItemsByRole } from '@/shared/constants/menuItems';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const { user } = useAppSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userRole = user?.role?.toLowerCase() as 'super_admin' | 'school' | null;
  const menuItems = getMenuItemsByRole(userRole);
  const userName = user?.school?.name || user?.name || 'المستخدم';
  const userAvatar = user?.avatar;

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
      
      <div 
        className={`
          fixed inset-0 bg-black/50 z-40 lg:hidden
          transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onToggle}
      />

      <div 
        className={`
          fixed lg:sticky top-0 right-0 h-screen bg-card border-l border-border z-50
          flex flex-col justify-between
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-64' : 'translate-x-[200px] w-0 lg:translate-x-[200px]'}
        `}
      >
       
        <nav className={`flex-1 flex flex-col p-3 space-y-2 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="w-full gap-3 justify-start text-right px-4 whitespace-nowrap"
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-right">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className={`p-3 border-t border-border transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="ghost"
            className="w-full gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 justify-start text-right px-4 whitespace-nowrap"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </div>
    </>
  );
};