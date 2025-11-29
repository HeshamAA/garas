import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector, useSidebarState } from '@/shared/hooks';
import { NotificationPopup } from '../notifications/NotificationPopup';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebarState(true);
  const { user } = useAppSelector(state => state.auth);

  const userName = user?.school?.name || user?.name || 'المستخدم';
  const userAvatar = user?.profileImage;
  const isSchool = user?.role?.toLowerCase() === 'school';

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />
      <main className="flex-1 overflow-auto">
        
        <div className="sticky top-0 z-30 bg-primary text-primary-foreground shadow-md">
          <div className="flex items-center justify-between px-6 py-4 gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-primary-foreground/20">
                  <AvatarImage src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                  <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm opacity-90">حياك الله</p>
                  <h2 className="text-lg lg:text-xl font-bold">{
                
                      isSchool ? userName : "الأدمن"
                
                }</h2>
                </div>
              </div>
            </div>

            {isSchool && <NotificationPopup />}
          </div>
        </div>

        <div>
          {children}
        </div>
      </main>
    </div>
  );
};
