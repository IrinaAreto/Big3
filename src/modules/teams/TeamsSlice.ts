import {createSlice} from '@reduxjs/toolkit';
import {fetchTeamsCards} from './FetchTeamsCardsThunk';
import {fetchSearchedTeam} from './FetchSearchedTeamThunk';
import {ITeams} from '../../core/redux/types/ITeams';

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

export const {clearState} = teamsSlice.actions;
