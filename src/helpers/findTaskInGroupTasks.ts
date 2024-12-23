import { TasksInGroup } from '@/data/task-group.type';
import { Task } from '@/data/tasks.type';

export const findTaskInGroupTasks = (
  tasksInGroup: TasksInGroup[],
  taskId: number
): Task | null => {
  for (const group of tasksInGroup) {
    const foundTask = group.tasks.find((task) => task.id === taskId);
    if (foundTask) {
      return foundTask; // Return the task if found
    }
  }
  return null; // Return null if the task is not found in any group
};
