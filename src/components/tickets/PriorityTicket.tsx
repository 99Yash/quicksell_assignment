import Avatar from 'boring-avatars';
import { useAppSelector } from '../../hooks/redux';
import { Status } from '../../types';
import { TicketStatusValues } from '../utils/TicketIcons';
import styles from './PriorityTicket.module.css';

const PriorityTicket = ({ id }: { id: string }) => {
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
                users.find((user) => user.id === ticket.userId)?.available ===
                true
                  ? styles['badge--online']
                  : styles['badge--offline']
              }
            ></div>
          </div>
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

export default PriorityTicket;
