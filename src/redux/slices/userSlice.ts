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
      state.username = payload.Username;
      state.email = payload.Email;
      state.firstName = payload.FirstName;
      state.lastName = payload.LastName;
      state.picture = payload.Picture;
      state.country = payload.Country;
      state.gender = payload.Gender;
      state.lastLogin = payload.LastLogin;
      state.createdAt = payload.CreatedAt;
      state.updatedAt = payload.UpdatedAt;
      state.statistics[0] = convertKeysToCamelCase(payload.Statistics[0]);
      state.statistics[1] = convertKeysToCamelCase(payload.Statistics[1]);
      state.statistics[2] = convertKeysToCamelCase(payload.Statistics[2]);
    },
  },
});

export const selectUser = (state: { user: IUser }) => state.user;
export const selectUsername = (state: {user: IUser}) => state.user.username;

export const { setUser } =
 userSlice.actions;

export default userSlice.reducer;
