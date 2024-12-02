export type Comment = {
  id: number;
  taskId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  createAt: string;
  updateAt: string | null;
  deleteAt: string | null;
};
