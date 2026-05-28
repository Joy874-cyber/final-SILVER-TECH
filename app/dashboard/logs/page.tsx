'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  ShieldAlert 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockLogs } from '@/lib/mock-data';

export default function AccessLogsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = mockLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Info': return <Info className="w-4 h-4 text-cyan-400" />;
      case 'Warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'Error': return <ShieldAlert className="w-4 h-4 text-red-400" />;
      default: return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Info': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Warning': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Error': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-green-500/10 text-green-400 border-green-500/20';
    }
  };

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
            className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 mb-2">Access Logs</h1>
              <p className="text-slate-400">Audit trail of all system activities and security events</p>
            </div>
            <Button variant="outline" className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-950/50 border border-cyan-400/20 rounded-2xl overflow-hidden backdrop-blur-md"
          >
            <div className="p-4 border-b border-cyan-400/10 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  placeholder="Search logs by user, action, or target..." 
                  className="pl-10 bg-slate-900/50 border-slate-800 focus:border-cyan-400/50 text-slate-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="border-slate-800 text-slate-400">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            <Table>
              <TableHeader className="bg-slate-900/50">
                <TableRow className="border-cyan-400/10 hover:bg-transparent">
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">Timestamp</TableHead>
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">User</TableHead>
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">Action</TableHead>
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">Target</TableHead>
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="border-cyan-400/5 hover:bg-cyan-400/5 transition-colors">
                    <TableCell className="text-sm font-mono text-slate-400">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="font-medium text-slate-100">
                      {log.user}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {log.action}
                    </TableCell>
                    <TableCell className="text-sm text-slate-400">
                      {log.target}
                    </TableCell>
                    <TableCell>
                      <Badge className={`gap-1 ${getSeverityClass(log.severity)}`}>
                        {getSeverityIcon(log.severity)}
                        {log.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No log entries found matching your criteria.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
