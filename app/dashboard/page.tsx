'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { AlertsPanel } from '@/components/alerts-panel';
import { LiveCameraGrid } from '@/components/live-camera-grid';
import { TacticalMap } from '@/components/tactical-map';import { CameraStatus } from '@/components/camera-status';import { motion } from 'framer-motion';
import { BarChart3, Activity, Users, AlertTriangle, Video, HardDrive } from 'lucide-react';
import { TacticalCard } from '@/components/tactical-card';
import Link from 'next/link';
import { Settings, Shield, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    { icon: Users, label: 'Officers Online', value: '0', color: 'cyan' },
    { icon: Activity, label: 'Active Incidents', value: '0', color: 'red' },
    { icon: AlertTriangle, label: 'Alerts Today', value: '0', color: 'yellow' },
    { icon: BarChart3, label: 'Camera Uptime', value: '0.0%', color: 'green' },
    { icon: Video, label: 'Total Videos', value: '0', color: 'cyan' },
    { icon: Shield, label: 'Verified Alerts', value: '0', color: 'red' },
    { icon: HardDrive, label: 'Storage Used', value: '0.0GB', color: 'yellow' },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="hidden md:block">
        <DashboardSidebar onCollapse={setSidebarCollapsed} />
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-60'} pt-20`}>
        <div className="p-6 max-w-7xl">
          {/* Dashboard header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-cyan-300 mb-2">Command Center Dashboard</h1>
              <p className="text-slate-200">Real-time monitoring and incident management</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/dashboard/overview">
                <Button className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorMap = {
                cyan: 'border-cyan-400/30 shadow-[0_0_15px_rgba(0,212,255,0.2)]',
                red: 'border-red-400/30 shadow-[0_0_15px_rgba(255,23,68,0.2)]',
                yellow: 'border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]',
                green: 'border-green-400/30 shadow-[0_0_15px_rgba(0,255,136,0.2)]',
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`border border-slate-700/80 rounded-3xl p-6 backdrop-blur-md bg-slate-950/95 flex items-start justify-between ${
                      colorMap[stat.color as keyof typeof colorMap]
                    } transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,212,255,0.18)]`}
                  >
                    <div>
                      <p className="text-cyan-200 text-sm font-semibold uppercase tracking-[0.12em] mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
                    </div>
                    <Icon className="w-8 h-8 opacity-50" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main content grid */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CameraStatus />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Alerts and Map */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="lg:col-span-1 space-y-8"
              >
                <AlertsPanel />
                <TacticalMap />
              </motion.div>

              {/* Right column - Camera Grid */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="lg:col-span-2"
              >
                <LiveCameraGrid />
              </motion.div>
            </div>
          </div>

          {/* Analytics section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">System Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Uptime chart placeholder */}
              <TacticalCard glow="cyan">
                <div className="space-y-4">
                  <h3 className="font-bold text-cyan-300">System Uptime</h3>
                  <div className="h-32 flex items-end justify-around gap-2">
                    {[85, 92, 78, 88, 95, 91, 87].map((value, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ delay: 0.05 * i, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-t opacity-50 hover:opacity-100 transition-opacity"
                      />
                    ))}
                  </div>
                  <div className="text-center text-sm text-slate-200">Last 7 days</div>
                </div>
              </TacticalCard>

              {/* Response time chart placeholder */}
              <TacticalCard glow="green">
                <div className="space-y-4">
                  <h3 className="font-bold text-cyan-300">Average Response Time</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">2.3s</div>
                    <p className="text-sm text-slate-200">Per alert notification</p>
                  </div>
                  <div className="flex justify-around text-xs text-slate-200 pt-4 border-t border-cyan-400/20">
                    <span>↑ 5% vs last week</span>
                    <span>Peak: 3.2s</span>
                  </div>
                </div>
              </TacticalCard>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
