import { TaskGroup, TasksInGroup } from './task-group.type';
import { tasks } from './tasks.data';

const taskGroups: TaskGroup[] = [
  { id: 1, projectId: 1, name: 'Design Phase', order: 1 },
  { id: 2, projectId: 1, name: 'Development Phase', order: 2 },
  { id: 3, projectId: 1, name: 'Testing Phase', order: 3 },
  { id: 4, projectId: 2, name: 'Initial Setup', order: 1 },
  { id: 5, projectId: 2, name: 'Execution', order: 2 }
];

export const getTaskGroupsByProjectId = (projectId: number): TasksInGroup[] => {
  return taskGroups
    .filter((taskGroup) => taskGroup.projectId === projectId)
    .map((taskGroup) => ({
      ...taskGroup,
      tasks: tasks.filter((task) => task.taskGroupId === taskGroup.id)
    }));
};

export const getAllTaskGroups = (): TaskGroup[] => {
  return taskGroups;
};

export const getCategoriesByProjectId = (projectId: number) => {
  return taskGroups.filter((category) => (category.projectId === projectId));
};

export const getCategoryById = (categoryId: number): TaskGroup => {
  const category = taskGroups.find((category) => category.id === categoryId);
  if (!category) {
    throw new Error(`Category with id ${categoryId} not found`);
  }
  return category;
};
