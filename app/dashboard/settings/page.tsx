'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Save, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { TacticalCard } from '@/components/tactical-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="hidden md:block">
        <DashboardSidebar onCollapse={setSidebarCollapsed} />
      </div>

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-60'} pt-20`}>
        <div className="p-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 mb-2">System Settings</h1>
              <p className="text-slate-400">Configure global tactical parameters and security policies</p>
            </div>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </motion.div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="bg-slate-950/50 border border-cyan-400/20 mb-8 p-1">
              <TabsTrigger value="general" className="gap-2 px-6">
                <Settings className="w-4 h-4" /> General
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 px-6">
                <Shield className="w-4 h-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 px-6">
                <Bell className="w-4 h-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="storage" className="gap-2 px-6">
                <Database className="w-4 h-4" /> Data Management
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TacticalCard glow="cyan">
                  <h3 className="text-lg font-bold text-cyan-300 mb-6 flex items-center gap-2">
                    Agency Information
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-400">Agency Name</Label>
                      <Input defaultValue="Metropolitan Tactical Response" className="bg-slate-950 border-slate-700 focus:border-cyan-400" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-400">Department Identifier</Label>
                      <Input defaultValue="MTR-UNIT-01" className="bg-slate-950 border-slate-700 focus:border-cyan-400 font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-400">Timezone</Label>
                      <Select defaultValue="utc">
                        <SelectTrigger className="bg-slate-950 border-slate-700">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-950 border-slate-700 text-slate-100">
                          <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                          <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                          <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TacticalCard>

                <TacticalCard glow="cyan">
                  <h3 className="text-lg font-bold text-cyan-300 mb-6 flex items-center gap-2">
                    Localization & Regional
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-slate-200">Metric System</Label>
                        <p className="text-xs text-slate-500">Use meters and kilometers for tactical maps</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-slate-200">24-Hour Clock</Label>
                        <p className="text-xs text-slate-500">Use military time format across all interfaces</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2 pt-4">
                      <Label className="text-slate-400">Map Provider</Label>
                      <div className="flex items-center gap-2 p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-200">Satellite Dispatch Engine v4.2</span>
                      </div>
                    </div>
                  </div>
                </TacticalCard>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <TacticalCard glow="red">
                <h3 className="text-lg font-bold text-red-400 mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Security Protocols
                </h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-slate-200">Two-Factor Authentication</Label>
                          <p className="text-xs text-slate-500">Enforce 2FA for all administrative accounts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-slate-200">IP Restricted Login</Label>
                          <p className="text-xs text-slate-500">Only allow logins from agency network range</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-slate-400">Session Timeout (Minutes)</Label>
                        <Input type="number" defaultValue="30" className="bg-slate-950 border-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-400">API Gateway Key</Label>
                        <div className="relative">
                          <Input 
                            type={showApiKey ? 'text' : 'password'} 
                            defaultValue="tac_live_k8s_928374928374928374" 
                            className="bg-slate-950 border-slate-700 font-mono pr-10"
                            readOnly
                          />
                          <button 
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400"
                          >
                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TacticalCard>
            </TabsContent>

            <TabsContent value="notifications">
              <TacticalCard glow="yellow">
                <h3 className="text-lg font-bold text-yellow-400 mb-6 flex items-center gap-2">
                  Notification Triggers
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Emergency Signal', desc: 'Alert when officer triggers emergency button', email: true, push: true, sms: true },
                    { label: 'System Fault', desc: 'Hardware or network communication failure', email: true, push: true, sms: false },
                    { label: 'Unauthorized Access', desc: 'Detection of login attempts from outside network', email: true, push: true, sms: true },
                    { label: 'Evidence Uploaded', desc: 'Daily summary of all new evidence files', email: true, push: false, sms: false },
                  ].map((trigger) => (
                    <div key={trigger.label} className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="text-slate-100 font-medium">{trigger.label}</h4>
                        <p className="text-xs text-slate-500">{trigger.desc}</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-slate-600 uppercase">Email</span>
                          <Switch defaultChecked={trigger.email} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-slate-600 uppercase">Push</span>
                          <Switch defaultChecked={trigger.push} />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-slate-600 uppercase">SMS</span>
                          <Switch defaultChecked={trigger.sms} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TacticalCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
