import { TasksInGroup } from '@/data/task-group.type';
import { Task } from '@/data/tasks.type';

export const addTask = (
  tasksInGroup: TasksInGroup[],
  newTask: Task
): TasksInGroup[] => {
  return tasksInGroup.map((group) =>
    group.id === newTask.taskGroupId
      ? {
          ...group,
          tasks: [...group.tasks, newTask] // Add the new task to the tasks array
        }
      : group
  );
};
