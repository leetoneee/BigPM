import { Comment } from "./comments.type";
import { File } from "./files.type";

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
  assignees: {
    id: number;
    assigneeName: string;
    asigneeAvatar: string;
  }[]
  files: File[];
  comments: Comment[];
};
