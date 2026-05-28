'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Map, AlertCircle, BarChart3, Settings, LogOut, Upload, Library, Users, Clock, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export function DashboardSidebar({ onCollapse }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    onCollapse?.(!collapsed);
  };

  const menuItems = [
    { href: '/dashboard/overview', label: 'Admin Dashboard', icon: BarChart3 },
    { href: '/dashboard/users', label: 'User Management', icon: Users },
    { href: '/dashboard/logs', label: 'Access Logs', icon: Clock },
    { href: '/dashboard/settings', label: 'System Settings', icon: Settings },
    { type: 'separator' },
    { href: '/dashboard/alerts', label: 'Tactical Alerts', icon: AlertCircle },
    { href: '/dashboard/map', label: 'Location Map', icon: Map },
    { href: '/dashboard/upload', label: 'Upload Video', icon: Upload },
    { href: '/dashboard/evidence', label: 'Evidence Library', icon: Library },
    { href: '/dashboard/storage', label: 'Storage Status', icon: HardDrive },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-950/95 border-r border-cyan-400/20 glow-border backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.18)] flex flex-col"
    >
      {/* Collapse Button */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-4 top-4 w-8 h-8 bg-cyan-400/20 hover:bg-cyan-400/40 border border-cyan-400/50 rounded-full flex items-center justify-center transition-all"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-cyan-400" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-cyan-400" />
        )}
      </button>

      {/* Menu Items */}
      <nav className="flex-1 pt-8 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          if ('type' in item && item.type === 'separator') {
            return <div key={`sep-${index}`} className="my-4 border-t border-cyan-400/10 mx-2" />;
          }

          const Icon = (item as any).icon;
          const isActive = mounted && pathname === (item as any).href;

          return (
            <Link
              key={(item as any).href}
              href={(item as any).href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 relative group',
                isActive
                  ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-200 hover:text-cyan-300 hover:bg-cyan-400/10'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-cyan-400')} />
              {!collapsed && (
                <span className="text-sm font-mono whitespace-nowrap">{(item as any).label}</span>
              )}
              {isActive && !collapsed && (
                <div className="absolute right-2 w-1 h-1 bg-cyan-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        <button className={cn(
          'w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-100 hover:text-red-300 hover:bg-red-400/10 transition-all duration-200'
        )}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-mono whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
