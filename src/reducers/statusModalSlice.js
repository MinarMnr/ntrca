import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: 'Are you sure?',
  message: 'Please remember status will be change.',
  statusApi: ''
};

export const statusModalSlice = createSlice({
  name: 'statusModal',
  initialState,
  reducers: {
    setStatusModal: (state, {payload}) => {
      return {
        title: payload.title ?? initialState.title,
        message: payload.message ?? initialState.message,
        statusApi: payload.statusApi
      }
    },
  },
});

export const {setStatusModal} = statusModalSlice.actions;
export const selectStatusModal = state => state.statusModal;
export default statusModalSlice.reducer;