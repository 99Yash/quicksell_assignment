import Avatar from 'boring-avatars';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { User } from '../../types/index';
import UserTicket from '../tickets/UserTicket';
import { Icons } from '../utils/Icons';
import styles from './UserColumn.module.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';

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

  const [parent] = useAutoAnimate();

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
      <div className={styles.tickets} ref={parent}>
        {sortedTickets
          .filter((ticket) => ticket.userId === user.id)
          .map((ticket, idx) => (
            <UserTicket key={ticket.id} id={ticket.id} />
          ))}
      </div>
    </div>
  );
};

export default UserColumn;
