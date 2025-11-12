import { Link, useLocation } from '@tanstack/react-router';
import { LogOut, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  icon: LucideIcon;
  href: string;
}

interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface BaseSidebarProps {
  logoTitle: string;
  logoSubtitle: string;
  menuItems: MenuItem[];
  userInfo: UserInfo;
  onLogout?: () => void;
  className?: string;
}

export function BaseSidebar({
  logoTitle,
  logoSubtitle,
  menuItems,
  userInfo,
  onLogout,
  className,
}: BaseSidebarProps) {
  const location = useLocation();

  // Lấy chữ cái đầu từ full name
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <aside className={cn('w-64 h-screen bg-card border-r flex flex-col', className)}>
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-bold text-primary-foreground text-lg">
              {logoTitle.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="font-bold text-lg">{logoTitle}</h2>
            <p className="text-xs text-muted-foreground">{logoSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Sửa logic active state
          const isActive = 
            location.pathname === item.href || 
            (item.href !== '/teacher' && location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t space-y-2">
        <div className="flex items-center gap-3 px-4 py-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(userInfo.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground truncate">{userInfo.email}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </Button>
      </div>
    </aside>
  );
}