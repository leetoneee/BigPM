import { Task } from './tasks.type';

export const tasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    taskGroupId: 1,
    name: 'Requirement Gathering',
    description: 'Collect all requirements from stakeholders.',
    startDate: '2023-01-01T00:00:00Z',
    dueDate: '2023-01-15T23:59:59Z',
    actualStartDate: '2023-01-02T00:00:00Z',
    earlyStart: '2023-01-01T00:00:00Z',
    lateStart: '2023-01-05T00:00:00Z',
    earlyFinish: '2023-01-14T23:59:59Z',
    lateFinish: '2023-01-15T23:59:59Z',
    completionDate: '2023-01-14T00:00:00Z',
    comments: [],
    files: [],
    status: 'Completed',
    progress: 100,
    order: 1,
    assignees: [
      {
        id: 1,
        assigneeName: 'John Doe',
        asigneeAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
      },
      {
        id: 2,
        assigneeName: 'Jane Smith',
        asigneeAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
      }
    ]
  },
  {
    id: 2,
    projectId: 1,
    taskGroupId: 1,
    name: 'Wireframe Design',
    description: 'Create wireframes for all pages.',
    startDate: '2023-01-16T00:00:00Z',
    dueDate: '2023-01-31T23:59:59Z',
    actualStartDate: '2023-01-17T00:00:00Z',
    earlyStart: '2023-01-16T00:00:00Z',
    lateStart: '2023-01-20T00:00:00Z',
    earlyFinish: '2023-01-30T23:59:59Z',
    lateFinish: '2023-01-31T23:59:59Z',
    completionDate: '2023-01-30T23:59:59Z',
    status: 'Completed',
    progress: 100,
    order: 2,
    comments: [],
    files: [],
    assignees: [
      {
        id: 3,
        assigneeName: 'Alice Brown',
        asigneeAvatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
      },
      {
        id: 4,
        assigneeName: 'Bob Johnson',
        asigneeAvatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d'
      }
    ]
  },
  {
    id: 3,
    projectId: 1,
    taskGroupId: 2,
    name: 'API Development',
    description: 'Develop backend APIs.',
    startDate: '2023-02-01T00:00:00Z',
    dueDate: '2023-02-28T23:59:59Z',
    actualStartDate: '2023-02-01T00:00:00Z',
    earlyStart: '2023-02-01T00:00:00Z',
    lateStart: '2023-02-05T00:00:00Z',
    earlyFinish: '2023-02-27T23:59:59Z',
    lateFinish: '2023-02-28T23:59:59Z',
    completionDate: null,
    status: 'In Progress',
    progress: 60,
    order: 1,
    comments: [],
    files: [],
    assignees: [
      {
        id: 5,
        assigneeName: 'Charlie Green',
        asigneeAvatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d'
      }
    ]
  },
  {
    id: 4,
    projectId: 1,
    taskGroupId: 2,
    name: 'Frontend Development',
    description: 'Develop frontend interfaces.',
    startDate: '2023-02-15T00:00:00Z',
    dueDate: '2023-03-15T23:59:59Z',
    actualStartDate: '2023-02-16T00:00:00Z',
    earlyStart: '2023-02-15T00:00:00Z',
    lateStart: '2023-02-18T00:00:00Z',
    earlyFinish: '2023-03-14T23:59:59Z',
    lateFinish: '2023-03-15T23:59:59Z',
    completionDate: null,
    status: 'In Progress',
    progress: 45,
    comments: [],
    files: [],
    order: 2,
    assignees: [
      {
        id: 6,
        assigneeName: 'David Lee',
        asigneeAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
      },
      {
        id: 7,
        assigneeName: 'Emma White',
        asigneeAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29027007d'
      }
    ]
  },
  {
    id: 5,
    projectId: 1,
    taskGroupId: 3,
    name: 'Unit Testing',
    description: 'Perform unit tests on modules.',
    startDate: '2023-03-16T00:00:00Z',
    dueDate: '2023-03-31T23:59:59Z',
    actualStartDate: '2023-03-16T00:00:00Z',
    earlyStart: '2023-03-16T00:00:00Z',
    lateStart: '2023-03-20T00:00:00Z',
    earlyFinish: '2023-03-30T23:59:59Z',
    lateFinish: '2023-03-31T23:59:59Z',
    completionDate: null,
    status: 'Not Started',
    progress: 0,
    comments: [],
    files: [],
    order: 1,
    assignees: [
      {
        id: 8,
        assigneeName: 'Fiona Gray',
        asigneeAvatar: 'https://i.pravatar.cc/150?img=4'
      }
    ]
  }
];

export const getTaskById = (taskId: number): Task => {
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
  }
  return task;
};
