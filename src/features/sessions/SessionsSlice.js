import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SessionsService from './SessionsService';

export const fetchSessions = createAsyncThunk(
  'sessions/fetch',
  ({ groupId, status }) => SessionsService.getSessions(groupId, status)
);
export const addSession = createAsyncThunk(
  'sessions/add',
  (data) => SessionsService.createSession(data)
);
export const removeSession = createAsyncThunk(
  'sessions/delete',
  (id) => SessionsService.deleteSession(id)
);

const slice = createSlice({
  name: 'sessions',
  initialState: { sessions: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSessions.fulfilled, (s, a) => {
      s.sessions = a.payload;
    });
  },
});
export default slice.reducer;