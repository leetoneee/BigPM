import { ReorderItemType, TasksInGroup } from "@/data/task-group.type";

// Define type guard function
export function isTasksInGroup(item: ReorderItemType): item is TasksInGroup {
  return (item as TasksInGroup).tasks !== undefined; // Replace `groupProperty` with a property unique to TasksInGroup
}