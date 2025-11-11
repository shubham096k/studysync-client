import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DocumentsService from './DocumentsService';

export const fetchDocuments = createAsyncThunk('docs/fetch', 
  async (groupId) => { // Accept groupId parameter
    return DocumentsService.getDocuments(groupId);
  }
);export const uploadDocument = createAsyncThunk('docs/upload', DocumentsService.uploadDocument);
export const approveDocument = createAsyncThunk('docs/approve', DocumentsService.approveDocument);
export const deleteDocument = createAsyncThunk('docs/delete', DocumentsService.deleteDocument);

const slice = createSlice({
  name: 'documents',
  initialState: { documents: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchDocuments.fulfilled, (s, a) => { s.documents = a.payload; });
  },
});
export default slice.reducer;