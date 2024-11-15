export type Task = {
  id: number;
  projectId: number;
  taskGroupId: number;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  actualStartDate: string;
  earlyStart: string;
  lateStart: string;
  earlyFinish: string;
  lateFinish: string;
  completionDate: string | null;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  order: number;
};
