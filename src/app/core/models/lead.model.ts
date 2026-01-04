export interface TimelineEvent {
  id: string;
  type: 'note' | 'call' | 'email' | 'whatsapp' | 'system';
  title: string;
  description?: string;
  date: Date;
  icon?: string;
}

export interface Lead {
  id: string;
  title: string;
  company?: string;
  value?: number;
  status:
    | 'new'
    | 'contacted'
    | 'visit'
    | 'proposal'
    | 'negotiation'
    | 'won'
    | 'inactive';
  lastActivity?: Date;
  timeline?: TimelineEvent[];
}

export interface Column {
  id: string;
  title: string;
  leads: Lead[];
}
