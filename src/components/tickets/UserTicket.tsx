import { useAppSelector } from '../../hooks/redux';
import { Priority, Status } from '../../types';
import { TicketPriorityValues, TicketStatusValues } from '../utils/TicketIcons';
import styles from './UserTicket.module.css';
const UserTicket = ({ id }: { id: string }) => {
  const ticket = useAppSelector((state) =>
    state.tickets.find((ticket) => ticket.id === id)
  );
  if (!ticket)
    return (
      <div className={styles['ticket-card']}>
        <div className={styles['ticket-card-content']}>
          <div className={styles['ticket-card-top']}>
            <p className={styles['ticket-card-id']}>Error</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles['ticket-card']}>
      <div className={styles['ticket-card-content']}>
        <div className={styles['ticket-card-top']}>
          <p className={styles['ticket-card-id']}>{ticket.id}</p>
        </div>
        <div className={styles['ticket-card-details']}>
          <div className={styles['ticket-card-details-top']}>
            <div className={styles['ticket-card-status']}>
              {TicketStatusValues[ticket.status as Status]}
            </div>
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
  );
};

export default UserTicket;
