import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Priority } from '../../types/index';
import PriorityTicket from '../tickets/PriorityTicket';
import { Icons } from '../utils/Icons';
import { TicketPriorityValues } from '../utils/TicketIcons';
import styles from './PriorityColumn.module.css';

interface PriorityColumnProps {
  priority: Priority;
  order: 'Priority' | 'Title';
}

const PriorityColumn: React.FC<PriorityColumnProps> = ({ priority, order }) => {
  const tickets = useAppSelector((state) => state.tickets);
  const priorityText = ['No Priority', 'Low', 'Medium', 'High', 'Urgent'][
    priority
  ];

  const sortedTickets = [...tickets].sort((a, b) => {
    if (order === 'Priority') {
      return b.priority - a.priority;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className={styles['priority-column']}>
      {/* Column header */}
      <div className={styles['column-header']}>
        <div className={styles['column-header-left']}>
          {TicketPriorityValues[priority]}
          <h6 className={styles['column-header-title']}>{priorityText}</h6>
          <p className={styles['column-header-count']}>
            {tickets.filter((ticket) => ticket.priority === priority).length}
          </p>
        </div>
        <div className={styles['column-header-buttons']}>
          <button className={styles['column-header-button']}>
            <Icons.add className={styles['column-header-icon']} />
          </button>
          <button className={styles['column-header-button']}>
            <Icons.more className={styles['column-header-icon']} />
          </button>
        </div>
      </div>
      {/* Tickets */}
      <div className={styles['tickets']}>
        {sortedTickets
          .filter((ticket) => ticket.priority === priority)
          .map((ticket, idx) => (
            <PriorityTicket id={ticket.id} key={ticket.id} />
          ))}
      </div>
    </div>
  );
};

export default PriorityColumn;
