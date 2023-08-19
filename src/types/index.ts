export type Status = 'Backlog' | 'In progress' | 'Todo' | 'Done' | 'Cancelled';
export type Priority = 0 | 1 | 2 | 3 | 4;
export type User = {
  id: string;
  name: string;
  available: boolean;
};
