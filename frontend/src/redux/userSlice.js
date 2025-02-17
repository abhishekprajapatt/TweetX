import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    otherUsers: null,
    profile:null
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getProfile:(state, action) => {
        state.profile = action.payload;
    }
  },
});

export const {getUser, getOtherUsers, getProfile} = userSlice.actions;
export default userSlice.reducer;