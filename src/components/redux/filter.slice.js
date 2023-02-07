import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterActions: (state, { payload }) => {
      const filtredContacts = payload.toLowerCase();
      return filtredContacts;
    },
  },
});

export const { filterActions } = filterSlice.actions;

export const getFilter = state => state.filter;
