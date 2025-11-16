import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { LucideIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  menuItems: MenuItem[];
  userName: string;
  userAvatar?: string;
}

export const DashboardLayout = ({ children, menuItems, userName, userAvatar }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      <Sidebar 
        menuItems={menuItems} 
        userName={userName} 
        userAvatar={userAvatar}
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
