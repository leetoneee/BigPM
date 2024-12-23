import { TasksInGroup } from '@/data/task-group.type';

export const removeCategory = (
  tasksInGroup: TasksInGroup[],
  categoryId: number
): TasksInGroup[] => {
  // Filter out the task group whose id matches the categoryId
  return tasksInGroup.filter((group) => group.id !== categoryId);
};
