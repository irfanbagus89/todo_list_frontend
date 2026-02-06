'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardSidebar, MobileBottomNav } from '@/components/layouts/DashboardSidebar';
import { DashboardHeader } from '@/components/layouts/DashboardHeader';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthRoute =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register');

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Desktop Sidebar - fixed position */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar - overlay */}
      <div className="lg:hidden">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area - with left margin for desktop sidebar */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          onNewTodoClick={() => {
            window.location.href = '/todos/new';
          }}
        />

        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}