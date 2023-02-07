import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { initialState } from './initState';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: initialState },
  reducers: {
    addContact: (state, { payload }) => {
      state.contacts.unshift(payload);
    },
    deleteContact: (state, { payload }) => {
      state.contacts = state.contacts.filter(user => user.id !== payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const persistContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;

export const getContacts = state => state.contacts.contacts;
