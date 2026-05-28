'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Shield, 
  UserCheck, 
  UserMinus, 
  Edit2 
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { mockUsers } from '@/lib/mock-data';

export default function UserManagementPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold text-cyan-300 mb-2">User Management</h1>
              <p className="text-slate-400">Manage system users, roles, and access permissions</p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-cyan-400/30 text-slate-100">
                <DialogHeader>
                  <DialogTitle className="text-cyan-300">Add New System User</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Create a new account and assign tactical roles.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-cyan-200">Full Name</Label>
                    <Input id="name" placeholder="Officer John Doe" className="bg-slate-950 border-slate-700 focus:border-cyan-400" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-cyan-200">Email Address</Label>
                    <Input id="email" type="email" placeholder="j.doe@agency.gov" className="bg-slate-950 border-slate-700 focus:border-cyan-400" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role" className="text-cyan-200">System Role</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-950 border-slate-700">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-slate-700 text-slate-100">
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="officer">Field Officer</SelectItem>
                        <SelectItem value="investigator">Investigator</SelectItem>
                        <SelectItem value="tech">Technician</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950">Create Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  placeholder="Search users by name or email..." 
                  className="pl-10 bg-slate-900/50 border-slate-800 focus:border-cyan-400/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-800 text-slate-400">
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-slate-800 text-slate-400">
                  Export
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader className="bg-slate-900/50">
                <TableRow className="border-cyan-400/10 hover:bg-transparent">
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">User</TableHead>
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">Role</TableHead>
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">Status</TableHead>
                  <TableHead className="text-cyan-200 uppercase text-xs tracking-wider">Last Active</TableHead>
                  <TableHead className="text-right text-cyan-200 uppercase text-xs tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-cyan-400/5 hover:bg-cyan-400/5 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-cyan-400/30">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-slate-800 text-cyan-400 text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-slate-100">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Shield className="w-3 h-3 text-cyan-400" />
                        <span className="text-sm">{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                        className={user.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-slate-800 text-slate-400'}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-400 font-mono">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-cyan-400">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-950 border-cyan-400/30 text-slate-200">
                          <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-cyan-400/10 focus:text-cyan-300">
                            <Edit2 className="w-4 h-4" /> Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-cyan-400/10 focus:text-cyan-300">
                            <UserCheck className="w-4 h-4" /> Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer focus:bg-red-400/10 focus:text-red-400 text-red-400">
                            <UserMinus className="w-4 h-4" /> Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No users found matching your search.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
