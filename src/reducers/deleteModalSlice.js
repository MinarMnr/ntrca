import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: 'Are you sure?',
  message: 'Please remember data will be lost permanently.',
  deleteApi: ''
};

export const deleteModalSlice = createSlice({
  name: 'deleteModal',
  initialState,
  reducers: {
    setDeleteModal: (state, {payload}) => {
      return {
        title: payload.title ?? initialState.title,
        message: payload.message ?? initialState.message,
        deleteApi: payload.deleteApi
      }
    },
  },
});

export const {setDeleteModal} = deleteModalSlice.actions;
export const selectDeleteModal = state => state.deleteModal;
export default deleteModalSlice.reducer;