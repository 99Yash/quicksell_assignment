import { Priority, Status } from '.';

type Tag = 'Feature request' | 'Feature Request';

export type Ticket = {
  id: string;
  title: string;
  tag: Tag[];
  userId: string;
  status: Status;
  priority: Priority;
};
