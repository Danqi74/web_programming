import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';


export const login = createAsyncThunk('/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:9000/signin', credentials);
        return response.data;
    } catch (error) {
        Notify.failure(error.message)
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const register = createAsyncThunk('/register', async (userData, thunkAPI) => {
    try {
        await axios.post('http://localhost:9000/signup', userData);
        const response = await axios.post('http://localhost:9000/signin', userData)
        return response.data;
    } catch (error) {
        Notify.failure(error.message)
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logout = createAsyncThunk('/logout', async (_, thunkAPI) => {
    try {
        await axios.post('http://localhost:9000/logout');
        localStorage.removeItem('authToken');
        return { message: 'Logged out successfully' };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    }
);