import {createSlice} from '@reduxjs/toolkit';
import {ISignIn} from '../../core/redux/types/ISignIn';
import {signupUser} from './SignupUserThunk';
import {loginUser} from './LoginUserThunk';

const initialState: ISignIn = {
    username: localStorage.getItem('username') ?? '',
    avatarUrl: localStorage.getItem('avatarUrl') ?? null,
    token: localStorage.getItem('token') ?? '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
        signOut: (state) => {
            state.avatarUrl = '';
            state.token = '';
            state.username = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(signupUser.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.avatarUrl = payload.avatarUrl;
            state.username = payload.name;
            state.token = payload.token;
        })
        builder.addCase((signupUser.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((signupUser.rejected), (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })

        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.avatarUrl = payload.avatarUrl;
            state.username = payload.name;
            state.token = payload.token;
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isFetching = true;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })
    }
})

export const {clearState, signOut} = userSlice.actions;
