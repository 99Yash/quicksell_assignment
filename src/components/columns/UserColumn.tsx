import Avatar from 'boring-avatars';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Priority, Status, User } from '../../types/index';
import { Icons } from '../utils/Icons';
import { TicketPriorityValues, TicketStatusValues } from '../utils/TicketIcons';
import styles from './UserColumn.module.css';

interface UserColumnProps {
  user: User;
  order: 'Priority' | 'Title';
}

const UserColumn: React.FC<UserColumnProps> = ({ user, order }) => {
  const tickets = useAppSelector((state) => state.tickets);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (order === 'Priority') {
      return b.priority - a.priority;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className={`${styles['user-column']} lg:w-[20%] `}>
      {/* Column header */}
      <div className={styles['column-header']}>
        <div className={styles['column-header-left']}>
          <div
            style={{
              position: 'relative',
            }}
          >
            <Avatar size={21} variant={`beam`} name={user.name ?? ''} />
            <div
              className={
                user.available
                  ? styles['badge--online']
                  : styles['badge--offline']
              }
            ></div>
          </div>
          <h6 className={styles['column-header-title']}>{user.name}</h6>
          <p className={styles['column-header-count']}>
            {tickets.filter((ticket) => ticket.userId === user.id).length}
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
      <div className={styles.tickets}>
        {sortedTickets
          .filter((ticket) => ticket.userId === user.id)
          .map((ticket, idx) => (
            <div key={idx} className={styles['ticket-card']}>
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
          ))}
      </div>
    </div>
  );
};

export default UserColumn;
