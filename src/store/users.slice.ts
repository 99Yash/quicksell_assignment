import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types';

const initialState: User[] = [];

const UsersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      return action.payload;
    },
  },
});

export const { setUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
