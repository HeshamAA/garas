import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/shared/hooks';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAppSelector(state => state.auth);
  
  const userName = user?.school?.name || user?.name || 'المستخدم';
  const userAvatar = user?.avatar;

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      <Sidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="flex-1 overflow-auto">
        {/* Welcome Header */}
        <div className="sticky top-0 z-30 bg-primary text-primary-foreground shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-90">جباك الله</p>
                <h2 className="text-lg lg:text-xl font-bold">{userName}</h2>
              </div>
              <Avatar className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-primary-foreground/20">
                <AvatarImage src={userAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div>
          {children}
        </div>
      </main>
    </div>
  );
};
