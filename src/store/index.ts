import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import usersReducer from './users.slice';
import ticketsReducer from './tickets.slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    tickets: ticketsReducer,
  },
});

setupListeners(
  store.dispatch as (action: any) => any // this is a hack
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
