import { TaskGroup, TasksInGroup } from "@/data/task-group.type";

export const addCategory = (
  tasksInGroup: TasksInGroup[],
  newCategory: TaskGroup
): TasksInGroup[] => {
  // Add the new category to the tasksInGroup array
  return [...tasksInGroup, { ...newCategory, tasks: [] }];
};
