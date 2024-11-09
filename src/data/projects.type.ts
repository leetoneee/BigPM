export const statusColorMap: Record<
  'Completed' | 'In Progress' | 'Not Started' | 'On Hold',
  'success' | 'warning' | 'default' | 'danger'
> = {
  'Completed': 'success',
  'In Progress': 'warning',
  'Not Started': 'default',
  'On Hold': 'danger'
};

export type Project = {
  id: number;
  name: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
};
