import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {RootState} from "./Store";
import {ISignIn} from "./types";
import {signUpType} from "../components/authorization/SignUpPage";
import {InputsLogin} from "../components/authorization/LoginPage";

const initialState: ISignIn = {
    username: localStorage.getItem('username') ?? "",
    avatarUrl: localStorage.getItem('avatarUrl') ?? null,
    token: localStorage.getItem('token') ?? "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const signupUser = createAsyncThunk(
    'users/signupUser',
    async (signUpData: signUpType, thunkAPI) => {
        try {
            const response = await fetch(
                'http://dev.trainee.dex-it.ru/api/Auth/SignUp',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signUpData)
                }
            );
            let data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.name);
                if (data.avatarUrl !== "null") {
                    localStorage.setItem('avatarUrl', data.avatarUrl);
                }
                return {...data};
            } else {
                console.log('data', data);
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async (loginData: InputsLogin, thunkAPI) => {
        try {
            const response = await fetch(
                'http://dev.trainee.dex-it.ru/api/Auth/SignIn',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData)
                }
            );
            let data = await response.json();
            console.log('response', data);
            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.name);
                if (data.avatarUrl !== "null") {
                    localStorage.setItem('avatarUrl', data.avatarUrl);
                }
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

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
            state.avatarUrl = "";
            state.token = "";
            state.username = "";
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
        builder.addCase((signupUser.pending || loginUser.pending), (state) => {
            state.isFetching = true;
        })
        builder.addCase((signupUser.rejected || loginUser.rejected), (state, action) => {
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
        /*        builder.addCase(loginUser.pending, (state) => {
                    state.isFetching = true;
                })*/
        /*        builder.addCase(loginUser.rejected, (state, action) => {
                    state.isFetching = false;
                    state.isError = true;
                    state.errorMessage = action.error.message;
                })*/
    }
})

export const userSelector = (state: RootState) => state.user;
export const {clearState, signOut} = userSlice.actions;
