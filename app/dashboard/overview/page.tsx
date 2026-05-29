'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  ShieldCheck, 
  Zap, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { TacticalCard } from '@/components/tactical-card';
import { Progress } from '@/components/ui/progress';
import { mockSystemMetrics, mockLogs } from '@/lib/mock-data';

export default function OverviewPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const metrics = [
    { label: 'CPU Usage', value: mockSystemMetrics.cpu, icon: Cpu, color: 'text-cyan-400', glow: 'cyan' },
    { label: 'Memory Usage', value: mockSystemMetrics.memory, icon: Activity, color: 'text-purple-400', glow: 'purple' },
    { label: 'Storage Capacity', value: mockSystemMetrics.storage, icon: Database, color: 'text-yellow-400', glow: 'yellow' },
    { label: 'Network Load', value: 35, icon: Globe, color: 'text-green-400', glow: 'green' },
  ];

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
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">System-wide health monitoring and tactical status</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <TacticalCard glow={metric.glow as any}>
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    <span className="text-2xl font-bold text-slate-100">{metric.value}%</span>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">{metric.label}</p>
                  <Progress value={metric.value} className="h-1 bg-slate-800" />
                </TacticalCard>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <TacticalCard glow="cyan">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Devices Status
                  </h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs">
                    <ShieldCheck className="w-3 h-3" />
                    All Systems Operational
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400 text-sm">System Uptime</span>
                      <Clock className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-mono font-bold text-slate-100">{mockSystemMetrics.uptime}</div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400 text-sm">Active Connections</span>
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="text-2xl font-mono font-bold text-slate-100">{mockSystemMetrics.connections}</div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Regional Nodes</h4>
                  {[
                    { node: 'Central Command', status: 'Online', latency: '12ms' },
                    { node: 'North Sector', status: 'Online', latency: '24ms' },
                    { node: 'East Precinct', status: 'Warning', latency: '156ms' },
                  ].map((node) => (
                    <div key={node.node} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-cyan-400/5">
                      <span className="text-slate-200">{node.node}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-slate-500">{node.latency}</span>
                        <span className={`text-xs ${node.status === 'Online' ? 'text-green-400' : 'text-yellow-400'}`}>
                          ● {node.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TacticalCard>
            </div>

            <div className="lg:col-span-1">
              <TacticalCard glow="yellow">
                <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2 mb-6">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Critical Events
                </h3>
                <div className="space-y-4">
                  {mockLogs.filter(l => l.severity !== 'Info').slice(0, 5).map((log) => (
                    <div key={log.id} className="p-3 border-l-2 border-yellow-400 bg-yellow-400/5 rounded-r-lg">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>{log.user}</span>
                        <span>{log.timestamp.split(' ')[1]}</span>
                      </div>
                      <p className="text-sm text-slate-200 font-medium">{log.action}</p>
                      <p className="text-xs text-slate-500 mt-1">{log.target}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">
                  View Full Audit Log
                </button>
              </TacticalCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
