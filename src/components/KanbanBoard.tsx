import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Priority, Status } from '../types/index';
import styles from './KanbanBoard.module.css';
import PriorityColumn from './columns/PriorityColumn';
import StatusColumn from './columns/StatusColumn';
import UserColumn from './columns/UserColumn';
import { useAutoAnimate } from '@formkit/auto-animate/react';
interface KanbanBoardProps {
  groupBy: 'Status' | 'User' | 'Priority';
  order: 'Priority' | 'Title';
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ groupBy, order }) => {
  let uniqueStatusValues: Status[] = [];
  let uniqueUsers = useAppSelector((state) => state.users);
  let uniquePriorityValues: Priority[] = [];
  const [parent] = useAutoAnimate();

  if (groupBy === 'Status') {
    uniqueStatusValues = [
      'Backlog',
      'In progress',
      'Todo',
      'Done',
      'Cancelled',
    ] satisfies Status[];
    return (
      <div className={styles.board} ref={parent}>
        {uniqueStatusValues.length > 0 &&
          uniqueStatusValues.map((status, idx) => (
            <StatusColumn order={order} status={status} key={idx} />
          ))}
      </div>
    );
  } else if (groupBy === 'User') {
    return (
      <div className={styles.board} ref={parent}>
        {uniqueUsers.length > 0 &&
          uniqueUsers.map((user, idx) => (
            <UserColumn order={order} user={user} key={idx} />
          ))}
      </div>
    );
  } else if (groupBy === 'Priority') {
    uniquePriorityValues = [0, 4, 3, 2, 1];
    return (
      <div className={styles.board} ref={parent}>
        {uniquePriorityValues.length > 0 &&
          uniquePriorityValues.map((priority, idx) => (
            <PriorityColumn order={order} priority={priority} key={idx} />
          ))}
      </div>
    );
  }

  return null;
};

export default KanbanBoard;
