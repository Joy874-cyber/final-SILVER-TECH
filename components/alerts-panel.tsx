'use client';

import React, { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmergencyAlert } from './emergency-alert';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  title: string;
  description: string;
  level: 'high' | 'medium' | 'low';
  timestamp: string;
  verified?: boolean;
}

interface AlertDefinition {
  id: string;
  title: string;
  description: string;
  level: 'high' | 'medium' | 'low';
  ageMinutes: number;
  verified?: boolean;
}

const alertDefinitions: AlertDefinition[] = [
  {
    id: '1',
    title: 'Officer Needs Assistance',
    description: 'Unit 12 - Officer Johnson requesting backup at 5th & Main',
    level: 'high',
    ageMinutes: 2,
    verified: true,
  },
  {
    id: '2',
    title: 'Low Battery Alert',
    description: 'Unit 9 - Officer Chen body camera battery at 35%',
    level: 'medium',
    ageMinutes: 5,
    verified: false,
  },
  {
    id: '3',
    title: 'GPS Location Update',
    description: 'All units have been repositioned per dispatch orders',
    level: 'low',
    ageMinutes: 10,
    verified: true,
  },
  {
    id: '4',
    title: 'Weapon Drawn',
    description: 'Unit 4 - Tactical sensor indicates sidearm deployed',
    level: 'high',
    ageMinutes: 1,
    verified: true,
  },
];

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(
    alertDefinitions.map((alert) => ({
      ...alert,
      timestamp: '',
    }))
  );
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);

  useEffect(() => {
    setAlerts(
      alertDefinitions.map((alert) => ({
        ...alert,
        timestamp: new Date(Date.now() - alert.ageMinutes * 60000).toLocaleTimeString(),
      }))
    );
  }, []);

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const handleDismissAll = () => {
    setAlerts([]);
  };

  const filteredAlerts = showOnlyVerified 
    ? alerts.filter(a => a.verified) 
    : alerts;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-1 flex items-center gap-2">
              <Zap className="w-6 h-6 text-red-400" />
              Active Alerts
            </h2>
            <p className="text-slate-400 text-xs uppercase tracking-widest">Real-time status monitor</p>
          </div>
          {alerts.length > 0 && (
            <button
              onClick={handleDismissAll}
              className="px-3 py-1 text-xs font-mono bg-slate-700/20 hover:bg-slate-700/40 border border-slate-600/30 rounded transition-all text-cyan-200"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Verified Alerts Filter Bar */}
        <button
          onClick={() => setShowOnlyVerified(!showOnlyVerified)}
          className={cn(
            "w-full p-3 rounded-xl border flex items-center justify-between transition-all duration-300 group",
            showOnlyVerified 
              ? "bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_15px_rgba(0,212,255,0.2)]" 
              : "bg-slate-900/50 border-slate-800 hover:border-cyan-400/30"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-2 h-2 rounded-full",
              showOnlyVerified ? "bg-cyan-400 animate-pulse" : "bg-slate-600"
            )} />
            <span className={cn(
              "text-sm font-bold tracking-wide",
              showOnlyVerified ? "text-cyan-300" : "text-slate-400 group-hover:text-slate-200"
            )}>
              VERIFIED ALERTS ONLY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs font-mono px-2 py-0.5 rounded-full border",
              showOnlyVerified 
                ? "bg-cyan-400/20 border-cyan-400/30 text-cyan-300" 
                : "bg-slate-800 border-slate-700 text-slate-500"
            )}>
              {alerts.filter(a => a.verified).length} Active
            </span>
          </div>
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredAlerts.length > 0 ? (
          <motion.div
            layout
            className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar"
          >
            {filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <EmergencyAlert
                  title={alert.title}
                  description={alert.description}
                  level={alert.level}
                  timestamp={alert.timestamp}
                  onDismiss={() => handleDismiss(alert.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border border-green-400/30 rounded-lg p-8 text-center bg-green-950/10 backdrop-blur-sm"
          >
            <div className="text-green-400 text-sm font-mono mb-2">✓ ALL SYSTEMS NORMAL</div>
            <p className="text-slate-200">No active alerts at this time</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
