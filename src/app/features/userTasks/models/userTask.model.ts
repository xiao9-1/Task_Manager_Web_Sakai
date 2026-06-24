export interface UserTask {
  id: number;
  userId: number;
  title: string;
  status: string;

  dueTime: string;
  completedAt: string | null;
  createdAt : string;
  rating: number;
  projectId: number | null;
}
