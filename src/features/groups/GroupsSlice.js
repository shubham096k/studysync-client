import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GroupsService from "./GroupsService";

export const fetchGroups = createAsyncThunk(
  "groups/fetch",
  GroupsService.getAllGroups
);
export const fetchMyGroups = createAsyncThunk(
  "groups/my",
  GroupsService.getMyGroups
);
export const fetchAdminGroups = createAsyncThunk(
  "groups/admin",
  GroupsService.getAdminGroups
);
export const createGroup = createAsyncThunk(
  "groups/create",
  GroupsService.createGroup
);
export const joinGroup = createAsyncThunk(
  "groups/join",
  GroupsService.joinGroup
);
export const leaveGroup = createAsyncThunk(
  "groups/leave",
  GroupsService.leaveGroup
);

// thunk to fetch individual group details
export const fetchGroupDetails = createAsyncThunk(
  "groups/fetchDetails",
  async (groupId) => {
    return await GroupsService.getGroupById(groupId);
  }
);

const slice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    myGroups: [],
    adminGroups: [],
    currentGroup: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchGroups.fulfilled, (s, a) => {
      s.groups = a.payload;
    })
      .addCase(fetchMyGroups.fulfilled, (s, a) => {
        s.myGroups = a.payload;
      })
      .addCase(fetchAdminGroups.fulfilled, (s, a) => {
        s.adminGroups = a.payload;
      })
      .addCase(fetchGroupDetails.fulfilled, (s, a) => {
        s.currentGroup = a.payload;
      })
  },
});

export default slice.reducer;