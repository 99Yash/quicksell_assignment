import React, { useEffect, useState } from 'react';
import DisplayBtn from './components/DisplayBtn';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import { fetchTickets } from './services/qs-api.service';
import { useAppDispatch } from './hooks/redux';
import { setUsers } from './store/users.slice';
import { setTickets } from './store/tickets.slice';

type GroupByOption = 'Status' | 'User' | 'Priority';
type OrderByOption = 'Title' | 'Priority';

const Home: React.FC = () => {
  const groupByOptions: GroupByOption[] = ['Status', 'User', 'Priority'];
  const orderByOptions: OrderByOption[] = ['Title', 'Priority'];

  const [showModal, setShowModal] = useState(false);
  const [group, setGroup] = useState<GroupByOption>(() => {
    const grp = JSON.parse(localStorage.getItem('group') as string);
    return grp || 'Status';
  });

  const [order, setOrder] = useState<OrderByOption>(() => {
    const ord = JSON.parse(localStorage.getItem('order') as string);
    return ord || 'Priority';
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { tickets, users } = await fetchTickets();
        dispatch(setUsers(users));
        dispatch(setTickets(tickets));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('group', JSON.stringify(group));
    localStorage.setItem('order', JSON.stringify(order));
  }, [group, order]);

  return (
    <main className="main-container antialiased">
      <DisplayBtn setShowModal={setShowModal} />
      {showModal && (
        <div className="modal">
          <div onClick={() => setShowModal(false)} className="overlay"></div>
          <div className="modal-content">
            <label htmlFor="1" className="modal-label">
              Grouping
            </label>
            <select
              value={group}
              id="1"
              onChange={(e) => {
                setGroup(e.target.value as GroupByOption);
                setShowModal(false);
              }}
              className="modal-select"
            >
              {groupByOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-content">
            <label htmlFor="2" className="modal-label">
              Ordering
            </label>
            <select
              id="2"
              value={order}
              onChange={(e) => {
                setOrder(e.target.value as OrderByOption);
                setShowModal(false);
              }}
              className="modal-select"
            >
              {orderByOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div>
        <KanbanBoard order={order} groupBy={group} />
      </div>
    </main>
  );
};

export default Home;
