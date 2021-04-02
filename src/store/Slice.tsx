import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {RootState} from "./Store";
import {signUpType} from "../components/authorization/SignUpPage";
import {InputsLogin} from "../components/authorization/LoginPage";

interface ISignIn {
    username: string,
    avatarUrl: string,
    token: string,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string | undefined
}

const initialState: ISignIn = {
    username: "",
    avatarUrl: "",
    token: localStorage.getItem("token") ?? "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const userSelector = (state: RootState) => state.user;

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
        builder.addCase(signupUser.pending, (state) => {
            state.isFetching = true;
        })
        builder.addCase(signupUser.rejected, (state, action) => {
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
