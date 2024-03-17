import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../components/Shared/types';
import { convertKeysToCamelCase } from '../../utils/convertKeysToCamelCase';

const initialState = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  picture: '',
  country: '',
  gender: '',
  lastLogin: '',
  createdAt: '',
  updatedAt: '',
  statistics: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
});

export const selectUser = (state: { user: IUser }) => state.user;
export const selectUsername = (state: { user: IUser }) => state.user.username;

export const { setUser } =
  userSlice.actions;

export default userSlice.reducer;
