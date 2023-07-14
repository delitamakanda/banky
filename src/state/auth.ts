import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token
            window.localStorage.setItem('token', action.payload.token)
        },
        clearCredentials: (state, action) => {
            state.token = null
            window.localStorage.removeItem('token')
        },

    }
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;