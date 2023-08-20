import { useAppSelector } from '../../hooks/redux';
import { Status } from '../../types/index';
import StatusTicket from '../tickets/StatusTicket';
import { Icons } from '../utils/Icons';
import { TicketStatusValues } from '../utils/TicketIcons';
import styles from './StatusColumn.module.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface StatusColumnProps {
  status: Status;
  order: 'Priority' | 'Title';
}

const StatusColumn: React.FC<StatusColumnProps> = ({ status, order }) => {
  const tickets = useAppSelector((state) => state.tickets);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (order === 'Priority') {
      return b.priority - a.priority;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  const [parent] = useAutoAnimate();
  return (
    <div key={status} className={styles['status-column']}>
      {/* Column header */}
      <div className={styles['column-header']}>
        <div className={styles['column-header-left']}>
          {TicketStatusValues[status]}
          <h6 className={styles['column-header-title']}>{status}</h6>
          <p className={styles['column-header-count']}>
            {tickets.filter((ticket) => ticket.status === status).length}
          </p>
        </div>
        <div className={styles['column-header-buttons']}>
          <button className={styles['button']}>
            <Icons.add className={styles['column-header-icon']} />
          </button>
          <button className={styles['button']}>
            <Icons.more className={styles['column-header-icon']} />
          </button>
        </div>
      </div>
      {/* Tickets */}
      <div className={styles['tickets']} ref={parent}>
        {sortedTickets
          .filter((ticket) => ticket.status === status)
          .map((ticket, idx) => (
            <StatusTicket id={ticket.id} key={ticket.id} />
          ))}
      </div>
    </div>
  );
};

export default StatusColumn;
