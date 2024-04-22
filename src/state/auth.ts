import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: window.localStorage.getItem('token') || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            state.token  = action.payload.token;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            window.localStorage.setItem('token', action.payload.token)
        },
        clearCredentials: (state) => {
            state.token = null
            window.localStorage.removeItem('token')
        },
    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;