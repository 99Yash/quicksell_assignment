import React from 'react';
import { Priority, Status } from '../../types/index'; // Update the path accordingly
import { Icons } from './Icons';
import './TicketIcons.module.css'; // Import the separated CSS file

export const TicketStatusValues: Record<Status, React.ReactNode> = {
  Backlog: <Icons.belloff className="ticket-status-icon urgent" />,
  Todo: <Icons.circle className="ticket-status-icon circle" />,
  'In progress': <Icons.spinner className="ticket-status-icon spinner" />,
  Done: <Icons.check className="ticket-status-icon check" />,
  Cancelled: <Icons.cancel className="ticket-status-icon cancel" />,
};

export const TicketPriorityValues: Record<Priority, React.ReactNode> = {
  0: <Icons.dash className="ticket-priority-icon dash" />,
  1: <Icons.low className="ticket-priority-icon low" />,
  2: <Icons.medium className="ticket-priority-icon medium" />,
  3: <Icons.high className="ticket-priority-icon high" />,
  4: <Icons.urgent className="ticket-priority-icon urgent" />,
};
