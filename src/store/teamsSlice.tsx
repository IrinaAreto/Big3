import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "./Store";
import {PagesFetch, SearchedItem, ITeams} from "./types";

const initialState: ITeams = {
    data: [],
    count: 0,
    page: 0,
    size: 0,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
}

export const fetchTeamsCards = createAsyncThunk(
    'teams/fetchTeams',
    async ({page, pageSize, token}: PagesFetch, thunkAPI) => {
        try {
            const response = await fetch(
                `http://dev.trainee.dex-it.ru/api/Team/GetTeams?Name=%20&Page=${page}&PageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            );
            let data = await response.json();

            if (response.status === 200) {
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

export const fetchSearchedTeam = createAsyncThunk(
    'teams/fetchSearchedTeam',
    async ({ name, token}: SearchedItem, thunkAPI) => {
        try {
            const response = await fetch(
                `http://dev.trainee.dex-it.ru/api/Team/GetTeams?Name=${name}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            );
            let data = await response.json();

            if (response.status === 200) {
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


export const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTeamsCards.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            state.count = payload.count;
            state.page = payload.page;
            state.size = payload.size;
        })
        builder.addCase(fetchTeamsCards.pending, (state, action) => {
            state.isFetching = true;
        })
        builder.addCase(fetchTeamsCards.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })

        builder.addCase(fetchSearchedTeam.fulfilled, (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.data = payload.data;
            state.count = payload.count;
            state.page = payload.page;
            state.size = payload.size;
        })
        builder.addCase(fetchSearchedTeam.pending, (state, action) => {
            state.isFetching = true;
        })
        builder.addCase(fetchSearchedTeam.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        })
    }
})

export const teamsSelector = (state: RootState) => state.teams;
export const {clearState} = teamsSlice.actions;
