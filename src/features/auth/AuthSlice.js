import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import AuthService from './AuthService';
import { saveToken, getToken, clearToken } from '../../utils/storage';


export const register = createAsyncThunk('auth/register', async (data) => {
  await AuthService.register(data);
});


export const login = createAsyncThunk('auth/login', async (data) => {
  const res = await AuthService.login(data);
  saveToken(res.access);

  // Decode the token to extract user info
  const decoded = jwtDecode(res.access);

  return {
    token: res.access,
    userId: decoded.user_id,
    exp: decoded.exp,
    iat: decoded.iat
  };
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getToken(),
    user: null, // Will store { id: userId }
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      clearToken();
      state.token = null;
      state.user = null;
      state.userId = null;
    },
    // Optional: Set user data from token on app load
    setUserFromToken: (state) => {
      if (state.token) {
        try {
          const decoded = jwtDecode(state.token);
          state.userId = decoded.user_id;
          state.user = { id: decoded.user_id };
        } catch (error) {
          console.error('Invalid token:', error);
          state.token = null;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.user = { id: action.payload.userId };
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});


export const { logout, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AuthService from './AuthService';
// import { saveToken, getToken, clearToken } from '../../utils/storage';

// export const register = createAsyncThunk('auth/register', async (data) => {
//   await AuthService.register(data);
// });

// export const login = createAsyncThunk('auth/login', async (data) => {
//   const res = await AuthService.login(data);
//   saveToken(res.access);
//   return res.access;
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: getToken(),
//   },
//   reducers: {
//     logout: (state) => {
//       clearToken();
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.fulfilled, (state, action) => {
//       state.token = action.payload;
//     });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;