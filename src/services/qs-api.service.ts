import axios from 'axios';
import { User } from '../types/user.type';
import { Ticket } from '../types/ticket.type';

const URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function isUserArray(data: any): data is User[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item: any) =>
        typeof item.id === 'string' && typeof item.name === 'string'
    )
  );
}

function isTicketArray(data: any): data is Ticket[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item: any) =>
        typeof item.id === 'string' && typeof item.title === 'string'
    )
  );
}

export const fetchTickets = async () => {
  try {
    const response = await axios.get(URL);
    const { users, tickets } = response.data;

    if (isUserArray(users) && isTicketArray(tickets)) {
      return { users, tickets };
    } else {
      console.error('Invalid response data format.');
      return { users: [], tickets: [] };
    }
  } catch (error) {
    console.error('Error fetching response:', error);
    return { tickets: [], users: [] };
  }
};
