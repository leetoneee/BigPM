import { TasksInGroup } from "@/data/task-group.type";

export const removeTask = (tasksInGroup: TasksInGroup[], taskId: number): TasksInGroup[] => {
  return tasksInGroup.map((group) => ({
    ...group,
    tasks: group.tasks.filter((task) => task.id !== taskId),
  }));
};