import { TaskGroup, TasksInGroup } from '@/data/task-group.type';

export const getCategoryList = (tasksInGroup: TasksInGroup[]): TaskGroup[] => {
  return tasksInGroup.map(({ id, projectId, name, order }) => ({
    id,
    projectId,
    name,
    order
  }));
};
