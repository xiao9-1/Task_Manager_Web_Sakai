export interface AdminTask {
  id: number;
  userId: number;
  title: string;
  status: string;

  dueTime: string;
  completedAt: string | null;
  rating: number;
  projectId: number | null;

  createdAt: string | null;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}
