import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ticket } from '../types/ticket.type';

const initialState: Ticket[] = [];

const TicketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets(state, action: PayloadAction<Ticket[]>) {
      return action.payload;
    },
  },
});

export const { setTickets } = TicketsSlice.actions;
export default TicketsSlice.reducer;
