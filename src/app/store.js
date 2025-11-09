import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import groupsReducer from '../features/groups/GroupsSlice';
import sessionsReducer from '../features/sessions/SessionsSlice';
import documentsReducer from '../features/documents/DocumentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupsReducer,
    sessions: sessionsReducer,
    documents: documentsReducer,
  },
});

export default store;