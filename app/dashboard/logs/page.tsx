'use client';

import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AccessLogsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="hidden md:block">
        <DashboardSidebar onCollapse={setSidebarCollapsed} />
      </div>

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-60'} pt-20`}>
        <div className="p-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">Access Logs</h1>
            <p className="text-gray-400">View system access and activity logs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card/40 border border-cyan-400/30 rounded-lg p-8 backdrop-blur-md"
          >
            <p className="text-gray-300">Access logs content coming soon...</p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
