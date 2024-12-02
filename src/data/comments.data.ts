import { Comment } from './comments.type';

export const comments: Comment[] = [
  {
    id: 1,
    taskId: 1,
    userId: 201,
    userName: 'Charlie Green',
    userAvatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    content: 'This task needs clarification on the deadline.',
    createAt: '2024-11-15T10:00:00Z',
    updateAt: null,
    deleteAt: null
  },
  {
    id: 2,
    taskId: 1,
    userId: 202,
    userName: 'David Lee',
    userAvatar: "'https://i.pravatar.cc/150?u=a042581f4e29027007d",
    content: 'Great progress so far! Keep it up!',
    createAt: '2024-11-16T09:30:00Z',
    updateAt: null,
    deleteAt: null
  },
  {
    id: 3,
    taskId: 1,
    userId: 203,
    userName: 'Emma White',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    content: 'Can we have a meeting to discuss this?',
    createAt: '2024-11-17T14:15:00Z',
    updateAt: '2024-11-17T14:45:00Z',
    deleteAt: null
  },
  {
    id: 4,
    taskId: 2,
    userId: 204,
    userName: 'Leetone',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    content: 'I encountered an issue with this task, please advise.',
    createAt: '2024-11-18T08:45:00Z',
    updateAt: '2024-11-18T09:00:00Z',
    deleteAt: null
  },
  {
    id: 5,
    taskId: 2,
    userId: 205,
    userName: 'NguyenLe',
    userAvatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    content: 'This task has been completed successfully.',
    createAt: '2024-11-18T11:20:00Z',
    updateAt: '2024-11-18T11:30:00Z',
    deleteAt: null
  },
  {
    id: 6,
    taskId: 3,
    userId: 206,
    userName: 'Tuu Yuu',
    userAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    content: 'We need additional resources to complete this task.',
    createAt: '2024-11-19T13:00:00Z',
    updateAt: '2024-11-19T13:15:00Z',
    deleteAt: null
  },
  {
    id: 7,
    taskId: 3,
    userId: 207,
    userName: 'Tin Le',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    content: 'Awaiting feedback before proceeding further.',
    createAt: '2024-11-19T15:00:00Z',
    updateAt: null,
    deleteAt: null
  },
  {
    id: 8,
    taskId: 4,
    userId: 208,
    userName: 'Karik Nguyen',
    userAvatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    content: 'Reviewed the task. Everything looks good.',
    createAt: '2024-11-20T09:00:00Z',
    updateAt: null,
    deleteAt: null
  },
  {
    id: 9,
    taskId: 4,
    userId: 209,
    userName: 'Bray Tran',
    userAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    content: 'Can you confirm the scope of this task?',
    createAt: '2024-11-20T11:00:00Z',
    updateAt: '2024-11-20T11:15:00Z',
    deleteAt: null
  },
  {
    id: 10,
    taskId: 5,
    userId: 210,
    userName: 'Thai VG',
    userAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    content: 'Task is blocked due to dependency issues.',
    createAt: '2024-11-21T14:00:00Z',
    updateAt: null,
    deleteAt: null
  }
];

export const getCommentsByTaskId = (taskId: number) => {
  return comments.filter((comment) => (comment.taskId === taskId));
};
