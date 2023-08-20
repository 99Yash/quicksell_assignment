import Avatar from 'boring-avatars';
import { useAppSelector } from '../../hooks/redux';
import { Priority } from '../../types';
import { TicketPriorityValues } from '../utils/TicketIcons';
import styles from './StatusTicket.module.css';

const StatusTicket = ({ id }: { id: string }) => {
  const ticket = useAppSelector((state) =>
    state.tickets.find((ticket) => ticket.id === id)
  );
  const users = useAppSelector((state) => state.users);
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
          <div
            style={{
              position: 'relative',
            }}
          >
            <Avatar
              size={21}
              variant={`beam`}
              name={users.find((user) => user.id === ticket.userId)?.name ?? ''}
            />
            <div
              className={
                users.find((user) => user.id === ticket.userId)?.available
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
  );
};

export default StatusTicket;
