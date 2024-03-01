import { createSlice } from '@reduxjs/toolkit';

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
    },
  },
});

export const selectUser = (state) => state;

export const { setUser } =
 userSlice.actions;

export default userSlice.reducer;
