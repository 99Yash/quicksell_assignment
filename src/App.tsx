import React, { useEffect, useState } from 'react';
import DisplayBtn from './components/DisplayBtn';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import { fetchTickets } from './services/qs-api.service';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { setUsers } from './store/users.slice';
import { setTickets } from './store/tickets.slice';
import { GroupByOption, OrderByOption } from './types';
import Modal from './components/utils/Modal';
import { Icons } from './components/utils/Icons';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<GroupByOption>(() => {
    const grp = JSON.parse(localStorage.getItem('group') as string);
    return grp || 'Status';
  });

  const [order, setOrder] = useState<OrderByOption>(() => {
    const ord = JSON.parse(localStorage.getItem('order') as string);
    return ord || 'Priority';
  });

  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.tickets);
  const users = useAppSelector((state) => state.users);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { tickets, users } = await fetchTickets();
        dispatch(setUsers(users));
        dispatch(setTickets(tickets));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
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
        <Modal
          group={group}
          order={order}
          setGroup={setGroup}
          setOrder={setOrder}
          setShowModal={setShowModal}
        />
      )}
      {!(tickets && users) ? (
        <div className="empty-container">
          <Icons.spinner className="loader" />
        </div>
      ) : (
        <KanbanBoard order={order} groupBy={group} />
      )}
    </main>
  );
};

export default Home;
