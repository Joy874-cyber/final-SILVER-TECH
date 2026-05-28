export const mockUsers = [
  { id: '1', name: 'Commander Sarah Jenkins', email: 's.jenkins@agency.gov', role: 'Administrator', status: 'Active', lastActive: '2 mins ago', avatar: '/placeholder-user.jpg' },
  { id: '2', name: 'Officer Michael Chen', email: 'm.chen@agency.gov', role: 'Field Officer', status: 'Active', lastActive: '5 mins ago', avatar: '/placeholder-user.jpg' },
  { id: '3', name: 'Detective Elena Rodriguez', email: 'e.rodriguez@agency.gov', role: 'Investigator', status: 'Active', lastActive: '1 hour ago', avatar: '/placeholder-user.jpg' },
  { id: '4', name: 'Officer James Wilson', email: 'j.wilson@agency.gov', role: 'Field Officer', status: 'Inactive', lastActive: '2 days ago', avatar: '/placeholder-user.jpg' },
  { id: '5', name: 'Tech Specialist Alex Rivera', email: 'a.rivera@agency.gov', role: 'Technician', status: 'Active', lastActive: '10 mins ago', avatar: '/placeholder-user.jpg' },
];

export const mockLogs = [
  { id: 'L1', user: 'Sarah Jenkins', action: 'Login Success', target: 'System', timestamp: '2024-05-27 09:12:45', severity: 'Info' },
  { id: 'L2', user: 'Michael Chen', action: 'Video Uploaded', target: 'Incident #442', timestamp: '2024-05-27 09:15:22', severity: 'Info' },
  { id: 'L3', user: 'System', action: 'Storage Warning', target: 'Server #B2', timestamp: '2024-05-27 09:20:00', severity: 'Warning' },
  { id: 'L4', user: 'Alex Rivera', action: 'User Permissions Modified', target: 'James Wilson', timestamp: '2024-05-27 09:25:10', severity: 'Warning' },
  { id: 'L5', user: 'Elena Rodriguez', action: 'Evidence Accessed', target: 'Case #2024-088', timestamp: '2024-05-27 09:30:45', severity: 'Info' },
  { id: 'L6', user: 'System', action: 'Critical Alert Triggered', target: 'Zone 4', timestamp: '2024-05-27 09:35:00', severity: 'Error' },
];

export const mockSystemMetrics = {
  cpu: 0,
  memory: 0,
  storage: 0,
  connections: 0,
  uptime: '0d 0h 0m',
  lastBackup: 'Never'
};
