'use client';

import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';

export default function UploadVideoPage() {
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
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">Upload Video</h1>
            <p className="text-gray-400">Upload body cam footage to the system</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card/40 border border-cyan-400/30 rounded-lg p-12 backdrop-blur-md"
          >
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <UploadIcon className="w-16 h-16 text-cyan-400" />
              <p className="text-gray-300">Video upload interface coming soon...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
