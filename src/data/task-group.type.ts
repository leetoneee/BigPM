import { Task } from './tasks.type';

export type TaskGroup = {
  id: number;
  projectId: number;
  name: string;
  order: number;
};

export type TasksInGroup = TaskGroup & {
  tasks: Task[];
};

export type ReorderItemType = TasksInGroup | Task

