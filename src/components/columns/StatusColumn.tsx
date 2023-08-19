import Avatar from 'boring-avatars';
import { Priority, Status } from '../../types/index';
import { Icons } from '../utils/Icons';
import { TicketPriorityValues, TicketStatusValues } from '../utils/TicketIcons';
import styles from './StatusColumn.module.css';
import { useAppSelector } from '../../hooks/redux';

interface StatusColumnProps {
  status: Status;
  order: 'Priority' | 'Title';
}

const StatusColumn: React.FC<StatusColumnProps> = ({ status, order }) => {
  const tickets = useAppSelector((state) => state.tickets);
  const users = useAppSelector((state) => state.users);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (order === 'Priority') {
      return b.priority - a.priority;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

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
      <div className={styles['tickets']}>
        {sortedTickets
          .filter((ticket) => ticket.status === status)
          .map((ticket, idx) => (
            <div key={idx} className={styles['ticket-card']}>
              <div className={styles['ticket-card-content']}>
                <div className={styles['ticket-card-top']}>
                  <p className={styles['ticket-card-id']}>{ticket.id}</p>
                  <div
                    style={{
                      position: 'relative',
                    }}
                  >
                    <Avatar
                      size={21}
                      variant={`beam`}
                      name={
                        users.find((user) => user.id === ticket.userId)?.name ??
                        ''
                      }
                    />
                    <div
                      className={
                        users.find((user) => user.id === ticket.userId)
                          ?.available
                          ? styles['badge--online']
                          : styles['badge--offline']
                      }
                    ></div>
                  </div>
                </div>
                <div className={styles['ticket-card-details']}>
                  <div className={styles['ticket-card-details-top']}>
                    <h6 className={`${styles['ticket-card-title']}`}>
                      {ticket.title.length > 56
                        ? ticket.title.slice(0, 56) + '...'
                        : ticket.title}
                    </h6>
                  </div>
                  <div className={styles['ticket-card-details-bottom']}>
                    <div className={styles['ticket-card-priority-icon']}>
                      {TicketPriorityValues[ticket.priority as Priority]}
                    </div>
                    <button className={styles['ticket-card-type']}>
                      <div className={styles['ticket-card-type-icon']}></div>
                      Feature Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StatusColumn;
