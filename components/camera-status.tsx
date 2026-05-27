'use client';

import { MoreHorizontal, Video, ShieldCheck } from 'lucide-react';
import { TacticalCard } from '@/components/tactical-card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface CameraStatus {
  id: string;
  officer: string;
  badge: string;
  status: 'Recording' | 'Online' | 'Offline';
  battery: string;
  lastActive: string;
  location: string;
}

const cameraData: CameraStatus[] = [
  { id: 'CAM-001', officer: 'Officer Johnson', badge: 'B-4521', status: 'Recording', battery: '87%', lastActive: 'Active now', location: 'District 4 - Patrol' },
  { id: 'CAM-002', officer: 'Officer Martinez', badge: 'B-4198', status: 'Online', battery: '92%', lastActive: '2 min ago', location: 'District 2 - Traffic' },
  { id: 'CAM-003', officer: 'Officer Chen', badge: 'B-4832', status: 'Recording', battery: '65%', lastActive: 'Active now', location: 'District 1 - Patrol' },
  { id: 'CAM-004', officer: 'Officer Smith', badge: 'B-4015', status: 'Online', battery: '78%', lastActive: '5 min ago', location: 'District 3 - Community' },
  { id: 'CAM-005', officer: 'Officer Davis', badge: 'B-4729', status: 'Offline', battery: '12%', lastActive: '1 hour ago', location: 'Station - Charging' },
  { id: 'CAM-006', officer: 'Officer Williams', badge: 'B-4356', status: 'Recording', battery: '55%', lastActive: 'Active now', location: 'District 4 - Investigation' },
];

function statusLabel(status: CameraStatus['status']) {
  const colorMap: Record<CameraStatus['status'], string> = {
    Recording: 'bg-red-500/10 text-red-400',
    Online: 'bg-emerald-500/10 text-emerald-400',
    Offline: 'bg-slate-500/10 text-slate-400',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${colorMap[status]}`}>
      {status}
    </span>
  );
}

export function CameraStatus() {
  return (
    <TacticalCard glow="cyan" className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-300 text-sm font-medium uppercase tracking-[0.18em]">
              <Video className="w-4 h-4" />
              Camera Status
            </div>
            <p className="mt-1 text-sm text-slate-200">Real-time monitoring of all body cameras</p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:border-cyan-400/30 hover:bg-slate-900/90">
            <ShieldCheck className="w-4 h-4" />
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-full border-separate border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Camera ID</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cameraData.map((camera) => (
                <TableRow key={camera.id}>
                  <TableCell className="font-medium text-cyan-200">{camera.id}</TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-slate-100">{camera.officer}</div>
                    <div className="text-xs text-slate-300">{camera.badge}</div>
                  </TableCell>
                  <TableCell>{statusLabel(camera.status)}</TableCell>
                  <TableCell className={`font-medium ${camera.battery.endsWith('%') && Number(camera.battery.replace('%', '')) < 30 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {camera.battery}
                  </TableCell>
                  <TableCell className="text-sm text-slate-200">{camera.lastActive}</TableCell>
                  <TableCell className="text-sm text-slate-200">{camera.location}</TableCell>
                  <TableCell className="text-right">
                    <button
                      aria-label="Camera actions"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-300"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TacticalCard>
  );
}
