export interface DashboardKpi {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
  color: string;
  prefix?: string;
  suffix?: string;
}

export interface ProjectProgress {
  id: number;
  name: string;
  progress: number;
  status: 'on-track' | 'delayed' | 'at-risk';
}

export interface DashboardMetrics {
  kpis: DashboardKpi[];
  projectProgress: ProjectProgress[];
  recentLeads: { name: string; date: string; source: string }[];
}
