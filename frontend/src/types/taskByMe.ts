export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assigned_to: string;

  assignedUser?: {
    id: string;
    name: string;
    email: string;
  };
}
